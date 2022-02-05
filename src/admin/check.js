import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getConnectAdmin } from '../Query'

export const Effaceur=()=> {
    const { data } = useQuery('Data',getConnectAdmin)
    const datAdmin = data?.data
    
    const navigate = useNavigate()
    useEffect(()=>{
        navigate("/admin/connect", { state:{id: datAdmin[0]._id} })
    })
    return <>

        <div>
            
        </div>
    </>
}
