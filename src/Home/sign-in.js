import React,{   useEffect, useState} from 'react'
import { NavBar } from '../App/navBar'
import { Field } from '../ui/field'
import {useQuery} from "react-query"
import {getConnectUser} from '../Query'
import {  Link, useNavigate } from "react-router-dom"
import encoder from 'int-encoder'



export const Signin=()=> {
    const [email, setEmail] = useState({pass:false,value:"",index:""})
    const [password, setPassword] = useState({pass:false,value:""})
    const[check,setCheck]=useState(false)
    const { data } = useQuery('repoData',getConnectUser)
    const datAdmin = data?.data
    const navigate = useNavigate()
    useEffect(()=>{ 
        localStorage.getItem('SGVsbG8=') && navigate("/")
        })

//index:term.pass.indexOf(password.value)
    const handleEmail=(e)=>{
            let term =[] 
            datAdmin.map((item)=>{
            const values = e.target.value.toLowerCase()
            term.push(item.email.toLowerCase())
            return term.includes(values)? setEmail({pass:true,value:values,index:term.indexOf(values)}) :setEmail({pass:false})
            })

    }

    const handlePassword=(e)=>{
        let term ={email:[],pass:[]} 
        
            datAdmin.map((item)=>{
            let values = e.target.value
            term.email.push(item.email)
            term.pass.push(item.password)
            term.email.includes(email.value)&& setPassword({value:term.pass[term.email.indexOf(email.value)]})
            return values === password.value && setPassword({pass:true})
        })
    }

    const handClick = ()=>{
        const key = encoder.encode(email.index)
        password.pass ?  (()=> { localStorage.setItem('SGVsbG8=',key); navigate("/" )})() : setCheck(true)
    }
    
    
    
    return <>
    <NavBar search={true} />
    
    <Content  check={check}  handleClick={handClick} handlePassword={handlePassword} email={email} pass={password} handleEmail={handleEmail}/>
    </>
}

const Content = ({check,handleClick,email,pass,handleEmail,handlePassword})=>{
    return <>
     <div className="container">
            <div className="row ">
            <div className="col"></div>
            <div className="col-sm-4  ">
                        <div className="mt-3 ">
                            <h3 className="ms-3"> Renseigner vos identifiant !</h3>
                        </div>
                    {check && <div className="alert alert-danger" role="alert">
                        Votre Password ne coorespond pas !
                        </div>}
           
               
                <Field onChange={handleEmail}  type="email" name="email" required pass={email.pass} span={email.pass && "Email Valide !"}  place="name@example.com">Votre Email</Field>
                <Field onChange={handlePassword} type="password"   name="password" pass={pass.pass} span={pass.pass && "Password Success !"} required >Votre Password</Field>
                

                <label className=" form-check-label fw-lighter mt-2" >Inscrivez-Vous ? <Link to="/sign-up" className="fw-normal text-decoration-none">Ici</Link></label>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <button className={email.pass ?"btn btn-primary mt-2 w-50 ":"btn btn-primary mt-2 w-50   disabled"} onClick={handleClick}> Connecter-Vous</button>
                </div>
                
           
            </div>
            <div className="col"></div>
            </div>
        </div>
    </>
}