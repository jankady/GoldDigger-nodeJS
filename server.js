import http from 'node:http';
import {displayWeb} from "./webpage/displayWeb.js";

const PORT = 3000;

const __dirname = import.meta.dirname
const server = http.createServer(async (req, res) => {

    // Disable favicon requests
    if (req.url === '/favicon.ico') {
        // 404 favicon not found
        res.writeHead(404);
        res.end();
        return;
    }

    // API endpoint
    if (req.url.startsWith('/api')) {
        console.log('api endpoint hit');
        return
    }

    // web page
    if (!req.url.startsWith('/api')) {
        console.log('web page endpoint hit');
        await displayWeb(req, res)
        return
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})