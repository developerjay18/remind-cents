import twilio from "twilio";

async function sendWhatsappMessage(to, messageBody) {
  const accountSid = process.env.TWILIO_ACCOUNTSID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.TWILIO_FROM_NUM;

  const client = twilio(accountSid, authToken);

  const recipientNumber = `whatsapp:${to}`;

  return client.messages
    .create({
      body: messageBody,
      from: `whatsapp:${twilioNumber}`,
      to: recipientNumber,
    })
    .then((message) => {
      console.log(`Message sent with SID: ${message.sid}`);
      return message;
    })
    .catch((error) => {
      console.error(`Error sending message: ${error.message}`);
      throw error;
    });
}

export default sendWhatsappMessage;
