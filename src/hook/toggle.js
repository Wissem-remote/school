import { useCallback, useState } from 'react'



export const useToggle=(initial=false)=>{
    const [state,setState]= useState(initial)

    return[state, useCallback(()=> {setState(state=> !state)},[])]
}