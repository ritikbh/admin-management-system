const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../connection');


Router.post('/auth-api', function (req, res) {
    var emailId = req.body.emailId;

 
    dynamicQuery = `SELECT user_role FROM user_roles WHERE email_id = '${emailId}'`
    mysqlConnection.query(dynamicQuery, (err , rows, fields)=>{
if(!err)
{
    const result = Object.values(JSON.parse(JSON.stringify(rows)));
    let userRole = result.map(a => a.user_role);

    // console.log(userRole)
    res.send(userRole);
}
else{
    console.log(err);
}

    })
 
    
   })

module.exports = Router;