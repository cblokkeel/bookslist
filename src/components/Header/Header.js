import React, { createRef, useEffect } from 'react'

const Header = ({ toggleDark, handleLogOut, isLogged }) => {

    const sun = createRef()
    const moon = createRef()

    const hide = (toHide, toShow) => {
        toHide.current.classList.add('hidden')
        toShow.current.classList.remove('hidden')
        localStorage.theme = toHide === moon ? 'dark' : 'light'
    }

    const darkMode = e => {
        moon.current.classList.contains('hidden') ? hide(sun, moon) : hide(moon, sun)
        toggleDark()
    }

    useEffect(() => {
        if (localStorage.theme === 'dark') {
            hide(moon, sun)
        }
    })

    return (
        <header className='h-32 flex items-center justify-between p-12 dark:text-white'>
            <h1 className='text-2xl md:text-5xl'>Books List</h1>
            <div className='flex'>
                {
                    isLogged ? (
                        <button className='mt-1 mr-2 md:mr-8 text-sm md:text-xl' onClick={handleLogOut}>Log Out</button>
                    ) : (
                        <>
                        </>
                    )
                }
                <svg ref={moon} onClick={darkMode} className='w-6 md:w-12 moon cursor-pointer' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg ref={sun} onClick={darkMode} className='hidden w-6 md:w-12 sun cursor-pointer' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
        </header>
    );
};

export default Header;