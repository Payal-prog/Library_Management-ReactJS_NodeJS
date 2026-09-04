var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'librarydb'
});  
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return process.exit(22); //consistently exit so the Docker container will restart until it connects to the sql db
    }
    console.log('connected as id ' + connection.threadId);
  });

module.exports = connection;
