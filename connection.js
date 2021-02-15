const mysql = require('mysql')
const dotenv = require('dotenv');
dotenv.config();



mysqlConnection = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER_ADMIN,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
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