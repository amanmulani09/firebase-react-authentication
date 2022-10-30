import React from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext(null)

export const userAuth = ()=>{
    return React.useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser,setCurrentUser] = React.useState()

    const signup = (email,password)=>{
            return auth.createUserWithEmailAndPassword(email,password)
    }

    React.useEffect(()=>{
       const unsunscribe =  auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
        })

        return unsunscribe
    },[])

 
    const value= {
        currentUser,
        signup
    }

  return (
   <AuthContext.Provider value={value}>
        {children}
   </AuthContext.Provider>
  )
}
