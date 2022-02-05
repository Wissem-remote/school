import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Trans=()=> {
    const parm = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
            navigate("/user/"+parm.id)
    })
    return <>

        <div>
            
        </div>
    </>
}
