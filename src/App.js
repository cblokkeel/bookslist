import { useEffect, useRef, useState } from 'react'
import AddBook from './components/AddBook/AddBook'
import BooksList from './components/BooksList/BooksList'
import ChooseCategorie from './components/ChooseCategorie/ChooseCategorie'
import Header from './components/Header/Header'

const App = () => {
  const [categorie, setCategorie] = useState('All')
  const [books, setBooks] = useState([])
  const [newTitle, setNewTitle] = useState([])
  const [newAuthor, setNewAuthor] = useState([])

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
        alert('The books already exist')
      }
    }
    setNewAuthor('')
    setNewTitle('')
  }

  useEffect(() => {
    if (initialMount.current) {
      if(localStorage.books) {
        setBooks(JSON.parse(localStorage.books))
      }
      if (localStorage.theme === 'dark') {
        htmlEl.classList.add('dark')
      }
      initialMount.current = false
    } else {
      localStorage.books = JSON.stringify(books)
    }
  })

  return (
    <main className='bg-gray-100 dark:bg-gray-800 min-h-screen font-mono '>
      <Header toggleDark={toggleDark} />
      <ChooseCategorie setCategorie={setCategorie}/>
      <AddBook setNewAuthor={setNewAuthor} setNewTitle={setNewTitle} handleAdd={handleAdd} newAuthor={newAuthor} newTitle={newTitle}/>
      <BooksList books={books} categorie={categorie} setBooks={setBooks}/>
    </main>
  )
}

export default App;
