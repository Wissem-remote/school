import  {   useEffect,useState } from 'react'
import { useQuery } from 'react-query'
import { getConnectForm } from "../Query";


export const useForm=()=>{
    const { data } = useQuery('Form',getConnectForm)
    const datAdmin = data
    const [state,setState]= useState()
    useEffect(()=>{
        setState(datAdmin)
    },[setState,datAdmin])
   
 
     return [state, setState]
}
