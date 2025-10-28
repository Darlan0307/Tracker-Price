# Tracker Price

## 🎯 Visão Geral

O **Tracker Price** é uma plataforma automatizada de monitoramento de preços que permite aos usuários rastrear produtos em diferentes marketplaces online. O sistema monitora continuamente as variações de preço e notifica o usuário quando há quedas significativas, ajudando-o a economizar dinheiro nas suas compras online.

### Problema que Resolve

- Dificuldade em acompanhar manualmente variações de preço
- Perda de oportunidades de compra com desconto
- Tempo gasto verificando preços em múltiplas plataformas
- Impossibilidade de monitorar múltiplos produtos simultaneamente

### Solução Oferecida

Sistema automatizado que monitora preços 24/7 e notifica o usuário instantaneamente quando há oportunidades reais de economia.

---

## 💎 Proposta de Valor

### Para o Usuário

- **Economia de Tempo**: Não precisa verificar preços manualmente todos os dias
- **Economia de Dinheiro**: Compra no momento ideal de queda de preço
- **Múltiplas Plataformas**: Monitora diferentes marketplaces em um só lugar
- **Notificações Instantâneas**: Recebe alertas por email (e futuramente WhatsApp)
- **Alertas Inteligentes**: Notificações apenas quando há quedas significativas (5%+)

### Público-Alvo

- **Consumidores online frequentes**: Pessoas que compram regularmente pela internet
- **Compradores estratégicos**: Usuários que monitoram produtos de alto valor (eletrônicos, eletrodomésticos, móveis)
- **Caçadores de promoção**: Pessoas que querem garantir o melhor preço antes de comprar
- **Comparadores de preço**: Usuários que buscam comparar preços entre diferentes plataformas

---

## ⚙️ Funcionalidades Principais

### 1. Monitoramento de Produtos

**Como Funciona:**

1. Usuário copia o link do produto desejado de qualquer plataforma suportada
2. Cola o link na plataforma Tracker Price
3. Sistema extrai automaticamente:
   - Título do produto
   - Preço atual
   - Imagem principal
   - Plataforma de origem
   - URL original

**Verificação Automática:**

- Sistema verifica preços automaticamente
- **Planos Free e Pro**: A cada 24 horas
- **Plano Premium**: A cada 8 horas (3x mais frequente)
- Compara com o último preço registrado
- Identifica quedas de preço superiores a 5%

**Detecção de Queda de Preço:**

- **Critério padrão**: Queda mínima de 5% (plano Free e plano Pro)
- **Alertas personalizados**: Usuário define % por produto (plano Premium)
- Cálculo de economia em R$ e percentual

### 2. Sistema de Notificações

**Email de Confirmação:**

- Enviado imediatamente após cadastro do produto
- Contém:
  - Imagem do produto
  - Nome e informações básicas
  - Preço atual registrado
  - Link para visualizar no dashboard
  - Confirmação de monitoramento ativo

**Email de Queda de Preço:**

- Dispara automaticamente quando detecta queda superior a 5% (ou % personalizada)
- Contém:
  - Título destacando a queda
  - Imagem do produto
  - Comparação visual: Preço Anterior → Preço Atual
  - Economia em R$ e percentual
  - Botão CTA para acessar produto na plataforma original

**WhatsApp (Planejado para Versões Futuras):**

- Notificações instantâneas no WhatsApp
- Templates de mensagem personalizados
- Maior taxa de abertura e resposta
- Opção adicional ao email

### 3. Autenticação e Perfil

**Login Social:**

- Integração com Google OAuth 2.0
- Processo rápido e seguro (sem necessidade de senha)
- Reduz fricção no cadastro

**Gerenciamento de Conta:**

- Visualizar todos os produtos monitorados
- Configurações de preferências
- Gestão de assinatura e plano

**Sistema de Tokens:**

- Access Token: Validade curta para segurança
- Refresh Token: Renovação automática da sessão
- Logout seguro em todos os dispositivos

### 4. Configurações de Notificações

**Preferências do Usuário:**

- Escolher canais de notificação (Email/WhatsApp quando disponível)
- Ativar/desativar notificações globalmente
- Configurar tipos de alerta

**Alertas Personalizados (Plano Premium):**

- Definir % mínima de queda para cada produto individualmente
- Exemplo: Notebook (alerta com 10% de queda), Mouse (alerta com 15%)
- Limites de preço desejados (notificar quando atingir R$ X)
- Ativação/desativação por produto

---

## 🛍️ Plataformas Suportadas

### Implementadas

- **Mercado Livre** ✅
  - Marketplace mais popular do Brasil e América Latina
  - Scraping de produtos nacionais e importados
  - Categorias: Eletrônicos, Casa, Moda, Esportes, etc.

### Em Desenvolvimento

- **Amazon** 🔄

  - Maior marketplace internacional
  - Produtos nacionais e importados
  - Amazon.com.br (Brasil)

- **Shopee** 🔄
  - Popular para produtos importados
  - Preços competitivos
  - Foco em eletrônicos e acessórios

### Planejadas (Versões Futuras)

- **AliExpress**

  - Produtos importados direto da China
  - Preços muito baixos
  - Tempo de entrega maior

- **Magazine Luiza**

  - Grande varejista brasileiro
  - Forte em eletrônicos e eletrodomésticos
  - Programa de cashback

- **Casas Bahia**

  - Varejista tradicional brasileiro
  - Móveis e eletrodomésticos
  - Opções de financiamento

- **Americanas**
  - Marketplace brasileiro consolidado
  - Variedade de categorias
  - Programa de pontos

---

## 🔧 Tecnologias Utilizadas

> em desenvolvimento

## 📝 Conclusão

O **Tracker Price** é uma plataforma completa de monitoramento de preços que resolve um problema real: ajudar pessoas a economizar dinheiro comprando no momento certo. Com uma estratégia freemium bem definida, tecnologias sólidas e foco na experiência do usuário, o projeto tem potencial significativo de crescimento no mercado brasileiro e internacional.
