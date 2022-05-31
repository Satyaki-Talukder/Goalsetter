import React, { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/auth'

const Header = () => {


  const auth = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
      auth.logout();
      console.log('Logged out...');
      navigate('userauth', {replace: true});
      auth.toastRef.current.show('info', 'Logged out...');
  };


  return (
    <nav className="relative container mx-auto p-6">
        {/* Flex Container */}
        <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to='/' className="p-2 text-3xl">Goalsetter</Link>

            {/* Menu Items */}
            {/* hidden class is added for hiding */}
            <div className="space-x-3 md:flex">
                {/* <a href="#" className='hover:text-brightRed'>Login</a> */}
                {!auth.user && <Link to='/userauth' className="p-2 px-6 text-brightRed border border-brightRed rounded-full baseline hover:text-veryPaleRed hover:bg-brightRed">Login</Link>}
                {auth.user && <button className="p-2 px-6 text-brightRed border border-brightRed rounded-full baseline hover:text-veryPaleRed hover:bg-brightRed" onClick={handleLogout}>Logout</button>}
            </div>
        </div>
    </nav>
  )
}

export default memo(Header)