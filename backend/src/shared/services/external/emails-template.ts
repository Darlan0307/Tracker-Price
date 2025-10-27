interface ProductAlertData {
  userName: string
  productName: string
  productImage: string
  currentPrice: string
  platform: string
  productUrl: string
}

export const productRegisteredTemplate = (data: ProductAlertData) => ({
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.95;
          }
          .content { 
            padding: 40px 30px; 
          }
          .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #444;
          }
          .product-card {
            background: #f9f9f9;
            border-radius: 10px;
            padding: 25px;
            margin: 25px 0;
            border-left: 4px solid #667eea;
          }
          .product-header {
            display: flex;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 20px;
          }
          .product-image {
            width: 120px;
            height: 120px;
            object-fit: contain;
            border-radius: 8px;
            background: white;
            padding: 10px;
            border: 1px solid #e0e0e0;
          }
          .product-info {
            flex: 1;
          }
          .product-name {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin: 0 0 10px 0;
            line-height: 1.4;
          }
          .product-details {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .detail-row {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
          }
          .label {
            font-weight: 600;
            color: #666;
          }
          .value {
            color: #333;
          }
          .price {
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
          }
          .platform-badge {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
          }
          .info-box {
            background: #e8f4f8;
            border-left: 4px solid #2196F3;
            padding: 20px;
            margin: 25px 0;
            border-radius: 5px;
          }
          .info-box h3 {
            margin: 0 0 10px 0;
            color: #1976D2;
            font-size: 16px;
          }
          .info-box p {
            margin: 5px 0;
            font-size: 14px;
            color: #555;
          }
          .info-box ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .info-box li {
            margin: 5px 0;
            color: #555;
          }
          .button { 
            display: inline-block; 
            padding: 14px 35px; 
            background: #667eea; 
            color: white; 
            text-decoration: none; 
            border-radius: 25px; 
            font-weight: bold;
            margin: 20px 0;
            transition: background 0.3s;
          }
          .button:hover {
            background: #5568d3;
          }
          .cta-section {
            text-align: center;
            padding: 20px 0;
          }
          .footer { 
            background: #f9f9f9;
            text-align: center; 
            padding: 30px; 
            color: #666; 
            font-size: 13px;
            border-top: 1px solid #e0e0e0;
          }
          .footer p {
            margin: 5px 0;
          }
          .emoji {
            font-size: 24px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="emoji">🎯</div>
            <h1>Produto Cadastrado com Sucesso!</h1>
            <p>Estamos monitorando o preço para você</p>
          </div>
          
          <div class="content">
            <p class="greeting">Olá, <strong>${data.userName}</strong>! 👋</p>
            
            <p>Ótima notícia! Seu produto foi cadastrado com sucesso e já está sendo monitorado pela nossa plataforma.</p>
            
            <div class="product-card">
              <div class="product-header">
                <img src="${data.productImage}" alt="${data.productName}" class="product-image">
                <div class="product-info">
                  <h2 class="product-name">${data.productName}</h2>
                  <div class="product-details">
                    <div class="detail-row">
                      <span class="label">Plataforma:</span>
                      <span class="platform-badge">${data.platform}</span>
                    </div>
                    <div class="detail-row">
                      <span class="label">Preço atual:</span>
                      <span class="price">${data.currentPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="info-box">
              <h3>📊 Como funciona o monitoramento?</h3>
              <p>Nossa plataforma verifica o preço deste produto regularmente e você receberá um alerta por email quando:</p>
              <ul>
                <li>🔻 O preço sofrer uma queda significativa</li>
                <li>⚡ Houver uma promoção especial</li>
              </ul>
              <p><strong>Importante:</strong> Mantenha suas notificações ativadas para não perder nenhuma oportunidade!</p>
            </div>
            
            <div class="cta-section">
              <a href="${data.productUrl}" class="button">Ver Produto ${data.platform}</a>
            </div>
            
            
          </div>
          
          <div class="footer">
            <p><strong>Economize tempo e dinheiro!</strong></p>
            <p>Continue adicionando produtos e deixe que a gente cuida do resto 🚀</p>
            <p style="margin-top: 15px;">
              © 2025 Tracker Price. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </body>
    </html>
  `,
  text: `
Olá, ${data.userName}!

✅ Produto cadastrado com sucesso!

${data.productName}
Plataforma: ${data.platform}
Preço atual: ${data.currentPrice}

Estamos monitorando este produto para você. Quando o preço cair, você receberá um alerta por email!

Ver produto: ${data.productUrl}

Continue adicionando produtos e economize tempo e dinheiro!
  `
})
