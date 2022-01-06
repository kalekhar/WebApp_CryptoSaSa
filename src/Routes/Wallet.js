import React, {useEffect, useState, useRef } from "react";
import {Link} from "react-router-dom"
import {auth} from "../firebase"
import {getFirestore,setDoc, onSnapshot, collection,doc, addDoc, query, CollectionReference, QuerySnapshot, getDocs} from 'firebase/firestore'
const Wallet = (props) => {
    
    const [records, setRecords] = useState([{id:1, coinName:"Ripple"}]);
    const [loading, setLoading] = useState(false);
    const db = getFirestore()
    const coinName = useRef("")
    const quantity = useRef("")
    const price = useRef("")
    const addCoin = async () => {
        setLoading(true)
        
        try{
             await addDoc(collection(db, "users", auth.currentUser.uid, "coins"),{
                 coinName: coinName.current.value,
                 quantity: quantity.current.value,
                 price: price.current.value,
                 key: Math.random()
             })
             
        }catch(e){
            alert(e)
        }
        coinName.current.value = ""
        quantity.current.value = ""
        price.current.value = ""
        setLoading(false)
    };
    useEffect(()=>{
        
        const q = query(collection(db, "users", auth.currentUser.uid, "coins"))
        const fun = async () =>{

            const querySnapshot = await getDocs(q)
            
            const list = []
            querySnapshot.forEach((doc)=>{
                list.push(doc.data())
            })
            setRecords(list)


        }
        fun()
        
        
    },[loading])
    
    
    
    return (
        <div>
           <h1>Hello {auth.currentUser?.email}</h1>
           <div className="navigation">
               <nav>
                   <ul>
                       <li>
                           <Link to="/logout">logout</Link>
                       </li>
                       <li>
                           <Link to="/prices">prices</Link>
                       </li>
                   </ul>
               </nav>
           </div>
           <div>
               <input ref={coinName} type="text" placeholder="Coin name" />
               <input ref={quantity} type="number" placeholder="Quantity"/>
               <input ref={price} type="number" placeholder="Price"/>
               <button onClick={addCoin}>Add</button>
           </div>
           {records.map((data)=>{
               return(
                   <div>
                   <p>Coin: {data.coinName}</p>
                   <p>Price: {data.price}</p>
                   <p>Quantity: {data.quantity}</p>
                   </div>
               )
            }
           )}
           
        </div>
    )
}
export default Wallet;