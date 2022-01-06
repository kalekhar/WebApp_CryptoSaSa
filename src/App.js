import './App.css';
import React from "react";
import axios from 'axios';
import Wallet from './Routes/Wallet';
import Prices from './Routes/Prices';
import Login from './Routes/Onboarding';
import Logout from './Routes/Signout';
import ProtectedRoute from './Protected'
//import ProtectedRoute from './Status/ProtectedRoute';
import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

const App = () => {
    let url = 'https://api.cryptonator.com/api/ticker/btc-usd'
    let urlEth = "https://api.cryptonator.com/api/ticker/eth-usd"
    let urlStellar = "https://api.cryptonator.com/api/full/xlm-usd"
    let urlRipple = "https://api.cryptonator.com/api/full/xrp-usd"

    const [priceBit, setPriceBit] = useState(0);
    const [priceEth, setPriceEth] = useState(0);
    const [priceStel, setPriceStel] = useState(0);
    const [priceRip, setPriceRip] = useState(0);

    useEffect(() => {
        axios.get(url)
        .then(response => {
          setPriceBit(response.data.ticker.price)
        })
        axios.get(urlEth)
        .then(response => {
          setPriceEth(response.data.ticker.price)
        })
        axios.get(urlStellar)
        .then(response => {
          setPriceStel(response.data.ticker.price)
        })
        axios.get(urlRipple)
        .then(response => {
          setPriceRip(response.data.ticker.price)
        })
    }, [])
    


    return (
        <Router>
          <div className='App'>
        
          <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route element={<ProtectedRoute/>}>
            
             <Route exact path='/wallet' element={<Wallet/>}/>
             <Route exact path='/prices' element={<Prices Bit={priceBit} Eth={priceEth} Stel={priceStel} Rip={priceRip}/>}/>
             <Route path='/logout' element={<Logout/>}/>

            </Route>
          </Routes>
          </div>
          
        </Router>
    )
}

export default App

