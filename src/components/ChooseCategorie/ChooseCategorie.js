import React, { useRef } from 'react'

const ChooseCategorie = ({ setCategorie }) => {
    let active = useRef()

    const changeCategorie = e => {
        if (active.current !== e.target) {
            setCategorie(e.target.innerText)
            e.target.classList.add('dark:text-green-400')
            e.target.classList.add('text-red-400')
            active.current.classList.remove('dark:text-green-400')
            active.current.classList.remove('text-red-400')
            active.current = e.target
        }
    }

    return (
        <section className='text-center dark:text-white'>
            <div className="text-xs md:text-base categories flex md:mt-4 items-center justify-center">
                <h3 onClick={changeCategorie} ref={active} className='dark:text-green-400 text-red-400 transition-all duration-200 cursor-pointer'>All</h3>
                <h3 onClick={changeCategorie} className='transition-all duration-200 mx-4 md:mx-12 cursor-pointer'>To read</h3>
                <h3 onClick={changeCategorie} className='transition-all duration-200 mr-4 md:mr-12 cursor-pointer'>In progress</h3>
                <h3 onClick={changeCategorie} className='transition-all duration-200 cursor-pointer'>Already read</h3>
            </div>
        </section>
    )
}

export default ChooseCategorie;