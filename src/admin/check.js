import React, { useEffect} from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getConnectAdmin } from '../Query'

export const Effaceur=()=> {
    const { data } = useQuery('Data',getConnectAdmin)
    const datAdmin = data?.data
   
    const navigate = useNavigate()
    const handAdmin=()=>{
        navigate("/admin/connect",  { state:{id: datAdmin[0]._id} }) 
    }
    useEffect(()=>{
        
        
        
    },[])

    return <>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ">
                <span className="navbar-brand n5"  onClick={handAdmin}>Administration</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav me-auto">
                            
                            
                            


                        
                        </ul>

                
                        </div>
                            
            </div>
</nav>
<div className="container d-flex justify-content-center align-items-center w-100 rounded " style={{height:"70vh"}}>
    <div className="alert-info w-50 d-flex justify-content-center align-content-center rounded"  style={{height:"20vh"}}>
        <button className="btn btn-primary m-auto" onClick={handAdmin} > Retourner</button>
    </div>
</div>
    </>
}
