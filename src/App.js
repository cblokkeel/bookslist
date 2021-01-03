import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
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

  const error = message => toast.error(message);

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
  
  const retrieve = () => {
    let array = []
    
    return array
  }

  const handleAdd = async () => {
    const book = {
        id: new Date().getTime(),
        title: newTitle,
        author: newAuthor,
        finished: false,
        started: false,
    }
    let dbBooks = []

    db.ref('/users/' + uid).orderByValue().on('value', snapshot => {
      if (snapshot.val().books) {
        dbBooks = Object.values(snapshot.val().books)
      }
    })

    if (newTitle && newAuthor) {
      if(!compare(dbBooks, book)) {
        
        let updates = {}
        updates[`/users/${uid}/books/${book.id}`] = book
        await db.ref().update(updates)

        let test = []

        db.ref('/users/' + uid).orderByValue().on('value', snapshot => {
          test = Object.values(snapshot.val().books)
        })

        setBooks(test)

      } else {
        error('The books already exist')
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
      if (localStorage.theme === 'dark') {
        htmlEl.classList.add('dark')
      }

      if (localStorage.uid) {
        setIsLogged(true)
        setUid(localStorage.uid)
        db.ref('/users/' + localStorage.uid).orderByValue().on('value', snapshot => {
          if(snapshot.val().books) {
            setBooks(Object.values(snapshot.val().books))
          }
        })
      }
      initialMount.current = false
    } else {
      
    }
  })

  return (
    <main className='bg-gray-100 dark:bg-gray-800 min-h-screen font-mono'>
      <Header toggleDark={toggleDark} handleLogOut={handleLogOut} isLogged={isLogged}/>
      {
        isLogged ? (
          <>
            <Toaster />
            <ChooseCategorie setCategorie={setCategorie}/>
            <AddBook setNewAuthor={setNewAuthor} setNewTitle={setNewTitle} handleAdd={handleAdd} newAuthor={newAuthor} newTitle={newTitle}/>
            <BooksList books={books} categorie={categorie} setBooks={setBooks} db={db} uid={uid}/>
          </>
        ) : (
          <>
            <Login auth={auth} setIsLogged={setIsLogged} db={db} setUid={setUid} setBooks={setBooks}/>
          </>
        )
      }
      
    </main>
  )
}

export default App;
