import http from 'http';

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.end('You just built a server in Node.js!');
});

server.listen(3000, () => console.log('Server is running on port http://localhost:${port}'));
