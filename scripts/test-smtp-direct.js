const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testSMTP() {
  // Configurações do servidor SMTP
  const smtpConfig = {
    host: process.env.EMAIL_SERVER_HOST || 'smtp.office365.com',
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: process.env.EMAIL_SERVER_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_SERVER_USER || 'gf.professional@outlook.com',
      pass: process.env.EMAIL_SERVER_PASSWORD || 'cldlbbsmgqmxhqis',
    },
    tls: {
      rejectUnauthorized: false, // Ignorar erros de certificado (apenas para testes)
    },
    debug: true,
    logger: true,
  };

  console.log('Configurações SMTP:', {
    ...smtpConfig,
    auth: {
      user: smtpConfig.auth.user,
      pass: smtpConfig.auth.pass ? '***' : 'undefined',
    },
  });

  // Criar um transporter
  const transporter = nodemailer.createTransport(smtpConfig);

  try {
    // Verificar a conexão com o servidor SMTP
    console.log('Verificando conexão com o servidor SMTP...');
    await transporter.verify();
    console.log('Conexão com o servidor SMTP estabelecida com sucesso!');

    // Enviar um e-mail de teste
    console.log('Enviando e-mail de teste...');
    const info = await transporter.sendMail({
      from: `"Teste SMTP" <${smtpConfig.auth.user}>`,
      to: smtpConfig.auth.user,
      subject: 'Teste de SMTP',
      text: 'Este é um e-mail de teste enviado pelo script de verificação SMTP.',
      html: '<p>Este é um e-mail de teste enviado pelo script de verificação SMTP.</p>',
    });

    console.log('E-mail de teste enviado com sucesso!');
    console.log('ID da mensagem:', info.messageId);
    console.log('URL de visualização:', nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : 'Não disponível');
  } catch (error) {
    console.error('Erro ao testar o servidor SMTP:');
    
    if (error instanceof Error) {
      console.error('Mensagem:', error.message);
      console.error('Stack:', error.stack);
      
      // Verificar se é um erro de autenticação
      if (error.message.includes('Invalid login')) {
        console.error('Erro de autenticação: Credenciais inválidas');
      } else if (error.message.includes('ECONNREFUSED')) {
        console.error('Não foi possível conectar ao servidor SMTP. Verifique o host e a porta.');
      } else if (error.message.includes('ETIMEDOUT')) {
        console.error('Tempo limite de conexão excedido. Verifique sua conexão com a internet.');
      } else if (error.message.includes('SELF_SIGNED_CERT_IN_CHAIN')) {
        console.error('Erro de certificado autoassinado. Tente definir NODE_TLS_REJECT_UNAUTHORIZED=0 (apenas para testes).');
      }
    } else {
      console.error('Erro desconhecido:', error);
    }
  }
}

// Executar o teste
console.log('Iniciando teste de conexão SMTP...');
testSMTP()
  .then(() => console.log('Teste concluído.'))
  .catch((error) => console.error('Erro durante o teste:', error));
