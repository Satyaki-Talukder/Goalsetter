import { useState, createContext, useContext, useCallback, useRef} from "react";
import axios from 'axios';
import Toast from "../components/Toast";
import Modal from "../components/Modal";


const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const toastRef = useRef(null);
    const modalRef = useRef(null);


    if(!user && JSON.parse(localStorage.getItem('userData')) !== null && JSON.parse(localStorage.getItem('userData')).usergot !== null) {
        setUser(JSON.parse(localStorage.getItem('userData')).usergot);
    }
    console.log('Then: ', user);


    const register = useCallback( async(reguser) => {
        const { name, email, password, password2 } = reguser;
        if(password !== password2) { toastRef.current.show('warning', 'Passwords do not match!'); return; }
        if ((name || email || password) === '') { toastRef.current.show('warning', 'Fields shouldn\'t be empty'); return; }
        await axios.post('http://localhost:5000/api/users', reguser)
            .then(res => {
                console.log('New user res:', res);
                if(res.status === 201) {
                    console.log('Register user: ', res.data);
                    const userdata = {usergot: res.data, usertoken: res.data.token};
                    localStorage.setItem('userData', JSON.stringify(userdata));
                    setUser(res.data);
                    toastRef.current.show('info', 'Registration complete! You are now logged in');
                    console.log("User stored: ", userdata);
                }
            })
            .catch(err => toastRef.current.show('error', err.response.data.message))
    }, []);


    const login = useCallback(async (user, redirectPath) => {
        const {email, password} = user;
        if ((email || password) === '') { toastRef.current.show('warning', 'Fields shouldn\'t be empty'); return; }
        await axios.post('http://localhost:5000/api/users/login', user)
            .then(res => {
                console.log(res);
                if(res.status === 200) {
                    console.log(res.data);
                    const userdata = {usergot: res.data, usertoken: res.data.token};
                    localStorage.setItem('userData', JSON.stringify(userdata));
                    setUser(res.data);
                    toastRef.current.show('info', 'Logged in!');
                    console.log("Fetched user: ", userdata);

                } else {
                    console.log('Data: ',res.data);
                    toastRef.current.show('info', res.data.message);
                    throw new Error('this is error')
                }
            })
            .catch(err => toastRef.current.show('error', err.response.data.message));
        // setUser(userdata);
        // console.log("Fetched: ", userdata);
    }, []);

    const logout = useCallback(() => {
        if(JSON.parse(localStorage.getItem('userData')) !== null) {
            localStorage.removeItem('userData');
        }
        setUser(null);
    }, []);


     
    return (
        <AuthContext.Provider value={{ user, register, login, logout, toastRef, modalRef }}>
            {children}
            <Toast ref={toastRef} />
            <Modal ref={modalRef} />
        </AuthContext.Provider>
    )
};



export const useAuth = () => {
    return useContext(AuthContext);
};