import Register from './components/Register/Register';
// import Login from "./components/Register/Login"
import { Router, Route, Routes, Switch, BrowserRouter } from 'react-router-dom';
import Navbar from './components/UserNavbar/UserNavbar';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import AdminLogin from './components/AdminLogin/AdminLogin';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard';
import SearchFlights from './components/SearchFlights/SearchFlights';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route exact path="/" element={<Register/>}/> */}
                <Route exact path='/' element={<Landing />} />
                <Route exact path='/home' element={<Landing />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/adminLogin' element={<AdminLogin />} />
                <Route exact path='/customerDashboard' element={<CustomerDashboard />} />
                <Route exact path='/searchFlights' element={<SearchFlights />} />
                <Route exact path='/adminDashboard' element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
