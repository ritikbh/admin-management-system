const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../connection');

Router.get('/api/fetch-data', function (req, res) {

 
    dynamicQuery = `SELECT * FROM client_details`
    mysqlConnection.query(dynamicQuery, (err , rows, fields)=>{
if(!err)
{
    const result = Object.values(JSON.parse(JSON.stringify(rows)));
    // console.log(result)
    res.send(result);
}
else{
    console.log(err);
}

    })
 
    
   })

   Router.get('/api/fetch-verification-log-data', function (req, res) {

 
    dynamicQuery = `SELECT * FROM user_client_verification`
    mysqlConnection.query(dynamicQuery, (err , rows, fields)=>{
if(!err)
{
    const result = Object.values(JSON.parse(JSON.stringify(rows)));
    // console.log(result)
    res.send(result);
}
else{
    console.log(err);
}

    })
 
    
   })

   Router.post('/api/insert-kyc', function (req, res) {

    let userName = req.body.name ;
    let userEmail = req.body.email ;
    
       dynamicQuery = `INSERT INTO user_roles (id, user_name, email_id, user_role) VALUES (NULL, '${userName}', '${userEmail}', 'Kyc-Admin')`
       mysqlConnection.query(dynamicQuery, (err , rows, fields)=>{
   if(!err)
   {
       const result = Object.values(JSON.parse(JSON.stringify(rows)));
    //    console.log(result)
       res.send(result);
   }
   else{
       console.log(err);
   }
   
       })
    
       
      })

      Router.post('/api/insert-agent', function (req, res) {

        let userName = req.body.name ;
        let userEmail = req.body.email ;
        
           dynamicQuery = `INSERT INTO user_roles (id, user_name, email_id, user_role) VALUES (NULL, '${userName}', '${userEmail}', 'Agent')`
           mysqlConnection.query(dynamicQuery, (err , rows, fields)=>{
       if(!err)
       {
           const result = Object.values(JSON.parse(JSON.stringify(rows)));
        //    console.log(result)
           res.send(result);
       }
       else{
           console.log(err);
       }
       
           })
        
           
          })

   Router.post('/api/fetch-specific-data', function (req, res) {

 let userId = req.body.user_id
    dynamicQuery = `SELECT * FROM client_details WHERE id = ${userId}`
    mysqlConnection.query(dynamicQuery, (err , rows, fields)=>{
if(!err)
{
    const result = Object.values(JSON.parse(JSON.stringify(rows)));
    // console.log(result)
    res.send(result);
}
else{
    console.log(err);
}

    })
 
    
   })


   Router.post('/api/delete-specific-data', function (req, res) {

    let userId = req.body.user_id
       dynamicQuery = `DELETE FROM client_details WHERE id = ${userId}`
       mysqlConnection.query(dynamicQuery, (err , rows, fields)=>{
   if(!err)
   {
   
       res.send('Client Deleted');
   }
   else{
       console.log(err);
   }
   
       })
    
       
      })

      Router.post('/api/update-specific-data', function (req, res) {

        let userId = req.body.user_id
        let email = req.body.mail_id
        let address = req.body.address
        let mobile = req.body.mobile

           dynamicQuery = `UPDATE client_details SET mail_id='${email}',address='${address}',mobile_no=${mobile} WHERE id = ${userId}`
        //    console.log(dynamicQuery)
           mysqlConnection.query(dynamicQuery, (err , rows, fields)=>{
       if(!err)
       {
       
           res.send('Client Updated');
       }
       else{
           console.log(err);
       }
       
           })
        
           
          })

          Router.post('/api/verify-address', function (req, res) {

            let userId = req.body.user_id
            let emailId = req.body.email
// console.log(emailId)

    
               dynamicQuery = `UPDATE client_details SET adderss_check='Y' WHERE id = ${userId}`
            //    console.log(dynamicQuery)
               mysqlConnection.query(dynamicQuery, (err , rows, fields)=>{
           if(!err)
           {
           
            //    res.send('Client Updated');
           }
           else{
               console.log(err);
           }
           
               })
               dynamicQuery2 = `INSERT INTO user_client_verification (id, user_email, client_id) VALUES (NULL, '${emailId}', '${userId}')`
                //   console.log(dynamicQuery2)
                  mysqlConnection.query(dynamicQuery2, (err , rows, fields)=>{
              if(!err)
              {
              
                  res.send('Log Created');
              }
              else{
                  console.log(err);
              }
              
                  })
               
              })

module.exports = Router;