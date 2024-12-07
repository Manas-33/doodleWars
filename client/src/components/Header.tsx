import { Globe, Twitch } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center w-full">
        <div className='flex gap-5 items-center'>
        {/* <div className="flex items-center space-x-2 bg-opacity-20 bg-black rounded-full px-4 py-2 h-7">
          <Globe className="w-5 h-5" />
          <span>EN</span>
        </div> */}

        <img
          src="/logo.png"
          alt="LOGO Logo"
          width={300}
          height={100}
          className="mx-auto"
        />
        </div>

        <div className="flex items-center gap-2">
          <Twitch className="w-5 h-5" />
          <span className="font-medium">CONNECT WALLET</span>
        </div>
      </header>
  )
}

export default Header