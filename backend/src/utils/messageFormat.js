function generateLendedMsgClient(user, entry) {
  return `Hello! 👋 
I am the virtual assistant of *${user.username}*.
    
I wanted to remind you about a transaction we had:
👇👇👇👇
*Amount:* ${entry.amount} Rs.
*Duration:* ${entry.duration} days
*Taken Date:* ${entry.startDate}
            
According to our records, the repayment is due soon. Please ensure to complete the payment by the specified date.
            
If you want to pay now. You can pay your pending amount to *${user.username}* from the below given options.
👇👇👇👇
*UPI ID:* ${user.upiId}
*UPI number:* ${user.upiNumber}
            
Best regards,
Remind Cents`;
}

function generateLendedMsgUser(user, entry) {
  return `Hello *${user.username}*, 

This is a friendly reminder about the amount of *${entry.amount}* Rs. that you lended to *${entry.name}*.

Today is the repayment date, and we want to remind you about the pending transaction:
👇👇👇👇
*Amount:* ${entry.amount} Rs.
*Duration:* ${entry.duration} days
*Lended Date:* ${entry.startDate}
    
Here is the borrower number for further processing:
${entry.whatsappNumber}
    
Best regards,
Remind Cents`;
}

function generateBorrowedMsgUser(user, entry) {
  return `Hello *${user.username}*, 

This is a friendly reminder that you borrowed *${entry.amount}* Rs. from *${entry.name}* and the repayment is overdue. 
👇👇👇👇
*Amount:* ${entry.amount} Rs.
*Taken Date:* ${entry.startDate}
*Duration:* ${entry.duration} days
    
Please make the payment as soon as possible.
    
Thank you for your prompt attention to this matter.
His/Her whatsapp number :
${entry.whatsappNumber}
    
Best regards,
Remind Cents`;
}

function generateBorrowedMsgClient(user, entry) {
  return `Hello! 👋 
I am the virtual assistant of *${user.username}*.

This is a friendly reminder about the amount of *${entry.amount}* Rs. that you lended to *${user.username}*.

Today is the repayment date, and we want to remind you about the pending transaction:
👇👇👇👇
*Amount:* ${entry.amount} Rs.
*Duration:* ${entry.duration} days
*Lended Date:* ${entry.startDate}
    
Here is the borrower number for further processing:
${user.whatsappNumber}
    
Best regards,
Remind Cents`;
}

export {
  generateLendedMsgClient,
  generateBorrowedMsgClient,
  generateBorrowedMsgUser,
  generateLendedMsgUser,
};
