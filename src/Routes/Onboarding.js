import {useRef, useState} from 'react'
import auth from '../Status/auth'
import {useNavigate} from "react-router-dom"
import {signup, auth as A, useAuth, login} from '../firebase'
import { getFirestore, setDoc, doc, addDoc,collection,} from 'firebase/firestore'
export default function Login(props) {
    const currentUser = useAuth()
    const [loading, setLoading] = useState(false)
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const db = getFirestore()
    const handlesignup = async () =>{
        setLoading(true)
        try{
            await signup(emailRef.current.value, passwordRef.current.value)
            .then(()=>auth.login(()=>{
                navigate('/wallet')
            }))
            console.log(A.currentUser.uid)
            await setDoc(doc(db, "users", A.currentUser.uid, "coins", "first"),{
                hello: "hello"
            })
            
        }catch(e){
            alert(e)
        }
        setLoading(false)

    }
    const handlelogin = async () =>{
        setLoading(true)
        try{
            await login(emailRef.current.value, passwordRef.current.value)
            .then(()=>auth.login(()=>{
                navigate('/wallet')
            }))
        }catch(e){
            alert(e)
        }
    }
    
    return (
        <div>
            <h1>Welcom to CryptoSaSa</h1>
            <div>
                <input ref={emailRef} placeholder='Email' />
                <input ref={passwordRef} type="password" placeholder='Password' />

            </div>
            <button  disabled={loading  } onClick={handlesignup}>Sign up</button>
            <button disabled={loading} onClick={handlelogin}>Log in</button>
        </div>
    )
}
