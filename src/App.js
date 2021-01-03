import { useEffect, useRef, useState } from 'react'
import AddBook from './components/AddBook/AddBook'
import BooksList from './components/BooksList/BooksList'
import ChooseCategorie from './components/ChooseCategorie/ChooseCategorie'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import fire from './fire'

const App = () => {
  const [categorie, setCategorie] = useState('All')
  const [books, setBooks] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const [uid, setUid] = useState('')

  const db = fire.database()
  const auth = fire.auth()

  const htmlEl = document.querySelector('html')
  const initialMount = useRef(true)

  const toggleDark = () => {
    htmlEl.classList.contains('dark') ? htmlEl.classList.remove('dark') : htmlEl.classList.add('dark')
  }

  const compare = (arr, obj) => {
    let isTheSame = false
    arr.forEach(el => isTheSame = el.title === obj.title ? true : isTheSame)
    return isTheSame
  } 
  
  const handleAdd = () => {
    const book = {
        title: newTitle,
        author: newAuthor,
        finished: false,
        started: false
    }

    if (newTitle && newAuthor) {
      if(!compare(books, book)) {
        setBooks([...books, book])
      } else {
        // TODO: add toast instead of alert
        alert('The books already exist')
      }
      setNewAuthor('')
      setNewTitle('')
    }
  }

  auth.onAuthStateChanged(function(user) {
    if (user) {
      setUid(user.uid)
      localStorage.uid = user.uid
    }
  })

  const handleLogOut = () => {
    setIsLogged(false)
    setUid('')
    localStorage.uid = ''
    auth.signOut()
  }

  useEffect(() => {
    if (initialMount.current) {
      if(localStorage.books) {
        setBooks(JSON.parse(localStorage.books))
      }
      if (localStorage.theme === 'dark') {
        htmlEl.classList.add('dark')
      }
      if (localStorage.uid) {
        setIsLogged(true)
        setUid(localStorage.uid)
      }
      initialMount.current = false
    } else {
      localStorage.books = JSON.stringify(books)
    }
  })

  return (
    <main className='bg-gray-100 dark:bg-gray-800 min-h-screen font-mono'>
      <Header toggleDark={toggleDark} />
      {
        isLogged ? (
          <>
            <ChooseCategorie setCategorie={setCategorie}/>
            <AddBook setNewAuthor={setNewAuthor} setNewTitle={setNewTitle} handleAdd={handleAdd} newAuthor={newAuthor} newTitle={newTitle}/>
            <BooksList books={books} categorie={categorie} setBooks={setBooks}/>
            <button className='p-2 bg-red-400 text-white' onClick={handleLogOut}>Log Out</button>
          </>
        ) : (
          <>
            <Login auth={auth} setIsLogged={setIsLogged} db={db}/>
          </>
        )
      }
      
    </main>
  )
}

export default App;
