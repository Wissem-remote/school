import axios from 'axios'

export const getConnectAdmin = ()=>{
    return axios('http://localhost:2000/admin');
} 

export const getConnectUser = ()=>{
    return axios('http://localhost:2000/users');
} 

export const getConnectForm = ()=>{
    return axios('http://localhost:2000/form');
} 





