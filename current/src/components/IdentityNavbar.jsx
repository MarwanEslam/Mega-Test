import React from 'react'
import Logo from './../assets/images/1.png';
import TextLogo from './../assets/images/2.png';
import'./../assets/css/components/identityNavbar.css';

export default function IdentityNavbar({ height }) {
  return (
    <div className="logo-nav" style={{height}}>
        <img src={Logo} alt="" className='logo'/>
        <img src={TextLogo} alt="" className='text-logo'/>
    </div>
  )
}