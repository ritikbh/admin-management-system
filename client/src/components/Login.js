import React from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'
import './complete.css'

function Login() {

const dispatch = useDispatch();
    
    const responseGoogle = (res) =>{

        var email = res.profileObj.email

     
        axios({
            method: 'post',
            url: 'http://localhost:8000/auth-api',
            data: {emailId:email},
            headers: {'Content-Type': 'application/json' }
            })
            .then(function (response) {
                //handle success
 

                dispatch(login({                               
                    loggedIn:true,
                    userRole:response.data,
                    email:email
                }))
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    return (
        <div>
  

<div className="main-back" id="LoginForm">
<div className="container">
<div className="login-form">
<div className="main-div">
    <div className="panel">
   <h2>Login</h2>
   <p>Please login using Google</p>
   </div>
    <form id="Login" >

        <div className="form-group row">
<div className="col-12">
<GoogleLogin
            clientId="1089418183796-f1u8ehc0i2rb0adne03mf23l0uvkkdu7.apps.googleusercontent.com"
            buttonText="Sign In"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            />
       
            </div>
          

        </div>


        

    </form>
    </div>
</div>
</div>


</div>
        </div>
    )
}

export default Login
