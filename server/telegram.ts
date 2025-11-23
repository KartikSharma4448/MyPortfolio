import type { InsertContactMessage } from '@shared/schema';

export async function sendTelegramNotification(message: InsertContactMessage): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram credentials not configured, skipping notification');
    return false;
  }

  const text = `
🔔 New Contact Form Message

👤 Name: ${message.name}
📧 Email: ${message.email}

💬 Message:
${message.message}

---
Reply directly to: ${message.email}
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          // No parse_mode - plain text is more reliable with user input
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Telegram API error:', error);
      return false;
    }

    console.log('✅ Telegram notification sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return false;
  }
}
