import Axios from 'axios';


export const authAxios = ({ url, method, token, body }) => {


    let accesstoken = JSON.parse(localStorage.getItem('userToken'));

    if(accesstoken && token) {
        const reqwithtoken = axios.create({
            baseURL: url,
            headers: {
                Authorization: `Bearer ${accesstoken}`
            }
        });
    }
};