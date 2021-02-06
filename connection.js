const mysql = require('mysql')


mysqlConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Aglasem@123',
    database : 'admin_system',
    multipleStatements : true
 
 });
 
 mysqlConnection.connect((err) =>{
 if(!err){
 console.log('DB connected');
 }
 else{
     console.log('DB connection failed');
 
 }
 
 })

 module.exports = mysqlConnection;