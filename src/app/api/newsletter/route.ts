import { NextResponse } from 'next/server';
import { sendNewsletterWelcomeEmail, sendNewsletterNotificationEmail } from '@/lib/mailer';
import { newsletterFormSchema } from '@/lib/schemas';

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
    const validationResult = newsletterFormSchema.safeParse(body);
    
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

    // Send newsletter welcome email to subscriber
    const welcomeResult = await sendNewsletterWelcomeEmail(
      validatedData.email,
      validatedData.name
    );

    // Send notification email to marketing team
    const notificationResult = await sendNewsletterNotificationEmail({
      email: validatedData.email,
      name: validatedData.name
    });

    // Check if at least the welcome email was sent successfully
    if (!welcomeResult.success) {
      console.error('Falha no envio de email de boas-vindas:', welcomeResult.error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Erro ao processar a inscrição. Por favor, tente novamente mais tarde.',
          details: process.env.NODE_ENV === 'development' ? welcomeResult.error : undefined
        },
        { status: 500 }
      );
    }

    // Log if notification email failed (but don't fail the request)
    if (!notificationResult.success) {
      console.warn('Falha no envio de notificação para marketing:', notificationResult.error);
    }

    return NextResponse.json({ 
      success: true,
      message: 'Inscrição realizada com sucesso!',
      messageId: welcomeResult.messageId,
      notificationSent: notificationResult.success
    });

  } catch (error) {
    console.error('Erro no servidor (newsletter):', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ocorreu um erro inesperado. Por favor, tente novamente.' 
      },
      { status: 500 }
    );
  }
} 