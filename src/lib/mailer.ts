import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Email service for sending notifications and messages
 * Uses Resend service for reliable email delivery
 * Falls back to simulation when Resend is not configured
 */

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  error?: string;
  details?: unknown;
}

/**
 * Send an email using Resend service
 * Falls back to simulation if Resend is not configured
 */
export async function sendEmail(options: SendEmailOptions): Promise<EmailResult> {
  const { to, subject, text, html } = options;
  
  // Check if Resend is properly configured
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set. Falling back to email simulation.');
    return simulateEmailSending(options);
  }

  try {
    const from = process.env.EMAIL_FROM || 'VISTA NOVA <noreply@vistanova.pt>';
    const replyTo = process.env.EMAIL_REPLY_TO || 'contato@vistanova.pt';

    const result = await resend.emails.send({
      from: from,
      to: [to],
      subject: subject,
      text: text,
      html: html,
      replyTo: replyTo,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return {
        success: false,
        error: result.error.message || 'Failed to send email',
        details: result.error
      };
    }


    
    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    console.error('Error sending email with Resend:', error);
    
    // Fallback to simulation if Resend fails
    console.warn('Falling back to email simulation due to Resend error.');
    return simulateEmailSending(options);
  }
}

/**
 * Simulate email sending for development/testing
 * Used as fallback when Resend is not available
 */
async function simulateEmailSending(options: SendEmailOptions): Promise<EmailResult> {
  const { to, subject, text, html } = options;
  


  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simulate success/failure (95% success rate)
    const success = Math.random() > 0.05;
    
    if (success) {
      const simulatedMessageId = `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      

      
      return {
        success: true,
        messageId: simulatedMessageId,
        simulated: true,
      };
    } else {
      return {
        success: false,
        simulated: true,
        error: 'Simulated network error',
      };
    }
  } catch (error) {
    return {
      success: false,
      simulated: true,
      error: error instanceof Error ? error.message : 'Unknown error in simulation',
      details: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      } : undefined,
    };
  }
}

/**
 * Send contact form email to the configured recipient
 */
export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  message: string;
  subscribeToNewsletter: boolean;
}): Promise<EmailResult> {
  const { name, email, message, subscribeToNewsletter } = data;
  
  const subject = `Nova mensagem de contato de ${name}`;
  
  const text = `
    Nome: ${name}
    Email: ${email}
    Mensagem: ${message}
    
    Newsletter: ${subscribeToNewsletter ? 'Sim' : 'Não'}
  `;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a365d;">Nova mensagem de contato</h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Mensagem:</strong></p>
        <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #4299e1;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <p style="margin-top: 15px;">
          <strong>Deseja receber a newsletter:</strong> 
          <span style="color: ${subscribeToNewsletter ? '#38a169' : '#e53e3e'};">
            ${subscribeToNewsletter ? 'Sim' : 'Não'}
          </span>
        </p>
      </div>
      
      <div style="margin-top: 30px; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 15px;">
        <p>Esta é uma mensagem automática enviada através do formulário de contato do site VISTA NOVA.</p>
        <p>Para responder a esta mensagem, utilize o email: ${email}</p>
      </div>
    </div>
  `;

  const result = await sendEmail({
    to: process.env.CONTACT_FORM_RECIPIENT || process.env.EMAIL_FROM || 'contato@vistanova.pt',
    subject,
    text,
    html,
  });
  

  
  return result;
}

/**
 * Send newsletter welcome email to new subscribers
 */
export async function sendNewsletterWelcomeEmail(email: string, name?: string): Promise<EmailResult> {
  const subject = 'Bem-vindo à Newsletter VISTA NOVA!';
  
  const displayName = name || 'Cliente';
  
  const text = `
    Olá ${displayName}!
    
    Obrigado por se inscrever na nossa newsletter!
    
    Agora receberás as nossas últimas novidades, dicas de crédito habitação e ofertas exclusivas diretamente no teu email.
    
    Se tiveres alguma pergunta, não hesites em contactar-nos.
    
    Cumprimentos,
    Equipa VISTA NOVA
  `;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a365d;">Bem-vindo à Newsletter VISTA NOVA!</h2>
      
      <p>Olá <strong>${displayName}</strong>!</p>
      
      <p>Obrigado por te inscreveres na nossa newsletter!</p>
      
      <p>Agora receberás as nossas últimas novidades, dicas de crédito habitação e ofertas exclusivas diretamente no teu email.</p>
      
      <p>Se tiveres alguma pergunta, não hesites em contactar-nos.</p>
      
      <p style="margin-top: 30px;">
        Cumprimentos,<br>
        <strong>Equipa VISTA NOVA</strong>
      </p>
      
      <div style="margin-top: 40px; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 15px;">
        <p>Se não desejares mais receber estes emails, podes <a href="#" style="color: #4299e1;">cancelar a subscrição aqui</a>.</p>
        <p>Este email foi enviado porque te inscreveste na nossa newsletter através do site VISTA NOVA.</p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: email,
    subject,
    text,
    html,
  });
}
