import axios from 'axios'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import {useNavigate, useParams} from 'react-router-dom'
import { NavBar } from '../App/navBar'
import { useData, useIndex } from '../hook/data'
import { useForm } from '../hook/form'

export const Menu= ()=> {
    const [user]=useData()
    const parms = useParams()
    const navigate = useNavigate()
    const check = ["javascript","react","laravel","python","wordpress","css3","autre"]
    useEffect(()=>{
        !check.includes(parms.id)&& navigate("/")
    })
    return <>
    
    <NavBar  data={user} search={true}/>
    <Container />
    </>
}

const Container = (value)=>{
    const [form]=useForm()
    const parms = useParams()
    return<>
    <div className="container">
        <div className="row mt-5">
            <h2> Nos Formation </h2>
        { form?.data.map((v,i)=>{
                return (v.state === "on" && v.type === parms.id)&& <Card key={i} value={v}/>
            })}
        </div>
    </div>
    </>
}


const Card=({value})=>{
    const [user]=useData()
    const[index]=useIndex()
    const [form]=useForm()
    const navigate = useNavigate()
  
    
    const handleImg=()=>{
        
        const index =form?.data.includes(value) &&  form?.data.indexOf(value)
        
        
        navigate("/coures", { state:{values: index }})
    }

    const mutation = useMutation(formData => {
        return axios.post('http://localhost:2000/user/update', formData)
            
        })
    const handleClick=()=>{
       
        let dax =user?.data[index].follow
        dax.push(value.id)
        let values={
            user: user?.data[index].user,
            follow:dax
        }
        
        mutation.mutate(values)
       
    }
    const note = isNaN(value.note / value.nbNote)? 0 : value.note / value.nbNote
    return<>
        <div className="col-sm-3  mt-3 mb-3 ">
         
            <div className="card rounds x1">
         
            <img src={`/img/${value.type}.jpg`} className="card-img-top" alt="logo" onClick={handleImg}/>
           
            <div className="card-body">
                <h5 className="card-title">{value.titreVideo}</h5>
                <div className="card-text">
                    <div className="row">
                            <div className="col-5">
                                
                                    <i className={`bi ${value.level}`} style={{fontSize: '1.1rem', Color: 'bleu'}}></i>
                                
                                    <span className="ms-3">{value.level === "bi-reception-4"&& "Avancer"}{value.level === "bi-reception-2"&& "Beginner"}{value.level === "bi-reception-3"&& "Moyen"}</span>
                                    </div>
                    
                                    <div className="col-lg-5">
                                <i className={note >= 1? "bi bi-star-fill me-1  text-warning":"bi bi-star me-1  text-warning"}></i>
                                <i className={note >= 2? "bi bi-star-fill me-1  text-warning":"bi bi-star me-1  text-warning"}></i>
                                <i className={note >= 3? "bi bi-star-fill me-1  text-warning":"bi bi-star me-1  text-warning"}></i>
                                <i className={note >= 4? "bi bi-star-fill me-1  text-warning":"bi bi-star me-1  text-warning"}></i>
                    
                                </div>
                                <div className="col-5 mt-3">
                                    <span className="text-secondary fs-5 ">{value.tarif === "free"? "Gratuit ": "Payant :"}</span>
                                    
                                </div>
                                <div className="col-5 mt-3">
                                {value.tarif === "pay" && <span className="text-success fs-5 ">{value.price +"$"}</span>}
                                </div>

                    </div>
                    
                </div>
            
                
            </div>
           
            <div className="card-footer bg-transparent p-0 m-0">
                <div className="row d-flex align-items-center">
                    <div className="col-2 ms-3">
                    <img alt="logo" src={`${value.userImg}/30/30`} className="img mt-5 r1" width="30px" height="30px"/>
                    </div>
                    <div className="col-7">
                    <span className="ms-2">{value.userName}</span>
                    </div>
                    <div className="col-2">
                    {user?<button className="btn " onClick={handleClick}><i className={user?.data[index].follow.includes(value.id)?"bi bi-bookmark-star text-primary":"bi bi-bookmark-star "}></i></button>:<button className="btn "><i className="bi bi-bookmark-star "></i></button>}
                    </div>
                </div>
                
                </div>
            </div>
        </div>
    </>
}