import { Twitch } from 'lucide-react'
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from 'react';
import axios from 'axios';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity
} from '@coinbase/onchainkit/identity';

import { color } from '@coinbase/onchainkit/theme';
import { Button } from './ui/button';


const Header = () => {
  const { authenticate } = useOkto();
  const [authToken, setAuthToken] = useState(null);
  const [UserName, setUserName] = useState("");
  const [ConnectBase, setConnectBase] = useState(false);
  const [BaseAddress, setBaseAddress] = useState<string>("");

  const handleGoogleLogin = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    authenticate(idToken, async (authResponse: any, error: any) => {
      if (authResponse) {
        setAuthToken(authResponse.auth_token);
        console.log("Authenticated successfully, auth token:", authResponse.auth_token);

        const options = {
          method: 'GET',
          url: 'https://sandbox-api.okto.tech/api/v1/user_from_token',
          headers: { Authorization: `Bearer ${authResponse.auth_token}` }
        };

        await axios.request(options).then((res) => {
          setUserName(res.data.data.email);
        }).catch((err) => {
          console.log(`The Error is oocured : ${err}`)
        })

      } else if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  const ConnectMetamask = async () => {
    try {

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setConnectBase(true)
      setBaseAddress(account)
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }

  }

  const disconnectBase = async () => {
    setConnectBase(false)
    setBaseAddress("")

  }


  return (
    <header className="p-4 flex justify-between items-center w-full">
      <div className='flex gap-5 items-center'>

        <img
          src="/logo.png"
          alt="LOGO Logo"
          width={300}
          height={100}
          className="mx-auto"
        />
      </div>

<<<<<<< Updated upstream
        <div className="flex items-center gap-2">
          <Twitch className="w-5 h-5" />
          <span className="font-medium  text-white">CONNECT WALLET</span>
        </div>
      </header>
=======

      {!authToken ? (
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={(error) => console.error("Login Failed", error)}
        />
      ) : <>
        <p style={{ color: "white", fontWeight: "bolder", marginLeft: 'auto', marginRight: '20px' }}>{UserName}</p>
        {/* <Wallet >
          <ConnectWallet>
            <Avatar className="h-6 w-6" />
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
            </Identity>
            <WalletDropdownBasename />
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet> */}

        {!ConnectBase ? <Button onClick={ConnectMetamask}>Connect Wallet</Button> :

          <>
            <Address address={"0xCd60F24071Dc0d145E366aF0128E0c2a4689cd46"} />
            <Button style={{marginLeft:'20px'}} onClick={disconnectBase}>Disconnect</Button>
          </>

        }
      </>
      }
    </header>
>>>>>>> Stashed changes
  )
}

export default Header