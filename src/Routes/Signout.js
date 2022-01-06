import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../Status/auth'
import { signOut, getAuth } from 'firebase/auth'
export default function Logout() {
    const navigate = useNavigate()
    return (
        <div>
            <h1>sign out</h1>
            <Link to="/wallet">Wallet</Link>
            <br />
            <button onClick={()=>{
                auth.logout(()=>{
                    navigate('/')
                })
                signOut(getAuth())
            }}>sign out</button>
        </div>
    )
}
