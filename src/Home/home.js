import axios from 'axios'
import React, {   useEffect, useState } from 'react'
//import { useWindowDimensions } from 'react-native';
import { useMutation } from 'react-query'
import { NavBar } from '../App/navBar'
import { useData, useIndex } from '../hook/data'
import {useForm} from '../hook/form'
import {useNavigate} from 'react-router-dom';
import Slider from "react-slick";

export const Home =()=> {
    const[user]=useData()
    const[form]=useForm()
    const[search,setSearch]=useState(false)
    const[check,setCheck]=useState(false)
    const filter=(e)=>{
        
       let searchs = form?.data.filter(v=>{
            let value= e.toLowerCase()
            let type= v.type
            return type.indexOf(value) > -1
        }) 
        setSearch(searchs)
    }
  

    return <>
        <NavBar value={filter} check={setCheck} data={user} logout={false}/>
        {check?<FilterRed value={search}/>:<Container user={user}/>}
    <div> hello</div>
    </>
    
}

const FilterRed=({value})=>{
    return<>
          <div className="container mt-5">
        <div className="row ">
            <h4 className="fw-light"> Votre Rechecher</h4>
            {value.length > 0 ? value.map((v,i)=>{
                return  <Cardx key={i} value={v}/>
            }): <p> Desoler aucune Formation ne correspond ...</p>}
        </div>
    </div>
    </>
}
const Cardx=({value})=>{
    const [user]=useData()
    const[index]=useIndex()
    const [form]=useForm()
    const navigate = useNavigate()
  
    
    const handleImg=()=>{
        
        const index =form?.data.includes(value) &&  form?.data.indexOf(value)
        
        
        navigate("/coures", { state:{values: index }})
    }

    const mutation = useMutation(formData => {
        return axios.post('https://geek-apps.herokuapp.com/user/update', formData)
            
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
        <div className="col-sm-3 mt-3 mb-3 me-2">
         
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

const Container=()=>{
    const[user]=useData()
    return<>
    <div className="c1 ">
    <div className="container" >
    <div className="row">
        <div className="col-sm col-lg-5 mt-5">
            <h2 className="p-2 t1" >Bienvenue chez Geeks UI <br/>L'application d'apprentissage </h2>
                    <h5 className="p-1 t2" >Instructeur trié sur le volet et cours élaborés par des experts, conçus pour les étudiants et les entrepreneurs modernes.</h5>
                    <div className=" mt-3 ">{user ? 
                        <button type="button " className=" me-2 btn btn-success p-3 text-white ">Parcourir les cours</button>
                        : <div>
                            <button type="button " className=" me-2 btn btn-success p-3 text-white ">Parcourir les cours</button> 
                        <button type="button " className="btn btn-light p-3 text-dark">Etes-vous instructeur </button>
                        </div>
                    }
                
                    </div>
        </div>
                <div className="col-sm col-lg-6 ">
                        <img alt="hero" className="p1" src="/img/hero.png"/>
                </div>
        </div>
            

    </div>
    </div>
    
    <Side/>
    <List/>
    </>
}

const Side=()=>{
    return<>
    <div className="container">
    <div className="row ">
        <div className="col-sm-4 mt-3 ">
            <div className="row ">
            <div className="col-1 " >
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-play-circle  text-success" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                </svg>
            </div>
            <div className="col-7 ms-4 ">
            <span >30 000 cours en ligne </span><br/>

            <span style={{fontSize: '.90rem' }} className="fw-lighter ">Profitez d'une variété de sujets frais</span>
            </div>
            </div>
           
        </div>
        <div className="col-sm-4 mt-3">
            <div className="row">
            <div className="col-1 " >
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle  text-success" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            </div>
            <div className="col-8 ms-4">
            <span >Instruction d'experts </span><br/>

            <span style={{fontSize: '.90rem' }} className="fw-lighter ">Trouvez le bon instructeur pour vous</span>
            </div>
            </div>
           
        </div>
        <div className="col-sm-4  mt-3">
            <div className="row">
            <div className="col-1 " >
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-clock text-success" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
            </div>
            <div className="col-7 ms-4">
            <span >Accès à vie</span><br/>

            <span style={{fontSize: '.90rem' }} className="fw-lighter ">Apprenez à votre rythme</span>
            </div>
            </div>
           
        </div>
        
    </div>
    </div>
  
    </>
}

const List=()=>{
    const [width, setWidth]   = useState(window.innerWidth);
   
    const updateDimensions = () => {
        setWidth(window.innerWidth);
      
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);
    
    const [form]=useForm()

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: width < 800?1:4,
        slidesToScroll: 1
      };
  
    return<>
   
    <div className="container mt-5">
        <div className="row ">
            <h4 className="fw-light"> Dernier cours en ligne ...</h4>
           <div>
           <Slider {...settings}>
           
           { form?.data.slice(0).reverse().map((v,i)=>{
               return v.state === "on"&& <Card key={i} value={v}/>
           })}
           </Slider>
           </div>
           

            <br/>

            <h4 className="fw-light mt-5"> Autre cours ...</h4>
            <div>
            <Slider {...settings}>
            { form?.data.map((v,i)=>{
               return v.state === "on"&& <Card key={i} value={v}/>
           })}
             </Slider>
            </div>
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
        return axios.post('https://geek-apps.herokuapp.com/user/update', formData)
            
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
        <div className="col-sm mt-3 mb-3 me-2">
         
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