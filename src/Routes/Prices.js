import React from 'react'
import {Link} from "react-router-dom"
export default function Prices({Bit, Eth, Stel, Rip}) {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/wallet">Wallet</Link>
                </li>
            </ul>
            <p>Bitcoin: {Bit}</p>
            <p>Ethereum: {Eth}</p>
            <p>Stellar: {Stel}</p>
            <p>Ripple: {Rip}</p>
        </div>
    )
}
