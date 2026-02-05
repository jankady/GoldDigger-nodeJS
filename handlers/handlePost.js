import {sendMail} from '../utility/sendMail.js'
import {sendResponse} from '../utility/sendResponse.js'

// function for POST requests to /api/invest
export async function handlePost(req, res) {
    let body = ''
    for await (let chunk of req) {
        body += chunk
    }
    try {
        const {investmentAmount, ounces} = JSON.parse(body)

        if (!investmentAmount || !ounces) {
            sendResponse(res, 400, 'application/json',
                JSON.stringify({error: 'Missing required fields'}))
            return
        }

        const result = await sendMail(investmentAmount, ounces)

        if (result.success) {
            sendResponse(res, 200, 'application/json',
                JSON.stringify({success: true, message: 'Email sent successfully'}))
        } else {
            sendResponse(res, 500, 'application/json',
                JSON.stringify({success: false, error: result.error}))
        }
    } catch (err) {
        console.error('Error in /api/invest:', err)
        sendResponse(res, 500, 'application/json',
            JSON.stringify({error: 'Server error'}))
    }
}