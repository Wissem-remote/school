import React, { useEffect, useState  } from 'react'
import { NavBar } from '../App/navBar'
import { Field } from '../ui/field'
import {getConnectUser} from '../Query'
import {useMutation, useQuery} from "react-query"
import axios from 'axios'
import {  useNavigate } from "react-router-dom"
import emailjs from 'emailjs-com';

export const Sign = ()=> {
    const [user, setUser] = useState(false)
    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)
    const { data } = useQuery('repoData',getConnectUser)
    const datAdmin = data?.data
    const navigate = useNavigate()
    useEffect(()=>{ 
        localStorage.getItem('SGVsbG8=') && navigate("/")
        })


    

    const handleUser=(e)=>{
        let term =[] 
        datAdmin.map((item)=>{
        const value = e.target.value.toLowerCase()
        term.push(item.user.toLowerCase())
        return term.includes(value)? setUser(true) :setUser(false)
        })
        
    }

    const handleEmail=(e)=>{

            let term =[] 
            datAdmin.map((item)=>{
            const value = e.target.value.toLowerCase()
            term.push(item.email.toLowerCase())
            return term.includes(value)? setEmail(true) :setEmail(false)
            })
            
        }

    const handlePassword=(e)=>{
        return e.target.value.match(/[0-9a-zA-Z.*]{8,}/g)? setPassword(true) :setPassword(false)
    }

    const mutation = useMutation(formData => {
        return axios.post('http://localhost:2000/users/add', formData)
            
        })
        const onSubmit = (event) => {
            event.preventDefault()
            
            const value =Object.fromEntries(new FormData(event.target))
            Object.assign(value,{img:"https://picsum.photos/id/823",follow:[],msg:[],learn:[]})

            mutation.mutate(value)
            
            // envoie d'email service_v5vlsiz
            //console.log(value)
            
            emailjs.send("service_v5vlsiz", "template_ogxbv29", value, "user_QNXIj26L8qANd6vZ9HRZB")
            .then((res)=>{
                console.log('sucess',res)
            }, (err)=>{
                console.log('error', err)
            })
            // naviagtion 

            navigate("/inscrit")
            
            //console.log(Object.fromEntries(new FormData(event.target)))
        }




    return <>
    <NavBar search={true}/>
        <FormUser  onSubmit={onSubmit}  user={user} email={email} password={password} handlePassword={handlePassword} handleEmail={handleEmail} handleUser={handleUser}/>
    </>
}

const FormUser = ({onSubmit,user,email,password,handlePassword,handleEmail,handleUser})=>{
    
    return<>
       
        <div className="container">
            <div className="row ">
            <div className="col"></div>
            <div className="col-sm-4">
                        <div className="mt-3 ">
                            <h3 className="ms-3"> Renseigner vos information !</h3>
                        </div>
            <form  className="form-group"  onSubmit={onSubmit}>
                <Field type="text" name="user"  spans={user ? "Votre username est deja utiliser !": ""} place="User Name" required onChange={handleUser}>User Name</Field>
                <Field type="email" name="email" spans={email ? "Votre Email est deja utiliser !": ""}  place="name@example.com" required onChange={handleEmail}>Créer votre Email</Field>
                <Field type="password"  span="Votre Password doit comporter en moin 8 carractaire" pass={password} name="password" required onChange={handlePassword}>Créer votre Password</Field>
                
                <input type="checkbox" className="form-check-input mt-3" required/>
                <label className=" form-check-label fw-lighter" >J'accepte les conditions d'utilisation et la politique de confidentialité.</label>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className={(user || email || !password)?"btn btn-primary mt-2 w-25  disabled":"btn btn-primary mt-2 w-25  "} type="submit"> Créer</button>
                </div>
                
            </form>
            </div>
            <div className="col"></div>
            </div>
        </div>
    </>
}
