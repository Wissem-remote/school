import React, { useEffect } from 'react'
import { NavBar } from '../App/navBar'
import { Link } from 'react-router-dom'
import {  useNavigate } from "react-router-dom"


export const Signx =()=> {
    const navigate = useNavigate()
    useEffect(()=>{ 
        localStorage.getItem('SGVsbG8=') && navigate("/")
        })
    return <>
        <NavBar search={true}/>
        <Content/>
    </>
}

const Content =()=>{
    return<>
       <div className="container">
            <div className="row ">
                <div className="col-4 position-absolute top-50 start-50 translate-middle">
                <h3 className="mb-3">Félicitation vous vous etes inscrit à notre site Geeks ...</h3>
                <p className="text-secondary"> Vous aller recevoir un email !</p>
                <Link className="btn btn-primary btn-md me-2" to="/sign-in">Connecter-vous ?</Link>
                <Link to="/" className="btn btn-secondary btn-md me-2"> Revenir à l'Accueil</Link>
                </div>
            </div>
        </div>
        
    </>
}