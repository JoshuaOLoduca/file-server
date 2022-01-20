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
    data: undefined,
    name: dir.split('/')[dir.split('/').length-1].split('.')[0]
  }

  if(dir[0]==='.') dir = './source' + dir.slice(1);
  else dir = './source/' + dir;
  console.log(dir)

  fs.readFile(dir, 'utf8', (error, data) => {
    result.type = 'utf8';
    result.data = data;
    client.write('obj:' + JSON.stringify(result));
  });

}