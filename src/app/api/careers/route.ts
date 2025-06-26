import { NextResponse } from 'next/server';
import { sendCareerApplicationEmail } from '@/lib/mailer';
import { z } from 'zod';

// Validation schema for career applications
const careerApplicationSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Telefone deve ter pelo menos 9 dígitos"),
  position: z.string().min(1, "Posição de interesse é obrigatória"),
  experience: z.string().min(1, "Nível de experiência é obrigatório"),
  motivation: z.string().min(50, "Carta de motivação deve ter pelo menos 50 caracteres"),
  availability: z.string().min(1, "Disponibilidade é obrigatória"),
  linkedin: z.string().optional(),
  consent: z.string().refine((val) => val === 'true', "Consentimento é obrigatório")
});

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string | null) {
  if (!token) return false;
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY not set. Skipping CAPTCHA verification.');
    return true;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true && data.score > 0.5;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const applicationData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      position: formData.get('position') as string,
      experience: formData.get('experience') as string,
      motivation: formData.get('motivation') as string,
      availability: formData.get('availability') as string,
      linkedin: formData.get('linkedin') as string,
      consent: formData.get('consent') as string,
    };

    const recaptchaToken = formData.get('recaptchaToken') as string;
    const cvFile = formData.get('cv') as File;

    // Validate form data
    const validationResult = careerApplicationSchema.safeParse(applicationData);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Dados inválidos enviados',
          details: errors
        },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { success: false, error: 'Falha na verificação de segurança. Por favor, tente novamente.' },
        { status: 400 }
      );
    }

    // Validate CV file
    if (!cvFile || cvFile.size === 0) {
      return NextResponse.json(
        { success: false, error: 'CV é obrigatório' },
        { status: 400 }
      );
    }

    // Only PDF files allowed as per requirements
    const allowedTypes = ['application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(cvFile.type)) {
      return NextResponse.json(
        { success: false, error: 'Formato de CV inválido. Use apenas PDF.' },
        { status: 400 }
      );
    }

    if (cvFile.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'CV muito grande. Máximo 5MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
    
    const validatedData = validationResult.data;

    // Send email using the mailer service
    const result = await sendCareerApplicationEmail(
      {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        position: validatedData.position,
        experience: validatedData.experience,
        motivation: validatedData.motivation,
        availability: validatedData.availability,
        linkedin: validatedData.linkedin,
      },
      {
        name: cvFile.name,
        content: cvBuffer,
      }
    );

    if (!result.success) {
      console.error('Falha no envio de candidatura:', result.error);
      return NextResponse.json(
        {
          success: false,
          error: 'Erro ao enviar candidatura. Tente novamente.',
          details: process.env.NODE_ENV === 'development' ? result.error : undefined
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Candidatura enviada com sucesso!',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Erro no servidor (careers):', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ocorreu um erro inesperado. Por favor, tente novamente.' 
      },
      { status: 500 }
    );
  }
} 