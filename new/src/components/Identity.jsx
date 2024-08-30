import React, {useEffect} from 'react'
import Logo from './../assets/images/1.png'
import TextLogo from './../assets/images/2.png'

export default function Identity({ height }) {
  useEffect(() => {
    if (height) {
      import('./../assets/css/components/identity2.css'); // Dynamically import style2.css if height is provided
    } else {
      import('./../assets/css/components/identity1.css'); // Default to style1.css if height is not provided
    }
  }, [height])

  return (
    <div className="main-imgs" style={{height}}>
        <img src={Logo} alt="" className='logo'/>
        <img src={TextLogo} alt="" className='text-logo'/>
    </div>
  )
}
