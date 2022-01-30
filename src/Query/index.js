import axios from 'axios'

export const getConnectAdmin = ()=>{
    return axios('https://backenduk.herokuapp.com/admin');
} 

export const getConnectUser = ()=>{
    return axios('https://backenduk.herokuapp.com/users');
} 

export const getConnectForm = ()=>{
    return axios('https://backenduk.herokuapp.com/form');
} 





