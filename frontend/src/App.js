import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Header from "./components/Header";
import UserAuth from './pages/UserAuth';
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./utils/auth";
import RequireAuth from './utils/RequireAuth';


function App() {

    return (
        <AuthProvider>
            <Router>
                <Header/>

                <Routes>
                    <Route path='/' element={<RequireAuth><Dashboard/></RequireAuth>} />
                    {/* <Route path='/' element={<Dashboard/>} /> */}
                    {/* <Route path='/login' element={<Login/>} /> */}
                    <Route path='/userauth' element={<UserAuth/>} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
