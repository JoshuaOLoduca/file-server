const net = require('net');
const fs = require('fs');

const server = net.createServer();

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

server.on('connection', (client) => {
  console.log('New client connected!');
  client.write('Hello there!');

  client.setEncoding('utf8'); // interpret data as text
  client.on('data', (data) => {
    console.log('File Requested: ', data)
    const getData = getFile(data, client);

  });
});

const getFile = (dir, client) => {
  let result = {
    type: undefined,
    data: undefined
  }

  fs.readFile(dir, 'utf8', (error, data) => {
    client.write('TXT:' + data);
  });

}