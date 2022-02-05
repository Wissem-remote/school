import React, { useEffect, useState } from 'react'
import {NavBar} from '../App/navBar/index'
import { useData, useIndex } from '../hook/data'
import {useLocation,useNavigate} from 'react-router-dom';
import { useForm } from '../hook/form';
import {useToggle} from '../hook/toggle'
import { Modal } from '../ui/modal'
import YouTube from 'react-youtube'
import getYouTubeID from 'get-youtube-id';
import { useMutation } from 'react-query';
import axios from 'axios';

export const Forma= ()=> {
    const[user]=useData()
    
    const navigate = useNavigate()
    const location = useLocation()
    const index =location.state
    const [log] = useState(index)
    
    useEffect(() => {
       
        return  log === null &&  navigate("/") 
    }, [log,navigate])


    return <>

        <NavBar data={user} search={true} logout={false}/>
        <Container />
    </>
}

const Container = ()=>{
    const[form]=useForm()
    const location = useLocation()
    const index =location.state
    const note = isNaN(form?.data[index.values].note / form?.data[index.values].nbNote) ? 0 : form?.data[index.values].note / form?.data[index.values].nbNote
    
    return<>
    <div className="c1">
    <div className="container ">
            <div className="row ">
                <div className="col-sm col-lg-7 mt-5">
                    <h2 className="fs-1 p-2 t1">Premiers pas avec {form?.data[index.values].type}</h2>
                    <p className="p-1 t1 fs-2 fw-light">{form?.data[index.values].type} est le langage de programmation populaire qui alimente les pages Web et les applications Web. Ce cours vous permettra de commencer à coder</p>
                    <div>
                    <div className="row ms-2 p2">
                        <div className="col-lg-2">
                        <i className={`bi ${form?.data[index.values].level}`} style={{fontSize: '1.1rem',color:'white'}}></i>
                            <span className="ms-3 text-white">
                            {form?.data[index.values].level === "bi-reception-4"&& "Avancer"}{form?.data[index.values].level === "bi-reception-2"&& "Beginner"}{form?.data[index.values].level === "bi-reception-3"&& "Moyen"}
                            </span>
                        </div>
                        <div className="col-lg-5">
                            
                                <i className={note >= 1? "bi bi-star-fill me-1  text-warning":"bi bi-star me-1  text-warning"}></i>
                                <i className={note >= 2? "bi bi-star-fill me-1  text-warning":"bi bi-star me-1  text-warning"}></i>
                                <i className={note >= 3? "bi bi-star-fill me-1  text-warning":"bi bi-star me-1  text-warning"}></i>
                                <i className={note >= 4? "bi bi-star-fill me-1  text-warning":"bi bi-star me-1  text-warning"}></i>
                                            
                                            </div>
                                </div>
                        </div>

                    </div>

                    
                    </div>
                </div>
            </div>

    <div className="container">
        <div className="row ">
            <div className="  col-lg-6 rounds t3 m10" >
                <div className="fw-light p-3">
                <h5 className="fw-light">Contenue</h5>
               
               <Accor/>
                </div>
               
            </div>
            <div className=" m5  col-lg-3  t6 "> 
            <Card />
            <Teacher/>
            </div>
        </div>
    </div>
       
    </>
}


const Accor=()=>{
    const[form]=useForm()
    const location = useLocation()
    const index =location.state
    return<>
    
    <div className="accordion accordion-flush" id="accordionFlushExample">
   
    {form?.data[index.values].table.map((v,i)=>{
        
        let session =Object.values(v)
        return <Link  titre={session[0].titre} item={session[0].item} num={i} key={i}/>
        
    })
    }
    
        
    </div>
    </>
}
const Link =({titre,item,num})=>{
    return<>
        <div className="accordion-item">
            <h2 className="accordion-header" id={`panel${num}`}>
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panels${num}`} aria-expanded="true" aria-controls={`panels${num}`}>
            {titre}
            </button>
            </h2>
            <Mini item={item} num={num} />
            
            
        </div>
    </>
}
const Mini=({item,num})=>{
   
    let items=Object.values(item)
    const isOdd =(num)=> { return num % 2;}
  
    return <>
        <div id={`panels${num}`} className="accordion-collapse collapse" aria-labelledby={`panel${num}`} >
                <div className="accordion-body">
                {items.map((v,i)=>{
                    
                    
                        return isOdd(i) === 1 &&  <You key={i}  item={items} value={i}>{v}
                        
                        </You>
                    })}
                </div>
            </div>
    </>
}
const You =({item,children,value})=>{
    const[form]=useForm()
    const location = useLocation()
    const index =location.state
    const [add,setAdd]=useToggle(false)
    let width = window.innerWidth < 800 ? 'auto' :  '1040'
    let height =  window.innerWidth < 800 ? 'auto' : '490'
    const opts = {
        height: height,
        width: width,
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
                    }
                    }
                    let video = Object.values(item[value-1])
                    const tarif = form?.data[index.values].tarif
                    video[1]= tarif === "free" ? 'on' : video[1]
const handClick=()=>{

    return video[1] === 'on' && setAdd()
}
return<>
<p   className="s9" onClick={handClick}>{children}<span className="fw-lighter fs-6 text">{video[1] === 'on'? " on":" off"}</span>{add&& <Modal title={children} > 

<YouTube videoId={getYouTubeID(video[0])} opts={opts} />
</Modal>}
</p>
</>
} 



const Card=()=>{
    const[form]=useForm()
    const location = useLocation()
    const[kid,setKid]=useState(false)
    const[users]=useData()
    const[inde]=useIndex()
    const navigate = useNavigate()
    const [check,setCheck]=useState(false)
    const index =location.state
    const mutation = useMutation(formData => {
        return axios.post('https://backenduk.herokuapp.com/user/update', formData)
            
        })
        
        
        useEffect(()=>{
            
            (users && users?.data[inde].learn.includes(form?.data[index.values].id))? setCheck(true): setCheck(false)
        },[users,form,inde,index.values])

    const handleClick=()=>{
        let tab = users ? users?.data[inde].learn : []
        tab.push(form?.data[index.values].id)
        const values={
                    user:users? users?.data[inde].user: " ",
                    learn: tab
                }
            return users ?  (()=>{ mutation.mutate(values); setKid(true)})(): navigate("/sign-in")

    }
    
    return<>
    <div className="rounds b1 p-2">
    <img src={`/img/${form?.data[index.values].type}.jpg`}  className="card-img-top r5 mt-2 mb-3" alt="logo"/>
            <div className="d-grid gap-2 col-10 m-auto mb-4">
                {check?
                <button   className={(form?.data[index.values].tarif === "free"&& kid)?"btn btn-primary disabled":"btn btn-primary disabled"} type="button">{form?.data[index.values].tarif === "free"? "Ajouter": "Payer"}</button>:
                <button onClick={handleClick}   className={(form?.data[index.values].tarif === "free"&& kid)?"btn btn-primary":"btn btn-primary disabled"} type="button">{form?.data[index.values].tarif === "free"? "Ajouter": "Payer"}</button>

                }
                <span className="text-info fw-bold fs-3 text-center">{form?.data[index.values].tarif === "pay" && form?.data[index.values].price+"$"}</span>
            </div>
    </div>
            
           </>
}

const Teacher = ()=>{
    
    const[form]=useForm()
    
    const location = useLocation()
    const index =location.state
   
    return<>
      <div className="rounds b1 p-2 mt-3">
        <div className="row">
        <div className="col-4 " >
        <img  className="imgs" src={`${form?.data[index.values].userImg}/70/70`} alt="avatar"  width="70px" height="70px"/>
        </div>
        <div className="col-5  d-flex align-items-center">
            <span> {form?.data[index.values].userName} </span>
        </div>
        </div>
    </div>
    </>
}