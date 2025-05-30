const nodemailer = require('nodemailer');
const { ClientSecretCredential } = require('@azure/identity');
require('dotenv').config({ path: '.env.local' });

async function getAccessToken() {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const scope = 'https://outlook.office.com/.default';

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('AZURE_TENANT_ID, AZURE_CLIENT_ID, and AZURE_CLIENT_SECRET must be set in .env.local');
  }

  const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
  const accessToken = await credential.getToken(scope);
  
  return accessToken.token;
}

async function sendEmail() {
  try {
    const accessToken = await getAccessToken();
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_SERVER_USER,
        clientId: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        tenantId: process.env.AZURE_TENANT_ID,
        accessToken: accessToken,
        expires: 3600,
        refreshToken: '',
        accessUrl: 'https://login.microsoftonline.com/' + process.env.AZURE_TENANT_ID + '/oauth2/v2.0/token',
      },
      tls: {
        rejectUnauthorized: false, // Apenas para testes
      },
      debug: true,
      logger: true,
    });

    console.log('Enviando e-mail de teste...');
    
    const info = await transporter.sendMail({
      from: `"Teste OAuth2" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_SERVER_USER,
      subject: 'Teste de SMTP com OAuth2',
      text: 'Este é um e-mail de teste enviado usando OAuth2.',
      html: '<p>Este é um e-mail de teste enviado usando <b>OAuth2</b>.</p>',
    });

    console.log('E-mail enviado com sucesso!');
    console.log('ID da mensagem:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:');
    console.error(error);
  }
}

// Executar o teste
console.log('Iniciando teste de envio de e-mail com OAuth2...');
sendEmail()
  .then(() => console.log('Teste concluído.'))
  .catch((error) => console.error('Erro durante o teste:', error));
