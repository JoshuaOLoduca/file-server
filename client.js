const net = require("net");
const setupInput = require('./input');
const fs = require('fs');

// const { IP, PORT, NAME } = require("./constants");


// establishes a connection with the game server
const connect = function() {
  const conn = net.createConnection({
    host: 'localhost', // IP address here,
    port: 3000// PORT number here,
  });

  // On connection complete, let use know its connected
  conn.on('connect', () => {
    console.log('Successfully connected to File server');
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  console.log("Connecting ...");
  return conn;
};

const conn = connect();

conn.on('data', data => downloadData(data));
const stdin = setupInput(conn);

const downloadData = data => {
  const types = {
    TXT: true
  }
  const type = data.split('').splice(0,3).join('');
  console.log(type);
  const content = data.split('').slice(type.length + 1).join('');
  if (types[type]) {
    fs.writeFile('./testing2.'+type, content, err => {
      
    })
    console.log('write file');
  }
}