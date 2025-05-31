// Simplified email module without actual SMTP connection
// This version simulates email sending for development/testing

// Log that we're using the simulated email service
console.log('Using simulated email service');
console.log('No actual emails will be sent');

// In a production environment, you would use a real email service
// such as nodemailer, SendGrid, Mailgun, etc.

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail(options: SendEmailOptions) {
  try {
    const from = `"Vista Nova" <${process.env.EMAIL_FROM || 'noreply@vistanova.pt'}>`;
    const replyTo = process.env.EMAIL_REPLY_TO;
    
    console.log('Simulando envio de e-mail:', {
      from,
      to: options.to,
      subject: options.subject,
      replyTo,
    });

    // Log email content in development only
    if (process.env.NODE_ENV === 'development') {
      console.log('Conteúdo do e-mail (apenas em desenvolvimento):', {
        text: options.text ? '[text content]' : undefined,
        html: options.html ? '[html content]' : undefined,
      });
    }
    
    // Simulate successful email sending
    const mockMessageId = `simulated-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    
    console.log('E-mail simulado com sucesso:', {
      messageId: mockMessageId,
    });
    
    // Return success response
    return { 
      success: true, 
      messageId: mockMessageId,
      simulated: true,
    };
  } catch (error) {
    console.error('Erro ao simular e-mail:', {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : error,
    });
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido ao simular e-mail',
      details: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      } : undefined,
      simulated: true,
    };
  }
}

export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  message: string;
  subscribeToNewsletter: boolean;
}) {
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
        <p>Esta é uma mensagem automática, por favor não responda diretamente a este e-mail.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: process.env.CONTACT_FORM_RECIPIENT || process.env.EMAIL_FROM || 'contato@vistanova.pt',
    subject,
    text,
    html,
  });
}
