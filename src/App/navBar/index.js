import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData, useIndex } from '../../hook/data'

export const NavBar = ({check,value,search=false,data,logout=true})=> {
  const[index]=useIndex()
 
    return <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    {data?<span className="navbar-brand mb-0 "><img src="/img/logo.png"className="imgx" alt="logo"/></span>:
    <Link to="/admin"><span className="navbar-brand mb-0 "><img src="/img/logo.png"className="imgx" alt="logo"/></span></Link>
    }
  
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
        
    <List/>
      {search?"":   <form className="d-flex">
        <input className="form-control me-2" 
        onChange={(e)=>{
          check(e.target.value.length >0);
          value(e.target.value)
        }} 
        type="search" placeholder="Recherche" aria-label="Search"/>
      </form>
} 
   
      <ul className="navbar-nav ms-auto">
      <li className="nav-item j1">
          
          {data?<DropNot ><i className="bi bi-bell li nav-link me-3 " ></i></DropNot>:<Link className="nav-link pe-0" to="/sign-up">Sign-Up</Link>}
        </li>
        
        <li className="nav-item j1 ">
          {data?<DropLink item={true} log={logout}><img className="top img" alt="avatar" width="35px" height="35px"src={data?.data[index].img+"/35/35"}/></DropLink> :<Link className="nav-link" to="/sign-in"> | Sign-In</Link>}
          
         
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
}

const List = ()=>{
    return<>
     <ul className="navbar-nav">
        
        <li className="nav-item">
          <Link to="/" className="nav-link " >Home</Link>
        </li>
       
        <DropList />
    </ul>
    </>
}


const DropList =()=>{
  
return<>
  <li className=" j1  nav-item dropdown me-1">
            <a className=" nav-link  " href="#Dropdown" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Nos Formations
            </a>
                <ul className="dropdown-menu rounds p-2 fw-5 j2" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/formation/javascript" >JavaScript</Link></li>
                    <li><Link className="dropdown-item" to="/formation/react" >React</Link></li>
                    <li><Link className="dropdown-item" to="/formation/laravel" >Laravel</Link></li>
                    <li><Link className="dropdown-item" to="/formation/python" >Python</Link></li>
                    <li><Link className="dropdown-item" to="/formation/wordpress" >WordPress</Link></li>
                    <li><Link className="dropdown-item" to="/formation/css" >CSS3</Link></li>
                    <li><Link className="dropdown-item" to="/formation/autre" >Autre</Link></li>
                  
                    
                </ul>
        </li>
</>
}



const Lists=({children})=>{
  const navigate = useNavigate()
 return<>
   <li><p  onClick={()=>{(()=> { localStorage.clear();  navigate("/")})()}} className="dropdown-item n5">{children}</p></li>
 </>
}

const DropLink=({children,item=false,log})=>{
  const[index]=useIndex()
  const[users]=useData()
  return<>
  <a className="nav" href="#Dropdown" id="navbar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {children}
            </a>
            {item&&
              <ul className="dropdown-menu j2 mt-3 rounds " style={{right:'0px', left:'auto'}} aria-labelledby="navbar">
              <li><a href="#link-out" className="dropdown-item">Hello ! {users?.data[index].user}</a></li>
              <ListLink to={"/user/0"}>Profils</ListLink>
              {log?<Lists>Deconnecter Vous</Lists>:""}
              
              </ul>
            }

            
  </>
}

const DropNot = ({children})=>{
  const[user]=useData()
  const[index]=useIndex()
  return<>
  <a className="nav" href="#Dropdown" id="navbar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {children}
  </a>
  <ul className="dropdown-menu j2 rounds " style={{right:'0px', left:'auto',width:'300px'}} aria-labelledby="navbar">
  <li><a href="#link-out" className="dropdown-item"> Message </a></li>
  <hr/>
  <div  className="l1 col-12" >
    <ul className="list-unstyled col-11 m-auto">
      
      {user?.data[index].msg.length === 0 ? <li> aucun message...</li> : user?.data[index].msg.map((v,i)=>{
                
                return v.length > 0 &&<li key={i} className="text-decoration-none">
                  <Link  to="/user/5" className="text-decoration-none">
                  <div  className="alert alert-primary mb-1 " role="alert">
                {v}
                
                </div>

                </Link>
                </li>
            })} 
      </ul>
  </div>
  <hr/>
  
  
  </ul>
            </>
}

const ListLink=({children,to})=>{
 
  return<>
    <li><Link to={to} className="dropdown-item">{children}</Link></li>
  </>
 }
 