//Alt koden der bruges til at starte serveren
//De forskellige stier befinder sig i app.js
//Importerer http pakken fra node.js
const http = require('http');
const app = require('./app');
//Porten som serveren kører på
//Hvis den var hosted, kunne man skrive porten her.
const port = process.env.port || 3000;
// Her laves serveren på baggrund af app.js
const server = http.createServer(app);
//Her laves serveren på baggrund af vores port
server.listen(port);
