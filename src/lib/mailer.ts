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
    const replyTo = process.env.EMAIL_REPLY_TO || 'geral@vistanova.pt';

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
}): Promise<EmailResult> {
  const { name, email, message } = data;
  
  const subject = `Nova mensagem de contato de ${name}`;
  
  const text = `
    Nome: ${name}
    Email: ${email}
    Mensagem: ${message}
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
      </div>
      
      <div style="margin-top: 30px; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 15px;">
        <p>Esta é uma mensagem automática enviada através do formulário de contato do site VISTA NOVA.</p>
        <p>Para responder a esta mensagem, utilize o email: geral@vistanova.pt</p>
      </div>
    </div>
  `;

  const result = await sendEmail({
    to: process.env.CONTACT_FORM_RECIPIENT || process.env.EMAIL_FROM || 'geral@vistanova.pt',
    subject,
    text,
    html,
  });
  

  
  return result;
}

/**
 * Send newsletter subscription notification to marketing team
 */
export async function sendNewsletterNotificationEmail(data: {
  email: string;
  name?: string;
}): Promise<EmailResult> {
  const { email, name } = data;
  
  const displayName = name || 'Cliente';
  const subject = `Nova inscrição na newsletter de ${displayName}`;
  
  const text = `
    Nome: ${displayName}
    Email: ${email}
    Mensagem: Deseja receber a newsletter: Sim
  `;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a365d;">Nova inscrição na newsletter</h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Nome:</strong> ${displayName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Mensagem:</strong></p>
        <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #4299e1;">
          Deseja receber a newsletter: Sim
        </div>
      </div>
      
      <div style="margin-top: 30px; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 15px;">
        <p>Esta é uma notificação automática de nova inscrição na newsletter do site VISTA NOVA.</p>
        <p>Para responder a esta mensagem, utilize o email: geral@vistanova.pt</p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: 'marketing@vistanova.pt',
    subject,
    text,
    html,
  });
}

/**
 * Send career application email with CV attachment
 */
export async function sendCareerApplicationEmail(data: {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  motivation: string;
  availability: string;
  linkedin?: string;
}, cvFile: { name: string; content: Buffer }): Promise<EmailResult> {
  const { name, email, phone, position, experience, motivation, availability, linkedin } = data;
  
  const subject = `Nova Candidatura: ${name} - ${position}`;
  
  const text = `
    Nova Candidatura de Emprego
    
    Dados Pessoais:
    Nome: ${name}
    Email: ${email}
    Telefone: ${phone}
    ${linkedin ? `LinkedIn: ${linkedin}` : ''}
    
    Informações Profissionais:
    Posição de Interesse: ${position}
    Experiência em Crédito: ${experience}
    Disponibilidade: ${availability}
    
    Carta de Motivação:
    ${motivation}
    
    CV em anexo: ${cvFile.name}
  `;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a365d; border-bottom: 2px solid #4299e1; padding-bottom: 10px;">Nova Candidatura de Emprego</h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1a365d; margin-top: 0;">Dados Pessoais</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Telefone:</strong> ${phone}</p>
        ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>` : ''}
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1a365d; margin-top: 0;">Informações Profissionais</h3>
        <p><strong>Posição de Interesse:</strong> ${position}</p>
        <p><strong>Experiência em Crédito:</strong> ${experience}</p>
        <p><strong>Disponibilidade:</strong> ${availability}</p>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1a365d; margin-top: 0;">Carta de Motivação</h3>
        <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #4299e1;">
          ${motivation.replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <div style="margin-top: 30px; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 15px;">
        <p>Esta é uma candidatura automática enviada através do formulário de carreiras do site VISTA NOVA.</p>
        <p>CV em anexo: ${cvFile.name}</p>
        <p>Para responder a esta candidatura, utilize o email: ${email}</p>
      </div>
    </div>
  `;

  // Check if Resend is properly configured
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set. Falling back to email simulation for career application.');
    return simulateEmailSending({ to: email, subject, text, html });
  }

  try {
    const from = process.env.EMAIL_FROM || 'VISTA NOVA <noreply@vistanova.pt>';
    const to = process.env.CONTACT_FORM_RECIPIENT || process.env.EMAIL_FROM || 'geral@vistanova.pt';

    // Convert Buffer to Base64 as per Resend documentation for local file attachments
    const cvBase64 = cvFile.content.toString('base64');
    
    // Verify file size after Base64 encoding (Resend limit: 40MB total)
    const base64Size = Buffer.byteLength(cvBase64, 'base64');
    const maxEmailSize = 40 * 1024 * 1024; // 40MB
    
    if (base64Size > maxEmailSize) {
      console.error('CV file too large after Base64 encoding:', base64Size / 1024 / 1024, 'MB');
      return {
        success: false,
        error: 'CV file is too large for email delivery. Please use a smaller file.',
        details: { fileSize: base64Size, maxSize: maxEmailSize }
      };
    }

    const result = await resend.emails.send({
      from: from,
      to: [to],
      replyTo: email,
      subject: subject,
      text: text,
      html: html,
      attachments: [
        {
          filename: cvFile.name,
          content: cvBase64, // Base64 encoded content as per Resend docs
        },
      ],
    });

    if (result.error) {
      console.error('Resend error (career application):', result.error);
      return {
        success: false,
        error: result.error.message || 'Failed to send career application email',
        details: result.error
      };
    }

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    console.error('Error sending career application email with Resend:', error);
    
    // Fallback to simulation if Resend fails
    console.warn('Falling back to email simulation due to Resend error.');
    return simulateEmailSending({ to: email, subject, text, html });
  }
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
      
      <p>Se tiveres alguma pergunta, não hesites em contactar-nos em <a href="mailto:geral@vistanova.pt">geral@vistanova.pt</a></p>
      
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
