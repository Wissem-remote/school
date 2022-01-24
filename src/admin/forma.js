
import React,{useEffect,useState} from 'react'
import {useLocation,useNavigate} from 'react-router-dom';
import { useForm } from '../hook/form';
import {useToggle} from '../hook/toggle'
import { Modal } from '../ui/modal'
import YouTube from 'react-youtube'
import getYouTubeID from 'get-youtube-id';
import { useQuery } from 'react-query';
import {getConnectAdmin} from '../Query'

export  const Check=()=> {
   
    
   
    const navigate = useNavigate()
    
    const location = useLocation()
    const index =location.state
    const [log] = useState(index)
    useEffect(() => {
        
        return  log === null &&  navigate("/") 
    }, [log,navigate])
    return <>
        <NabarDarck/>
        
        <Container/>
    </>
}

const NabarDarck = ()=>{
    const navigate = useNavigate()
    const { data } = useQuery('Data',getConnectAdmin)
    const datAdmin = data?.data
    const handAdmin=()=>{
        navigate("/admin/connect",  { state:{id: datAdmin[0]._id} }) 
    }

    return <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ">
                <a className="navbar-brand" href="#Nav" onClick={handAdmin}>Administration</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav me-auto">
                            
                            
                            


                        
                        </ul>

                
                        </div>
                            
            </div>
</nav>
</>
}


const Container = ()=>{

    
    return<>
   

    <div className="container">
        <div className="row ">
            <div className="  col-lg-6 rounds mt-4" >
                <div className="fw-light p-3">
                <h5 className="fw-light">Contenue</h5>
               
               <Accor/>
                </div>
               
            </div>
            <div className=" m5  col-lg-3  mt-6 "> 
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
                    
                    

return<>
<p    onClick={setAdd}>{children}{add&& <Modal title={children} > 

<YouTube videoId={getYouTubeID(video[0])} opts={opts} />
</Modal>}
</p>
</>
} 



const Card=()=>{
    const[form]=useForm()
    const location = useLocation()
    const index =location.state
    
    return<>
    <div className="rounds b1 p-2">
    <img src={`/img/${form?.data[index.values].type}.jpg`} className="card-img-top r5 mt-2 mb-3" alt="logo"/>
            <div className="d-grid gap-2 col-10 m-auto mb-4">
                <button className={form?.data[index.values].tarif === "free"?"btn btn-primary":"btn btn-primary disabled"} type="button">{form?.data[index.values].tarif === "free"? "Gratuit": "Payer"}</button>
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