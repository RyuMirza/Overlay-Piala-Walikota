const http = require('http');
const fs = require('fs');
const path = require('path');

let state = null;
let clients = [];

const server = http.createServer((req, res) => {
    // CORS Header (Penting agar vMix bisa baca data)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url === '/api/state' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(state || {}));
    } 
    else if (req.url === '/api/state' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            state = JSON.parse(body);
            // Broadcast ke semua overlay yang terkoneksi (vMix/OBS)
            clients.forEach(client => client.write(`data: ${body}\n\n`));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({success: true}));
        });
    }
    else if (req.url === '/api/stream') {
        // Real-time Event Stream (SSE)
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        clients.push(res);
        if(state) res.write(`data: ${JSON.stringify(state)}\n\n`); // kirim state saat ini
        
        req.on('close', () => {
            clients = clients.filter(client => client !== res);
        });
    }
    else {
        // Static File Server
        let filePath = '.' + req.url;
        if (filePath === './') filePath = './dashboard.html';
        
        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', 
            '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpg',
            '.ttf': 'font/ttf'
        };
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log('=============================================');
    console.log('✅ SERVER LOKAL PUBGM AKTIF! (100% Bebas SPX)');
    console.log('=============================================');
    console.log(`💻 Buka Dashboard di Chrome : http://localhost:${PORT}`);
    console.log(`🎥 Masukkan URL ke vMix/OBS : http://localhost:${PORT}/live-ticker.html`);
    console.log('=============================================');
});
