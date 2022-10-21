import React, { useEffect, useState } from 'react'
import getYouTubeID from 'get-youtube-id';

export const Accordion =({nb=3,checks,box})=> {
    var rows = [];
for (var i = 0; i < nb; i++) {
    rows.push(<Table  key={i} num={i} checks={checks} box={box}/>);
}
    
    return <>
        <div className="accordion " id="accordionFlushExample">
        {rows.map((e)=>{return e})}
        
        </div>
        
    </>

}
const Table=({num,checks,box})=>{
    const [add,setAdd]= useState(1)
    
    var rows = [];
    for (var i = 0; i < add; i++) {
        rows.push(<Fields  key={i} session={num} box={box} checks={checks} num={i}/>);
    }
   
    return<>
    <div className="accordion-item">
    <h2 className="accordion-header" id={`panel${num}`}>
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panels${num}`} aria-expanded="true" aria-controls={`panels${num}`}>
            <div >
                <div className="row g-3 align-items-center">
                        <div className="col-auto">
                                <label  className="col-form-label">Votre Session :</label>
                        </div>
                            <div className="col-auto">
                                <input    className="form-control" name={`session${num}`} type="text" placeholder={`Session ${num+1}`} required/>
                            </div>
                            <div className="col-auto">
                                <span className="form-text">
                                Ajouter le titre
                            </span>
                        </div>
                </div>
            </div>
        </button>
    </h2>
    <div id={`panels${num}`} className="accordion-collapse collapse " aria-labelledby={`panel${num}`}>
        <div className="accordion-body">

        {rows.map((e)=>{return e})}
            <hr/>
            <div className="p-4 d-grid gap-2 d-md-flex justify-content-md-end">
            {add > 1 && <button type="button" className="btn btn-warning btn-sm me-2" onClick={()=>{setAdd(add-1)}}>Delete</button>}
            {add < 5 && <button type="button" className="btn btn-primary btn-sm" onClick={()=>{setAdd(add+1)}}>Add Link</button>}
        </div>
        </div>
        </div>
    </div>
       
    </>
}


const Fields=({num,session,checks,box})=>{
    const [link,setLink]=useState(false)
    const [check,setCheck]=useState(false)
    const handleChange=(e)=>{
        setLink(getYouTubeID(e.target.value,{fuzzy: false}))
       
    }
    useEffect(()=>{
        link === null ? setCheck(true):setCheck(false)
        checks(link)
    },[link,checks])
    return<>
    
    <div className="row">
      <div className="form-group col-6">
        <label className="mt-3 mb-1" htmlFor={`ses${session}vid${num}`}  > Mettez votre lien</label>
        <input className="form-control " type="text" name={`session${session}video${num}`} onChange={handleChange} required/>
        {check &&<div  className="form-text text-danger">Le Lien ne Correspond pas</div>}
    </div>
        <div className="form-group col-4">
            <label className="mt-3 mb-1" htmlFor={`session${session}titre${num} `}  > Mettez le titre de la video</label>
            <input className="form-control" type="text" name={`session${session}titre${num}`} required/>
        </div>
        {box &&
        <div className="form-check form-switch col-1 mt-5">
        <input className="form-check-input" type="checkbox" name={`session${session}box${num}`} />
        <label className="form-check-label" htmlFor={`session${session}box${num}`} >Show</label>
        </div>
        }
        
        </div>
    </>
}
