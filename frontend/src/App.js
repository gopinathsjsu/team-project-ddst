import Register from './components/Register/Register';
// import Login from "./components/Register/Login"
import { Router, Route, Routes, Switch, BrowserRouter } from 'react-router-dom';
import Navbar from './components/UserNavbar/UserNavbar';
import Landing from './components/Landing/Landing';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route exact path="/" element={<Register/>}/> */}
                <Route exact path='/' element={<Landing />} />
                <Route exact path='/Register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
