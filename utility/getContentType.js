
// return content type based on file extension
export function getContentType(extension) {
    if (extension === '.html') return 'text/html'
    if (extension === '.ico') return 'image/x-icon'
    if (extension === '.css') return 'text/css'
    if (extension === '.js') return 'application/javascript'
    if (extension === '.png') return 'image/png'
    return 'application/json'
}