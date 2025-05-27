import nodemailer from 'nodemailer';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: process.env.EMAIL_SERVER_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail(options: SendEmailOptions) {
  try {
    const mailOptions = {
      from: `"Vista Nova" <${process.env.EMAIL_FROM || 'noreply@vistanova.pt'}>`,
      replyTo: process.env.EMAIL_REPLY_TO,
      ...options,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
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
