const net = require("net");
const promptForFile = require('./input');
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
    promptForFile(conn);
  });
  
  // interpret incoming data as text
  conn.setEncoding("utf8");
  
  console.log("Connecting ...");
  return conn;
};


const downloadData = data => {
  const types = {
    utf8: 'txt'
  };
  let obj = {
    type:'',
    data: '',
    name: ''
  };
  
  if (data.includes('obj:')) {
    obj = JSON.parse(data.slice(4));
  }
  const extension = types[obj.type];
  const content = obj.data;
  
  if (extension !== undefined) {
    fs.writeFile('./clientDL/' + obj.name + '.' + extension, content, err => {
      if (err) console.log(err);
      console.log('wrote File');
      promptForFile(conn);
    });
  }
};


const conn = connect();

conn.on('data', data => downloadData(data));