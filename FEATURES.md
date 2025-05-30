# 🚀 Próximos Passos - Vista Nova Web

## 📌 Tarefas Pendentes

### 🚀 Melhorias Planejadas
- [x] **Sistema de Formulários** ✅
  - [x] Separação de formulários de contato e newsletter
    - [x] Formulário de newsletter na seção "Estamos Aqui"
    - [x] Formulário de contato no Footer
    - [x] Validação específica para cada formulário com Zod
    - [x] Conformidade com RGPD para consentimento claro
  - [x] Formulário de contato
    - [x] Campos: Nome, E-mail, Mensagem (obrigatórios)
    - [x] Aceitação dos termos de privacidade
    - [x] Feedback visual durante o envio
    - [x] Mensagens de sucesso/erro
  - [x] Formulário de newsletter
    - [x] Campos: E-mail (obrigatório), Nome (opcional)
    - [x] Consentimento específico para marketing
    - [x] Interface simplificada e focada
  - [x] Integração com Nodemailer
    - [x] Configuração do servidor de e-mail
    - [x] Template de e-mail para notificação
    - [x] Tratamento de erros e retentativas
  - [x] Proteção contra spam
    - [x] Implementação de reCAPTCHA v3
    - [x] Limitação de taxa de envio (5 requisições a cada 15 minutos por IP)
  - [x] Documentação detalhada

- [x] **Navegação e Acessibilidade** ✅
  - [x] Navegação suave entre seções
    - [x] Scroll suave para âncoras
    - [x] Tratamento de navegação entre páginas com âncoras
    - [x] Feedback visual durante a navegação
  - [ ] Suporte a tema claro/escuro
  - [ ] Melhorias de contraste
  - [ ] Navegação por teclado
  - [ ] Suporte a leitores de tela

- [x] **Componente HeroCarousel Melhorado** ✅
  - [x] Controle de exibição do badge de satisfação
  - [x] Controle de exibição dos botões de CTA
  - [x] Animações otimizadas
  - [x] Responsividade aprimorada

- [ ] **Otimização de Imagens e Logos**
  - [x] Atualizar favicon para versão moderna com suporte a múltiplos tamanhos e dispositivos
  - [ ] Otimizar logos em SVG e PNG para melhor desempenho
    - [ ] Remover metadados desnecessários
    - [ ] Reduzir a complexidade dos caminhos SVG e PNG
    - [ ] Converter estilos inline para classes CSS quando possível
    - [ ] Validar SVGs com ferramentas como SVGOMG
    - [ ] Validar PNGs com ferramentas como ImageOptim
  - [ ] Implementar carregamento otimizado para imagens
  - [ ] Adicionar metadados para SEO

- [ ] **Monitoramento**
  - [ ] Métricas de performance em tempo real
  - [ ] Análise de erros do lado do cliente
  - [ ] Monitoramento de disponibilidade

### 🔍 Em Análise
- [ ] PWA Offline
- [ ] Otimização para SEO
- [ ] Suporte a navegadores antigos
- [ ] Internacionalização (i18n)

## 🔄 Melhorias Recentes

### Separação de Formulários
- Separados os formulários de newsletter e contato para melhor experiência do usuário
- Implementada validação específica para cada formulário com Zod
- Adicionado formulário de contato dedicado no Footer
- Simplificado o formulário de newsletter na seção "Estamos Aqui"
- Melhorada a conformidade com RGPD para consentimento claro

### Navegação Suave
- Implementado sistema de navegação suave entre seções
- Corrigido comportamento de rolagem ao navegar entre páginas com âncoras
- Adicionado feedback visual durante a navegação

### HeroCarousel Aprimorado
- Adicionado controle para exibir/ocultar o badge de satisfação
- Adicionado controle para exibir/ocultar os botões de CTA
- Melhorias na responsividade e desempenho

---
*📅 Última atualização: 30/05/2025*
*📚 Histórico de alterações: [CHANGELOG.md](CHANGELOG.md)*
