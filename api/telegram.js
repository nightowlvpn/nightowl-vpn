export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const data = req.body;

    const text = `
🔥 New Night Owl VPN Order

👤 Name: ${data.name}
📧 Email: ${data.email}
📦 Package: ${data.package}
📶 SIM: ${data.sim}
💳 Payment: ${data.payment}
`;

    await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text
        })
      }
    );

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }
}