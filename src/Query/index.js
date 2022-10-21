import axios from 'axios'

export const getConnectAdmin = ()=>{
    return axios('https://geek-apps.herokuapp.com/admin');
} 

export const getConnectUser = ()=>{
    return axios('https://geek-apps.herokuapp.com/users');
} 

export const getConnectForm = ()=>{
    return axios('https://geek-apps.herokuapp.com/form');
} 





