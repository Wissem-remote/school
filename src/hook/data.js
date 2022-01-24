import  { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getConnectUser } from "../Query";
import encoder from 'int-encoder'


export const useData=()=>{
    const { data } = useQuery('repoData',getConnectUser)
    const datAdmin = data
    const [state,setState]= useState()
    const index = localStorage.getItem('SGVsbG8=')? localStorage.getItem('SGVsbG8='):false

    useEffect(()=>{
        index?setState(datAdmin):setState(false)
    },[setState,datAdmin,index])
    
     return [state, setState]
}

export const useIndex=()=>{
    const [state,setIndex]= useState()

    const index = localStorage.getItem('SGVsbG8=')? localStorage.getItem('SGVsbG8='):false
    
    useEffect(()=>{
        index?setIndex(encoder.decode(index)):setIndex(false)
    },[index,setIndex])
    return [state, setIndex]
}