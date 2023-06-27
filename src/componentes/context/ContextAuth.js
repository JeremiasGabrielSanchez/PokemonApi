import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from '../tools/firebase'
import { deleteDoc, doc } from "firebase/firestore";

const authContext = createContext();

export const useAuth = () =>{
  const context = useContext(authContext)
  return context
}

function AuthProvider({children}) {

  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth) //cerrar sesion 

  const eliminar = async(id) => {await deleteDoc(doc(db, 'orders', id ))}

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, currenUser=>{
      //console.log(currenUser) //Informacion del usuario
      setUser(currenUser)
      setLoading(false)
    })
    return ()=> unsubscribe()
  }, [])
  

  return (
    <authContext.Provider value={{signup, login, user, logout, loading, eliminar}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider