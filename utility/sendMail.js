import nodemailer from "nodemailer"

// Function to send an email using nodemailer
export async function sendMail(investmentAmount, ounces){
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: 'GoldDigger - Investment Confirmation',
            html: `
                <h2>Investment Confirmed</h2>
                <p>Thank you for your investment!</p>
                <p><strong>Investment Details:</strong></p>
                <ul>
                    <li>Amount: £${investmentAmount}</li>
                    <li>Gold (ozt): ${ounces}</li>
                    <li>Date: ${new Date().toLocaleString()}</li>
                </ul>
                <p>Best regards,<br>GoldDigger Team</p>
            `
        }

        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully')
        return { success: true, message: 'Email sent' }
    } catch (error) {
        console.error('Error sending email:', error)
        return { success: false, error: error.message }
    }
}