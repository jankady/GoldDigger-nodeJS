
// function to send HTTP response
export function sendResponse(res, statusCode, contentType ,payload) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', contentType)
    res.end(payload)
}