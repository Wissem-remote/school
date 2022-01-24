import React, {useState} from 'react'
import {getConnectAdmin} from '../Query'
import {useQuery} from "react-query"
import {  useNavigate } from "react-router-dom"




export const Iden = ()=>{
    const [login, setLogin]=useState(false)
    const navigate = useNavigate()
    const { data } = useQuery('Data',getConnectAdmin)
    const datAdmin = data?.data
    const isLogn = (e)=>{
        const value = Object.fromEntries(new FormData(e.target)) 

        return value.user === datAdmin[0].name && value.password=== datAdmin[0].password? 
        navigate("/admin/connect", { state:{id: datAdmin[0]._id} })
        :  setLogin(true)
        
    }
    
    return<>
            <Connect islogn={isLogn} error={login}/> 
            </>
}



const Connect =({islogn, error}) => {
    return <>
    <div className="container">
            <div className="row position-absolute top-50 start-50 translate-middle">
                <div className="col">
            <form className="form-group" onSubmit={islogn}>
                <h2> Se Connecter ?</h2>
                {error && <span className="text-danger">Mot-Pass ou Identifiant Incorect ! </span>}
                    <div className="mb-3">
                        <label  className="form-label">User</label>
                        <input type="text" className="form-control" required name="user" id="name" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Password</label>
                        <input type="password" className="form-control" required name="password" id="password"/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary mt-2">Se connecter !</button>
            </form>
                
                </div>
                
            </div>
           
        </div>
    </>
}
