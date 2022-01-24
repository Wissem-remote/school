import React, from "react";
import { useQuery } from 'react-query'
import { getConnectUser } from "../Query";
//import encoder from 'int-encoder'



// use Query
export const UserProvider= ({children})=>{
    
    const { data } = useQuery('repoData',getConnectUser)
    const datAdmin = data?.data
    // const index = localStorage.getItem('SGVsbG8=')? localStorage.getItem('SGVsbG8='):false
    // const user =datAdmin[encoder.decode(index)]

    return<>
   </>
}






