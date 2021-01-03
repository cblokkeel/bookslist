import React, { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Login = ({ auth, setIsLogged, db, setUid, setBooks }) => {
    const [haveAccount, setHaveAccount] = useState(true)

    const password = useRef()
    const email = useRef()

    const error = message => toast.error(message)

    const handleRegister = async e => {
        e.preventDefault()
        try {
          const { user } = await auth.createUserWithEmailAndPassword(email.current.value, password.current.value)
          db.ref('/users/' + user.uid).set({
              uid: user.uid,
          })
          setUid(user.uid)
          db.ref('/users/' + user.uid).orderByValue().on('value', snapshot => {
            if(snapshot.val().books) {
              setBooks(Object.values(snapshot.val().books))
            } else {
                setBooks([])
            }
          })
          setIsLogged(true)
        } catch (err) {
          error(err.message)
        }
    }

    const handleLogin = async e => {
        e.preventDefault()
        try {
            const { user } = await auth.signInWithEmailAndPassword(email.current.value, password.current.value)
            setUid(user.uid)
            db.ref('/users/' + user.uid).orderByValue().on('value', snapshot => {
                if(snapshot.val().books) {
                  setBooks(Object.values(snapshot.val().books))
                } else {
                  setBooks([])
                }
              })
            setIsLogged(true)
          } catch (err) {
            error(err.message)
          }
    }

    const resetForm = () => {
      password.current.value = ''
      email.current.value = ''
    }

    const handleChangeRegisterLogin = (dest) => {
      resetForm()
      dest === 'register' ? setHaveAccount(false) : setHaveAccount(true)
    }
 
    return (
        <section className='flex items-center flex-col justify-center mt-16'>
                <Toaster />
                {
                    haveAccount ? (
                        <>
                            <form className='flex flex-col w-4/5' onSubmit={handleLogin}>
                                <input ref={email} type="email" placeholder='Email' className='rounded-md shadow-md py-1 px-3 mb-2 outline-none dark:bg-gray-600 text-gray-600 dark:text-white' required/>
                                <input ref={password} type="password" placeholder='Password' className='rounded-md shadow-md py-1 px-3 mb-2 outline-none dark:bg-gray-600 text-gray-600 dark:text-white' required/>
                                <button type='submit' className='dark:bg-green-400 bg-red-400 text-white py-2 mt-1 rounded-md font-bold shadow-md cursor-pointer transition-all ease-out duration-300 hover:shadow-xl outline-none'>Log In</button>
                                <p className='text-xs mt-3 dark:text-gray-500 text-gray-400 text-center'>Don't have any account ? <a href="#" className='dark:text-green-400 text-red-400' onClick={() => handleChangeRegisterLogin('register')}>Sign Up</a></p>
                            </form>
                        </>
                    ) : (
                        <>
                            <form className='flex flex-col w-4/5' onSubmit={handleRegister}>
                                <input ref={email} type="email" placeholder='Email' className='rounded-md shadow-md py-1 px-3 mb-2 outline-none dark:bg-gray-600 text-gray-600 dark:text-white' required/>
                                <input ref={password} type="password" placeholder='Password' className='rounded-md shadow-md py-1 px-3 mb-2 outline-none dark:bg-gray-600 text-gray-600 dark:text-white' required/>
                                <button type='submit' className='dark:bg-green-400 bg-red-400 text-white py-2 mt-1 rounded-md font-bold shadow-md cursor-pointer transition-all ease-out duration-300 hover:shadow-xl outline-none'>Sign Up</button>
                                <p className='text-xs mt-3 dark:text-gray-500 text-gray-400 text-center'>Already an account ? <a href="#" className='dark:text-green-400 text-red-400' onClick={() => handleChangeRegisterLogin('login')}>Log In</a></p>
                            </form>
                        </>
                    )
                }
        </section>
    );
};

export default Login;