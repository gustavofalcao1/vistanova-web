import { NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/mailer';

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
    
    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Nome, e-mail e mensagem são obrigatórios' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(body.recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { success: false, error: 'Falha na verificação de segurança. Por favor, tente novamente.' },
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Por favor, insira um e-mail válido' },
        { status: 400 }
      );
    }

    // Simulate sending email (no actual email is sent)
    const result = await sendContactFormEmail({
      name: body.name,
      email: body.email,
      message: body.message,
      subscribeToNewsletter: body.subscribeToNewsletter !== false, // true by default
    });

    // Log the simulation result
    console.log('Resultado da simulação de envio:', {
      success: result.success,
      messageId: result.messageId,
      simulated: true
    });
    
    // Always return success in production since we're just simulating
    // In a real implementation, you would check result.success

    return NextResponse.json({ 
      success: true,
      message: 'Mensagem enviada com sucesso!'
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


