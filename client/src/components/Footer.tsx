import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex space-x-6">
            {["TERMS OF SERVICE", "PRIVACY", "ASSETS", "BLOG", "CONTACT"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-white hover:text-purple-500 transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
          <img src="/logo.png" alt="Logo" width={100} height={60} />
        </div>
      </footer>
  )
}

export default Footer