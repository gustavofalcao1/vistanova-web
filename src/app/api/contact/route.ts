import { NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/mailer';
import { contactFormSchema } from '@/lib/schemas';
import { ZodError } from 'zod';

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
    return data.success === true && data.score > 0.5; // Minimum score of 0.5
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body with Zod schema
    const validationResult = contactFormSchema.safeParse(body);
    
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

    const validatedData = validationResult.data;

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(body.recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { success: false, error: 'Falha na verificação de segurança. Por favor, tente novamente.' },
        { status: 400 }
      );
    }

    // Email validation is now handled by Zod schema
    // Send email with validated data
    const result = await sendContactFormEmail({
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      subscribeToNewsletter: body.subscribeToNewsletter !== false, // true by default
    });


    
    // Check if email was sent successfully
    if (!result.success) {
      console.error('Falha no envio de email:', result.error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Erro ao enviar a mensagem. Por favor, tente novamente mais tarde.',
          details: process.env.NODE_ENV === 'development' ? result.error : undefined
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Mensagem enviada com sucesso!',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ocorreu um erro inesperado. Por favor, tente novamente.' 
      },
      { status: 500 }
    );
  }
}


