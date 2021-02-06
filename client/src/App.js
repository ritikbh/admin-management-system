import { useSelector } from "react-redux";
import Admin from "./components/Admin";
import Agent from "./components/Agent";
import KycAdmin from "./components/KycAdmin";
import Login from "./components/Login";
import { selectUser } from "./features/userSlice";


function App() {

const user = useSelector(selectUser)

// console.log(user);



if(user.loggedIn)
{
  if(user.userRole[0] == 'Admin')
  {
    return (
      <Admin />
    );
  }
  if(user.userRole[0] == 'Kyc-Admin')
  {
    return (
      <KycAdmin />
    );
  }
  if(user.userRole[0] == 'Agent')
  {
    return (
      <Agent />
    );
  }
 
}
else{
  return (
    <Login />
  );
}
}

export default App;
