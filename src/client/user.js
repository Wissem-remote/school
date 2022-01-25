import React, { useEffect, useState } from 'react'
import { NavBar } from '../App/navBar'
import { useData, useIndex } from '../hook/data'
import { useForm } from '../hook/form'
import {  useNavigate } from "react-router-dom"
import { Accordion } from '../ui/accordion'
import {useMutation} from "react-query"
import axios from 'axios'
import emailjs from 'emailjs-com';
import { Modal } from '../ui/modal'
import {useToggle} from '../hook/toggle'

export const User= ()=> {
    const[user]=useData()
    const navigate = useNavigate()
    
    useEffect(()=>{ 
        !localStorage.getItem('SGVsbG8=') && navigate("/")
        })
    return <>
  
    <NavBar  data={user} search={true}/>
    <Content/>
    </>
}

const Content=()=>{
    
    return<>
        <div className="container">
  <div className="row">
    <div className="col">
      
    </div>
    <div className="col-lg-10">
    <Contents/>
    </div>
    <div className="col">
      
    </div>
  </div>
</div>
    </>
}

const Contents = ()=>{
    return<>
        <Title/>
        <Board/>
    </>
}

const Board=()=>{
    const [setting,setSetting]=useState(0)
    const [work]=useState([ <Create />,<Pass/>,<Parms/>,<MyCreate/>,<Suivi/>,<Msg/>,<Learn/>])
    return<>
        <div className="row mt-4">
            <div className="col-sm-3">
                        <Seting set={setSetting}/>
            </div>
            <div className="col-sm-9">
                    <Work>{work[setting]}</Work>
            </div>
        </div>
    </>
}

const Seting=({set})=>{
return<>
                        <div className="list-group text-center rounds">
                                    <button type="button" className="list-group-item list-group-item-action " style={{borderBottom:'none'}}></button>
                                    
                                    <button type="button" className="list-group-item list-group-item-action" style={{borderBottom:'none'}} onClick={()=>{set(0)}} >Ajouter Une formation</button>
                                    <button type="button" className="list-group-item list-group-item-action" style={{borderBottom:'none'}} onClick={()=>{set(1)}} >Changer de Password</button>
                                    <button type="button" className="list-group-item list-group-item-action" style={{borderBottom:'none'}} onClick={()=>{set(2)}} >Edit Profile</button>
                                    <button type="button" className="list-group-item list-group-item-action" style={{borderBottom:'none'}} onClick={()=>{set(3)}} >Mes Créations</button>
                                    <button type="button" className="list-group-item list-group-item-action" style={{borderBottom:'none'}} onClick={()=>{set(4)}} >Mes Suivis</button>
                                    <button type="button" className="list-group-item list-group-item-action" style={{borderBottom:'none'}} onClick={()=>{set(5)}} >Mes Messages</button>
                                    <button type="button" className="list-group-item list-group-item-action" style={{borderBottom:'none'}} onClick={()=>{set(6)}} >Apprentissage</button>

                                    <button type="button" className="list-group-item list-group-item-action"></button>
                            </div>
</>
}


const Work=({children})=>{
    return<>
    <div className="rounds mb-4">
       {children}
    </div>
    </>
}

const Learn=()=>{
    const[users]=useData()
    const[index]=useIndex()
    const[form]=useForm()
    return<>
    <div>
        <h3 className="fw-light p-3">Mes Cours </h3>
    </div>
        <hr/>
        <div className="row p-4">
           
            {form?.data.map((v,i)=>{
            return users?.data[index].learn.includes(v.id)&& <Card key={i} form={v}/>
        })}
            
        </div>
    </>
}
const Card =({form})=>{
    const [forms]=useForm()
    const navigate = useNavigate()
  
    
    const handleImg=()=>{
        
        const index =forms?.data.includes(form) &&  forms?.data.indexOf(form)
        
        
        navigate("/coures", { state:{values: index }})
    }
    const mutation = useMutation(formData => {
        return axios.post('http://localhost:2000/form/update', formData)
            
        })
    const onSubmit=(e)=>{
        e.preventDefault()
        const values =Object.fromEntries(new FormData(e.target))
        console.log(values.note)
            const value={
                id:form.id,
                note: parseInt(values.note),
                nbNote: form.nbNote + 1
            }
            mutation.mutate(value)
            
    }

return<>
            <div className="col-4 x1">
                <div className="card">
                    <img onClick={handleImg} src={`/img/${form.type}.jpg`} className="card-img-top imgx" alt="cours" width="70px" height="70px"/>
                   
                        <div className="card-body ">
                            <h5 className="card-title">{form.titreVideo}</h5>
                            
                            <form onSubmit={onSubmit}>
                            <div className="col-12 d-flex justify-content-center  ">

                                <div className="form-check form-check-inline ">
                                <input className="form-check-input " type="radio"  name="note" value="1"/>
                                <label className="form-check-label " htmlFor="star1">1</label>
                                </div>
                                <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="note"  value="2"/>
                                <label className="form-check-label " htmlFor="star2">2</label>
                                </div>
                                <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="note" value="3" />
                                <label className="form-check-label " htmlFor="star3">3</label>
                                </div>
                                <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="note" value="4" />
                                <label className="form-check-label " htmlFor="note">4</label>
                                </div>
                                </div> 
                                    <button className="btn-sm btn-primary float-end"> Noter ?</button>
                            </form>
                            
                           
                        </div>
                        
                </div>
               
            </div>
    </>
}
const Msg=()=>{
    const[user]=useData()
    const[index]=useIndex()
    return<>
    <div>
        <h3 className="fw-light p-3">Mes Messagers </h3>
    </div>
        <hr/>
    <div className="row justify-content-center">
        <div className="col-8 ">
        <div data-bs-spy="scroll"  data-bs-offset="0" className="scrollspy-example" tabIndex="0" >
        {user?.data[index].msg.map((v,i)=>{
                
                return v.length > 0 && <div key={i} className="alert alert-success" role="alert">
                {v}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {i}
                    <span className="visually-hidden">New alerts</span>
                </span>
                </div>
            })} 
        </div>
       
       
        </div>
    </div>
    
    </>
}

const Create =()=>{
    const [add,setAdd]= useState(1)
    const[free,setFree]=useState(false)
    const[check,setCheck]=useState(false)
    const[box,setBox]=useState(false)
    const[adds,setAdds]=useToggle(false)
    const[user]=useData()
    const[index]=useIndex()
    const mutation = useMutation(formData => {
        return axios.post('http://localhost:2000/form/add', formData)
            
        })


    const onSubmit = (e) => {
        e.preventDefault()
        const value =Object.fromEntries(new FormData(e.target))
        let tab=[]
        for(let i =0; i < add; i++){
            
            let item ={}
            let o = 1
            for(let d =0; d < 5; d++){
                let boxer={
                    ['session'+i+'video'+d]:value['session'+i+'video'+d],
                    ['session'+i+'box'+d]:value['session'+i+'box'+d]?value['session'+i+'box'+d]: false
                }
                value['session'+i+'video'+d] ? item = Object.assign({...item},{['session'+i+'check'+d]: boxer,['session'+i+'titre'+d]: value['session'+i+'titre'+d]})  : o++
            }
            
            let video = {
                titre: value['session'+i] && value['session'+i],
                item:item
                }
            let session ={
                ['session'+i]:value['session'+i] &&  Object.assign({},video)
            }
            tab.push(session)
        }
        
        const values={
            titreVideo:value.video,
            type:value.typeforma,
            level:value.level,
            tarif:value.tarif,
            price:value.price,
            table:tab,
            state:"off",
            id: Date.now().toString(),
            userIndex:index,
            userName:user?.data[index].user,
            userImg:user?.data[index].img,
            note: 0,
            nbNote: 0
        }
        const mail={
            email:user?.data[index].email,
            user:user?.data[index].user,
            forma:value.video
        }
       
        mutation.mutate(values)
        
        emailjs.send("service_v5vlsiz", "template_aowcj4t", mail, "user_QNXIj26L8qANd6vZ9HRZB")
        .then((res)=>{
            console.log('sucess',res)
        }, (err)=>{
            console.log('error', err)
        })
        setAdds()
    }

    
    return<>
         {adds&& <Modal sup={false} >
        Votre Formation va etre envoyer et  traiter sous peu !
        <hr/>
        <button className="btn btn-primary float-end" onClick={()=>{window.location.reload()}}> Fermer</button>
       
        </Modal>}
         <form onSubmit={onSubmit}>
        <div>
        <h3 className="fw-light p-3">Ajouter un Formation</h3>
        </div>
        <hr/>
        <div className="fw-light p-3">
        <h5 className="fw-light">Information sur votre Formation</h5>

        
            <div className="row">
                <div className="form-group col-6 ">
                    <label className="mt-3 mb-1" htmlFor="video"  > Titre de votre formation</label>
                    <input className="form-control " type="text" name="video"  required/>
                </div>
                <div className="form-group col-6">
                <h5 className="fw-light mb-3 "  > Type de Formation</h5>
                <select className="form-select " name="typeforma" required >
                    <option> </option>
                    <option value="javascript">JavaScript</option>
                    <option value="react">React</option>
                    <option value="laravel">Laravel</option>
                    <option value="python">Python</option>
                    <option value="css">CSS3</option>
                    <option value="wordpress">WordPress</option>
                    <option value="autre">Autre</option>
                </select>
                </div>
                <div className="form-group col-6">
                <h5 className="fw-light mb-4 mt-2"  > Niveaux</h5>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio"  name="level" value="bi-reception-2"/>
                        <label className="form-check-label">Debutant</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio"  name="level" value="bi-reception-3"/>
                        <label className="form-check-label">Intermediare</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="level" value="bi-reception-4"/>
                        <label className="form-check-label">Avancée</label>
                    </div>
            </div>
            <div className="form-group col-6">
            <h5 className="fw-light mb-4 mt-2"  > Tarif </h5>
            <div className="form-check form-check-inline">
                        <input onClick={()=>{(()=> { setFree(true);setBox(false)})()}} className="form-check-input" type="radio"  name="tarif" value="free"/>
                        <label className="form-check-label">Gratuit</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input onClick={()=>{(()=> { setFree(false);setBox(true)})()}} className="form-check-input" type="radio" name="tarif" value="pay"/>
                        <label className="form-check-label">Payant</label>
                    </div>
                    {free?" ":<label className="form-label" htmlFor="video"  > Prix €</label>}
                    <input className="form-control mt-2" type={free?"hidden":"text"} name="price"  required/>

            </div>
            </div>
            

        </div>
        <hr/>
        <div className="p-4">
            <Accordion nb={add} checks={setCheck} box={box}/>
        </div>
        <hr/>
        <div className="p-4 ">
            {add > 3 && <button type="button" className="btn btn-warning btn-sm me-2" onClick={()=>{setAdd(add-1)}}>Delete</button>}
            {add < 5 && <button type="button" className="btn btn-success btn-sm " onClick={()=>{setAdd(add+1)}}>Add Session</button>}
        </div>
        <hr/>
        <div className="p-4 d-flex justify-content-sm-end">
            <button type="submit" className={check === null?" btn btn-primary disabled":"btn btn-primary"}> Envoyer</button>
        </div>
        </form>
    </>
}

const Pass=()=>{
    const[check,setCheck]=useState(false)
    const[pass,setPass]=useState(false)
    const[add,setAdd]=useToggle(false)
    const[users]=useData()
    const[index]=useIndex()

    const handlePass=(e)=>{
        return e.target.value.match(/[0-9a-zA-Z.*]{8,}/g)? setPass(true): setPass(false)
    }

    const handleChange=(e)=>{
        users?.data[index].password === e.target.value?  setCheck(true): setCheck(false)
    }
    const mutation = useMutation(formData => {
        return axios.post('http://localhost:2000/user/update', formData)
            
        })

    const onSubmit=(e)=>{
        e.preventDefault()
        setAdd()
        const value =Object.fromEntries(new FormData(e.target))
        const values={
            user: users?.data[index].user,
            password:value.password
        }
        
        mutation.mutate(values)
       
       
    }
    return<>
    {add&& <Modal sup={false} >
        Votre Password est modifier !
        <hr/>
        <button className="btn btn-primary float-end" onClick={()=>{window.location.reload()}}> Fermer</button>
       
        </Modal>}
    <form onSubmit={onSubmit}>
        
        <div>
        <h3 className="fw-light p-3">Changer votre Password</h3>
        </div>
        <hr/>
        <div className="row p-3">
        
            <div className="col-5">
                <label  className="col-form-label">Your old Password</label>
                <input type="password" className="form-control" onChange={handleChange} required/>
                <span  className={check?"form-text text-success":"form-text "}>
                    {check?"Votre Password Correspond":"Tapez votre ancienne Password"}
                    </span>
            </div>
            <div className="col-5">
                <label  className="col-form-label">New Password</label>
                <input  name="password" type="password" className="form-control" required onChange={handlePass} />
                <span   className={pass?"form-text text-success":"form-text "}>
                Votre Password doit avoir moin 8 carractaire
                    </span>
            </div>

            <div className="col-5 mt-2">
                <button  className={check && pass?"btn btn-primary ":"btn btn-primary disabled"}> Changer</button>
            </div>
                  
                
            </div>
            </form>
    </>
}
const Parms=()=>{
    const[users]=useData()
    const[index]=useIndex()
    const[add,setAdd]=useToggle(false)

    const mutation = useMutation(formData => {
        return axios.post('http://localhost:2000/user/update', formData)
            
        })

    const onSubmit = (e)=>{
        e.preventDefault()
        const value =Object.fromEntries(new FormData(e.target))
        const values = Object.assign(value,{user: users?.data[index].user})
        mutation.mutate(values)
        setAdd()
    }
    return<>
     {add&& <Modal sup={false} >
        Votre Profils est modifier !
        <hr/>
        <button className="btn btn-primary float-end" onClick={()=>{window.location.reload()}}> Fermer</button>
       
        </Modal>}
        <div>
        <h3 className="fw-light p-3">Details Profile ?</h3>
        </div>
        <hr/>
        <form onSubmit={onSubmit}>
        <div className="p-3">
            <div className="row ">
                <div className="col-6 pt-3 ps-4">
                    <div className="row">
                    <div className="col-3"><img className="img" src={users?.data[index].img+"/80/80"} alt="avatar" width="80px" height="80px"/></div>
                    <div className=" col-8 ms-2 ">
                        <span >Your Avatar</span>
                        <p className="fw-lighter"> c'est actuellement votre avatar</p>
                    </div>
                    </div>
                    
                </div>
                <div className="col-5 pt-3 ps-4">
                    <h4 className="fw-light"> Choisissez un Nouveaux</h4>
                </div>
                <hr/>
                    <div className="mb-3">
                    <div className="form-check form-check-inline col-2">
                        <div className="col-8 d-flex justify-content-center"><img className="imgs" src="https://picsum.photos/id/106/70/70" alt="avatar" width="70px" height="70px"/></div>
                        <input className="ms-4 form-check-input "   type="radio" name="img" value="https://picsum.photos/id/106" />

                        </div>

                        <div className="form-check form-check-inline col-2">
                        <div className="col-8 d-flex justify-content-center"><img className="imgs" src="https://picsum.photos/id/823/70/70" alt="avatar" width="70px" height="70px"/></div>
                        <input className="ms-4 form-check-input" type="radio" name="img"  value="https://picsum.photos/id/823" />
                       
                        </div>

                        <div className="form-check form-check-inline col-2">
                        <div className="col-8 d-flex justify-content-center"><img className="imgs" src="https://picsum.photos/id/2/70/70" alt="avatar" width="70px" height="70px"/></div>
                        <input className="ms-4 form-check-input" type="radio" name="img"  value="https://picsum.photos/id/2" />
                       
                        </div>

                        <div className="form-check form-check-inline col-2">
                        <div className="col-8 d-flex justify-content-center"><img className="imgs" src="https://picsum.photos/id/223/70/70" alt="avatar" width="70px" height="70px"/></div>
                        <input className="ms-4 form-check-input" type="radio" name="img"  value="https://picsum.photos/id/223" />
                       
                        </div>

                        <div className="form-check form-check-inline col-2">
                        <div className="col-8 d-flex justify-content-center"><img className="imgs" src="https://picsum.photos/id/659/70/70" alt="avatar" width="70px" height="70px"/></div>
                        <input className="ms-4 form-check-input" type="radio" name="img"  value="https://picsum.photos/id/659" />
                       
                        </div>

                    </div>
                    <hr/>
                        <div className="col-10">
                        <div className=" col-8 ms-2 ">
                        <span >Details Personnel</span>
                        <p className="fw-lighter"> Vos information personnel</p>
                        </div>
                        </div>
                        <div className="col-4 ms-3">
                        <label  className="form-label">Nom</label>
                        <input  name="nom" type="text" defaultValue={users?.data[index].nom&& users?.data[index].nom}  className="form-control" />

                        </div>
                        <div className="col-4 ms-5">
                        <label  className="form-label">Prenom</label>
                        <input  name="prenom" type="text" defaultValue={users?.data[index].prenom&& users?.data[index].prenom}  className="form-control" />

                        </div>
                        <div className="col-6 ms-3 mt-2">
                        <label  className="form-label">Adress</label>
                        <input  name="adress" type="text" defaultValue={users?.data[index].adress&& users?.data[index].adress}  className="form-control" />

                        </div>
                        <div className="col-4 ms-5 mt-2">
                        <label  className="form-label">Zip</label>
                        <input  name="zip" type="text" defaultValue={users?.data[index].zip&& users?.data[index].zip} className="form-control" />

                        </div>
                      
                </div>
                <hr className="mt-5"/>
                        <div className="p-4 d-flex justify-content-sm-end">
                            <button type="submit" className="btn btn-primary"> Envoyer</button>
                        </div>
        </div>
        </form>
    </>
}
const MyCreate=()=>{
    //const[users]=useData()
    const[index]=useIndex()
    const[form]=useForm()
    return<>
   
    <div>
        <h3 className="fw-light p-3">Mes Créations </h3>
    </div>
        <hr/>
    <div className="p-3">
        <h5 className="fw-light p-3"> En cours de validation</h5>
        <div className="row">
        {form?.data.map((v,i)=>{

            return (v.userIndex === index && v.state === "off") && <Cards key={i} form={v}/>
                            })
        }
        </div>
        <h5 className="fw-light p-3"> Vos contenue en ligne</h5>
        <div className="row">
        {form?.data.map((v,i)=>{

                        return (v.userIndex === index && v.state === "on") && <Cards opacity={false} key={i} form={v}/>
                                })
        }
        </div>
    </div>
    </>
}

const Suivi=()=>{
    const[users]=useData()
    const[index]=useIndex()
    const[form]=useForm()
    return<>
        <div>
        <h3 className="fw-light p-3">Contenue Suivi </h3>
    </div>
    <hr/>
    <div className="p-3">
        <h5 className="fw-light p-3"> Mes Favoris</h5>
        <div className="row">
        {form?.data.map((v,i)=>{
            return users?.data[index].follow.includes(v.id)&& <Cards suivi={true} opacity={false} key={i} form={v}/>
        })}
        </div>
        </div>
    </>
}

const Cards =({form,opacity=true , suivi=false})=>{
    const[users]=useData()
    const[index]=useIndex()
    const mutation = useMutation(formData => {
        return axios.post('http://localhost:2000/user/update', formData)
            
        })
    const handleClick=()=>{
        let fly = users?.data[index].follow.filter(item => item !== form.id)
        const values={
            user: users?.data[index].user,
            follow:fly
        }
        mutation.mutate(values)
        window.location.reload()
        
        
    }

    
    return<>
            <div className={opacity?"col-3 opacity-75 x1":"col-3 x1"}>
                <div className="card">
                    <img src={`/img/${form.type}.jpg`} className="card-img-top imgx" alt="cours" width="70px" height="70px"/>
                   
                        <div className="card-body">
                            <h5 className="card-title">{form.titreVideo}</h5>
                            <p className="card-text">{form.state === "off"?"En cour de validation... ":"Cours en Ligne"}</p>
                            {suivi && <button onClick={handleClick} className="btn text-danger float-end"><i className="bi bi-file-x"></i></button>}
                        </div>
                </div>
            </div>
    </>
}


const Title=()=>{
    const[user]=useData()
    const[index]=useIndex()
    return<>
    <div className="mt-3">
            <div className=" titles round-top" >
                
                </div>
            <div className="round-end ">
                <div className="d-flex justify-content-sm-start ms-3 ">
                    <div>
                    <img  className="img" src={user?.data[index].img+"/80/80"} alt="avatar"  width="80px" height="80px"/>
                    
                    </div>
                    <div className="fw-lighter fs-1 taile">
                        <span className="mb-0 p-0 text-capitalize">@{user?.data[index].nom?user?.data[index].nom:user?.data[index].user}</span>
                        {user?.data[index].nom&& <p className="fs-5 m-0 ps-1 taile">{user?.data[index].user}</p>}
                       

                    </div>
                </div>
              
            </div>
    </div>
       
    </>
}