const express = require('express');
const cors = require('cors');
const mysql = require('mysql')
const authApi = require('./routes/auth')
const dataApi = require('./routes/api')

const mysqlConnection = require('./connection');

const PORT = 8000;

const app = express();
app.use(express.json());
app.use(cors()); 

app.use('/',authApi);

app.use('/',dataApi);






app.listen(PORT , console.log(`Server is listening at ${PORT}`));
