import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { useMutation, useQuery } from 'react-query';
import {useLocation,useNavigate} from 'react-router-dom';
import { useForm } from '../hook/form';
import { getConnectUser } from "../Query";
import { useToggle } from '../hook/toggle'
import { Modal } from '../ui/modal'


export const Logins = ()=>{
    const [setting,setSetting]=useState(0)
    const [work]=useState([<Forma/>,<Client/>])
    const navigate = useNavigate()
    const location = useLocation()
    const check = location.state
    const [log, setLog] = useState(check)
    
    useEffect(() => {
        
        return  log === null &&  navigate("/") 
    }, [log,navigate])
    
    return<>
   
    
    <NabarDarck checks={setLog} set={setSetting}/>
        <Works>{work[setting]}</Works>
    </>
}

const Works=({children})=>{
    return<>
    <div className="container mt-5">
        {children}
    </div>
    </>
}

const NabarDarck = ({checks,set})=>{

    

    return <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ">
                <span className="navbar-brand n5" >Administration</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav me-auto">
                            
                            
                            <li className="nav-item">
                            <span className="nav-link active n5" aria-current="page" onClick={()=>{set(0)}} > Formation</span>
                            </li>

                            <li className="nav-item">
                            <span className="nav-link active n5" aria-current="page" onClick={()=>{set(1)}} > Client</span>
                            </li>


                        
                        </ul>

                        <form className="d-flex ">
                                <button className="btn btn-outline-success" type="button" onClick={()=>{ checks(null)  }}>LogOut</button>
                                
                                </form>
                        </div>
                            
            </div>
</nav>
</>
}

const Client = ()=>{
    const { data } = useQuery('repoData',getConnectUser)
    const datAdmin = data
    return<>
   
    <table className="table">
    <thead>
        <tr>
        <th scope="col">Num</th>
        <th scope="col">UserName</th>
        <th scope="col">Mail</th>
        <th scope="col">Action</th>
        
        
        </tr>
    </thead>
    <tbody>
            {datAdmin?.data.slice(0).reverse().map((v,i) =>{
                return <List key={i} value={v} index={i}/>
            })}
    </tbody>
    </table>
    </>
}

const List = ({value,index})=>{
    const[day,setDay]=useToggle(false)
    const[add,setAdd]=useToggle(false)
    const mutation = useMutation(formData => {
        return axios.post('http://localhost:2000/user/update', formData)
            
        })
        const {mutate}= useMutation(()=>{
            return axios.delete(`http://localhost:2000/user/delete/${value.user}`) 

           
            
            })
            const handleDelete=()=>{
                (()=> { mutate();  window.location.reload()})()
            }

        const onSubmit=(e)=>{
            e.preventDefault()
            setAdd()
            let tab = value.msg
            const values =Object.fromEntries(new FormData(e.target))
            tab.push(values.msg)
            const val={
                user: value.user,
                msg: tab
            }
            
            
            mutation.mutate(val)
        }

    return<>
     <tr>
        <th scope="row">{index}</th>
        <td>{value.user} </td>
        <td>{value.email} </td>
        <td>
        <button className="btn btn-warning me-4" onClick={setDay} > Delete</button>
        {day&&<Modal onClose={setDay} title="Supprimet le Client" sup={false}>
            <span> Etes-vous sur de le Suprimer</span>
            <hr/>
            <button className="btn btn-danger me-3" onClick={setDay}> Annuler </button>
            <button className="btn btn-primary" onClick={handleDelete}> Suprimer</button>
            </Modal>}
        <button className="btn btn-primary me-4" onClick={setAdd} > Send Message</button>
        {add&&<Modal onClose={setAdd} title="Envoyer un Message ?">
            <form onSubmit={onSubmit}>
        <div className="form-floating">
        <textarea name="msg" required className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{width:'1060px',height: '250px'}}></textarea>
            <label htmlFor="floatingTextarea2">Votre Message</label>
        </div>
        <hr/>
        <button className="btn btn-primary float-end" type="submit"> Envoyer</button>
        </form>
            </Modal>}
        </td>

    </tr>
    </>
}

const Forma=()=>{
    const[form]=useForm()
   
    return<>
    <table className="table">
    <thead>
        <tr>
        <th scope="col">Num</th>
        <th scope="col">Titre video</th>
        <th scope="col">Nombre de Sesion</th>
        <th scope="col">Etat</th>
        <th scope="col">Vendu</th>
        <th scope="col">Action</th>
        
        </tr>
    </thead>
    <tbody>
            {form?.data.slice(0).reverse().map((v,i) =>{
                return <Ligne key={i} value={v} index={i}/>
            })}
    </tbody>
    </table>
    </>
}


const Ligne=({value,index})=>{
    const [form]=useForm()
    const navigate = useNavigate()
  
    const handleCheck=()=>{
        
        const index =form?.data.includes(value) &&  form?.data.indexOf(value)
        
        
        navigate("/admin/check", { state:{values: index }})
    }
    const mutation = useMutation(formData => {
        return axios.post('http://localhost:2000/form/update', formData)
            
        })

    const onValide=()=>{
        
        const values={
        state:"on",
        id: value.id
        }
        
        mutation.mutate(values)
        window.location.reload()
    }

    const {mutate}= useMutation(()=>{
        return axios.delete(`http://localhost:2000/form/delete/${value.id}`) 
        
        })
        const handleDelete=()=>{
            (()=> { mutate(); window.location.reload() })()
        }
    return<>
    <tr>
        <th scope="row">{index}</th>
        <td>{value.titreVideo}</td>
        <td>{value.table.length}</td>
        <td>{value.state+"-Line"}</td>
        <td>{value.tarif === "free"? "Gratuit": "Payant"}</td>
        <td>
        <button className="btn btn-info me-4" onClick={handleCheck}> Check</button>
        <button className="btn btn-warning me-4" onClick={handleDelete}> Delete</button>
    {value.state === "off"&& <button className="btn btn-primary" onClick={onValide}> Valider</button>}    
        </td>
       
    </tr>
    </>
}
