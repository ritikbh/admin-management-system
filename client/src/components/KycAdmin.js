import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from "react-redux"
import { logout } from "../features/userSlice"
import { Button,Modal,Form,Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CSVLink} from 'react-csv';
import { selectUser } from "../features/userSlice";


function KycAdmin() {
    const reduxUser = useSelector(selectUser)

    // const [kycShow, setKycShow] = useState(false);
    const [agentShow, setAgentShow] = useState(false);
    const [editShow, setEditShow] = useState(false);

    const [updatedEmailId, setUpdatedEmailId] = useState('');
    const [updatedMobile, setUpdatedMobile] = useState('');
    const [updatedAddress, setUpdatedAddress] = useState('');
    const [updatedUserId, setUpdatedUserId] = useState('');


    const [tableData, setTableData] = useState([]);
    const [refreshTable, setRefreshTable] = useState(0);
    const [logTableData, setLogTableData] = useState([]);


    const [userName, setUserName] = useState('');
    const [emailId, setEmailId] = useState('');


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

        useEffect(() => {

            axios.get(`http://localhost:8000/api/fetch-verification-log-data`)
            .then(res =>{
                // console.log(res)
                setLogTableData(res.data)
            }
            )
            
                return () => {
                    
                }
            },[refreshTable])


const showAgentModal = () =>{
    setAgentShow(true)
}

const submitAgentData = () =>{
    setAgentShow(false)
    axios({
        method: 'post',
        url: 'http://localhost:8000/api/insert-agent',
        data: {name:userName,
              email:emailId
        } ,
        headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            //handle success
            setUserName('')
            setEmailId('')
            // console.log(response.data);
        
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
}

const editClient = (e,userId) => {
    e.preventDefault();
    setEditShow(true)
    console.log(userId);
    axios({
        method: 'post',
        url: 'http://localhost:8000/api/fetch-specific-data',
        data: {user_id:userId} ,
        headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            //handle success
            // console.log(response.data[0]);
            setUpdatedEmailId(response.data[0].mail_id)
            setUpdatedMobile(response.data[0].mobile_no)
            setUpdatedAddress(response.data[0].address)
            setUpdatedUserId(response.data[0].id)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });

}

const submitClientData = (e) => {
    e.preventDefault();
    setEditShow(false)
    axios({
        method: 'post',
        url: 'http://localhost:8000/api/update-specific-data',
        data: {user_id:updatedUserId,
               mail_id:updatedEmailId,
               mobile:updatedMobile,
               address:updatedAddress
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



const handleClose = () =>{

    setEditShow(false)
    setAgentShow(false)
}
    return (
        <div>


 <Modal show={agentShow} onHide={handleClose}>
   
   <Modal.Body>

<Form.Group>
<Form.Label><b>Enter Agent Name</b></Form.Label>
<Form.Control type="text" placeholder="Name" value={userName} onChange={e => setUserName(e.target.value)}/>
<Form.Label><b>Enter E-mail ID</b></Form.Label>
<Form.Control type="text" placeholder="E-mail ID" value={emailId} onChange={e => setEmailId(e.target.value)}/>

</Form.Group>

<Button variant="success" onClick={submitAgentData}>
Submit
</Button>


   </Modal.Body>

 </Modal>

 <Modal show={editShow} onHide={handleClose}>
   
   <Modal.Body>

<Form.Group>

<Form.Label><b>Update E-mail ID</b></Form.Label>
<Form.Control type="text"  value={updatedEmailId} onChange={e => setUpdatedEmailId(e.target.value)}/>
<Form.Label><b>Update Mobile</b></Form.Label>
<Form.Control type="text" value={updatedMobile} onChange={e => setUpdatedMobile(e.target.value)}/>
<Form.Label><b>Update Address</b></Form.Label>
<Form.Control type="text"  value={updatedAddress} onChange={e => setUpdatedAddress(e.target.value)}/>

</Form.Group>

<Button variant="success" onClick={submitClientData}>
Submit
</Button>


   </Modal.Body>

 </Modal>
            <h1>KYC Admin</h1>
            <div className="row">
    
            <div className="col-3">

            <button className="btn btn-primary" onClick={showAgentModal}>Create Agent</button>
            </div>

            <div className="col-3">

            <button className="btn btn-primary" onClick={() => setRefreshTable(refreshTable + 1)}>Refresh Table</button>
            </div>

            <div className="col-3">

            <button className="btn btn-primary" onClick={(e) => handleLogout(e)}>Logout</button>
            </div>
            </div>
            <h2>Client Details</h2>
            <CSVLink filename={"Client-table.csv"} className="btn btn-primary" data={tableData} >Export CSV</CSVLink>

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
      <th></th>
    </tr>
  </thead>
  <tbody>

    {
    tableData.map(item => <tr key={item.id}>
        <td>{item.id}</td><td>{item.mail_id}</td><td>{item.mobile_no}</td>
    <td>{item.state}</td><td>{item.address}</td><td>{item.adderss_check}</td><td>{(new Date(item.create_date)).toLocaleDateString()}</td>
    <td><button className="btn btn-primary" onClick={(e) => editClient(e,item.id)}>Edit</button></td>
    <td><button className="btn btn-success" onClick={(e) => verifyAddress(e,item.id)}>Verify Address</button></td>

    </tr>)
     }
  </tbody>
</Table>
<h2>Address Verification Log Details</h2>
<CSVLink   filename={"Log-table.csv"}  className="btn btn-primary" data={logTableData} >Export CSV</CSVLink>

            <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Verified Client ID</th>
      <th>Verified By</th>
      <th>Create Date</th>


    </tr>
  </thead>
  <tbody>

    {
    logTableData.map(item => <tr key={item.id}>
        <td>{item.id}</td><td>{item.client_id}</td><td>{item.user_email}</td><td>{(new Date(item.create_date)).toLocaleDateString()}</td>
    
 

    </tr>)
     }
  </tbody>
</Table>


        </div>
    )
}

export default KycAdmin
