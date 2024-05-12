import { useState } from 'react';
import icon from '../todo2.jfif';
import  Web3Modal  from 'web3modal';
import { ethers } from 'ethers';

function Header() {

    const [connectStatus, setConnectStatus] = useState(false);

    async function walletHandler() {
        const web3 = new Web3Modal();
        const connection = await web3.connect();
        const provider = new ethers.BrowserProvider(connection);
        setConnectStatus(true);
    }

    return(
        <>
            <header>
                <div className="brand">
                    <img className="brand-logo" alt="" srcset="" src={icon}/>
                    <h3 className="brand-text">TODO</h3>
                </div>
                <button className="connect-btn" style={connectStatus ? {backgroundColor:"green", color: "white"}: {backgroundColor:"red", color:"black"}} onClick={walletHandler}>{ connectStatus? "Connected": "Connect"}</button>
            </header>
        </>
    );
}

export default Header;