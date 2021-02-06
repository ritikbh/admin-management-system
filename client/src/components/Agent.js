import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from "react-redux"
import { logout } from "../features/userSlice"
import { Button,Modal,Form,Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { selectUser } from "../features/userSlice";

function Agent() {
    const reduxUser = useSelector(selectUser)

  


    const [tableData, setTableData] = useState([]);
    const [refreshTable, setRefreshTable] = useState(0);




    const dispatch = useDispatch();


    const handleLogout = (e) =>{
e.preventDefault();
dispatch(logout());
    }

    useEffect(() => {

        axios.get(`http://localhost:8000/api/fetch-data`)
        .then(res =>{
            // console.log(res)
            setTableData(res.data)
        }
        )
        
            return () => {
                
            }
        },[refreshTable])





const verifyAddress = (e,userId) => {
    e.preventDefault();
    console.log(userId);
    axios({
        method: 'post',
        url: 'http://localhost:8000/api/verify-address',
        data: {user_id:userId,
                email:reduxUser.email
            } ,
        headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            //handle success
            setRefreshTable(refreshTable + 1)
            // console.log(response.data);

        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
}



    return (
        <div>



            <h1>KYC Agent</h1>
            <div className="row">
    
 

    <div className="col-3">

    <button className="btn btn-primary" onClick={() => setRefreshTable(refreshTable + 1)}>Refresh Table</button>
    </div>

    <div className="col-3">

    <button className="btn btn-primary" onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
    </div>

            <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>E-Mail ID</th>
      <th>Mobile</th>
      <th>State</th>
      <th>Address</th>
      <th>Check Status</th>
      <th>Create Date</th>
      <th></th>
    </tr>
  </thead>
  <tbody>

    {
    tableData.map(item => <tr key={item.id}>
        <td>{item.id}</td><td>{item.mail_id}</td><td>{item.mobile_no}</td>
    <td>{item.state}</td><td>{item.address}</td><td>{item.adderss_check}</td><td>{(new Date(item.create_date)).toLocaleDateString()}</td>
    <td><button className="btn btn-success" onClick={(e) => verifyAddress(e,item.id)}>Verify Address</button></td>

    </tr>)
     }
  </tbody>
</Table>



        </div>
    )
}

export default Agent
