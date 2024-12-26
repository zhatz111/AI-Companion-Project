import React from 'react'
import { Spin as Hamburger } from 'hamburger-react'

const HamburgerMenu = ({ isOpen, setOpen }) => {
  return (
    <div>
        <Hamburger size={23} color="#FF6FCF" toggled={isOpen} toggle={setOpen} />
    </div>
  )
}

export default HamburgerMenu