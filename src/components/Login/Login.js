import React, { useRef, useState } from 'react'

const Login = ({ auth, setIsLogged }) => {
    // TODO: remettre en useState(true)
    const [haveAccount, setHaveAccount] = useState(false)

    const password = useRef()
    const email = useRef()

    const handleRegister = async e => {
        e.preventDefault()
        try {
          await auth.createUserWithEmailAndPassword(email.current.value, password.current.value)
          setIsLogged(true)
        } catch (err) {
          // TODO: Add toast instead of alert
          alert(err.message)
        }
    }

    const handleLogin = async e => {
        e.preventDefault()
        try {
            await auth.signInWithEmailAndPassword(email.current.value, password.current.value)
            setIsLogged(true)
          } catch (err) {
            // TODO: Add toast instead of alert
            alert(err.message)
          }
    }
 
    return (
        <section className='flex items-center flex-col justify-center mt-16'>
                {
                    haveAccount ? (
                        <>
                            <form className='flex flex-col w-4/5' onSubmit={handleLogin}>
                                <input ref={email} type="email" placeholder='Email' className='rounded-md shadow-md py-1 px-3 mb-2 outline-none dark:bg-gray-600 text-gray-600 dark:text-white' required/>
                                <input ref={password} type="password" placeholder='Password' className='rounded-md shadow-md py-1 px-3 mb-2 outline-none dark:bg-gray-600 text-gray-600 dark:text-white' required/>
                                <button type='submit' className='dark:bg-green-400 bg-red-400 text-white py-2 mt-1 rounded-md font-bold shadow-md cursor-pointer transition-all ease-out duration-300 hover:shadow-xl outline-none'>Log In</button>
                                <p className='text-xs mt-3 dark:text-gray-500 text-gray-400 text-center'>Don't have any account ? <a href="#" className='dark:text-green-400 text-red-400' onClick={() => setHaveAccount(false)}>Sign Up</a></p>
                            </form>
                        </>
                    ) : (
                        <>
                            <form className='flex flex-col w-4/5' onSubmit={handleRegister}>
                                <input ref={email} type="email" placeholder='Email' className='rounded-md shadow-md py-1 px-3 mb-2 outline-none dark:bg-gray-600 text-gray-600 dark:text-white' required/>
                                <input ref={password} type="password" placeholder='Password' className='rounded-md shadow-md py-1 px-3 mb-2 outline-none dark:bg-gray-600 text-gray-600 dark:text-white' required/>
                                <button type='submit' className='dark:bg-green-400 bg-red-400 text-white py-2 mt-1 rounded-md font-bold shadow-md cursor-pointer transition-all ease-out duration-300 hover:shadow-xl outline-none'>Sign Up</button>
                                <p className='text-xs mt-3 dark:text-gray-500 text-gray-400 text-center'>Already an account ? <a href="#" className='dark:text-green-400 text-red-400' onClick={() => setHaveAccount(true)}>Log In</a></p>
                            </form>
                        </>
                    )
                }
        </section>
    );
};

export default Login;