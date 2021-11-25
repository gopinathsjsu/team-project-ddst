


import Register from "./components/Register/Register"
// import Login from "./components/Register/Login"
import { Router, Route,Routes, Switch, BrowserRouter} from 'react-router-dom'
import Navbar from "./components/UserNavbar/UserNavbar"


function App() {
  return (

    <BrowserRouter>
    
    <Routes>
      {/* <Route exact path="/" element={<Register/>}/> */}
      <Route exact path="/" element={<Navbar/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
