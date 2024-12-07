import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';
import '@coinbase/onchainkit/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <OnchainKitProvider apiKey={"L98XPSGT5TdZ8ddJZhEphQMBkDsSvFAz"} chain={base}>
    <GoogleOAuthProvider clientId={"913620313468-sl42mg4tcbpqu47nnag5l885so208kj4.apps.googleusercontent.com"}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
    </OnchainKitProvider>
  </StrictMode>,
)
