import React from 'react'

export const Field = ({ name, children, type = "text",  span, spans, pass,  place, ...props })=> {
    return (
        <div className="form-group">
            {children && <label className="mt-3 mb-1" htmlFor={name}  >{children}</label>}
            <input  className="form-control" placeholder={place} type={type} name={name} id={name} {...props}/>
            {span && <div  className={pass?"form-text text-success":"form-text"}>{span}</div>}
            {spans && <div  className="form-text text-danger">{spans}</div>}
           
        </div>
    )
}
