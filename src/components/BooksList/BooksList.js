import React from 'react'
import Book from './Book'

const BooksList = ({ books, setBooks, categorie, db, uid }) => {
    const setNewBooks = () => {
        const currentBooks = [...books]
        setBooks(currentBooks)
    }

    const updateDb = async book => {
        let updates = {}
        updates[`/users/${uid}/books/${book.id}`] = book
        await db.ref().update(updates)
    }
    
    const started = async book => {
        book.started = true
        updateDb(book)
        setNewBooks()
    }
    
    const finished = book => {
        book.finished = true
        updateDb(book)
        setNewBooks()
    }
    
    const restart = book => {
        book.finished = false
        book.started = false
        updateDb(book)
        setNewBooks()
    }
    
    const deleteBook = book => {
        const bookTitle = book.title
        const bookAuthor = book.author
        let currentBooks = [...books]
        currentBooks.forEach((currentBook, idx) => {
            if (currentBook.title === bookTitle && currentBook.author === bookAuthor) {
                currentBooks.splice(idx, 1)
            }
        })
        db.ref(`/users/${uid}/books/${book.id}`).remove()
        setBooks(currentBooks)
    }

    return (
        <section className='py-8 dark:text-white text-gray-700 flex flex-col items-center'>
            {
                books.map(book => {
                    if (book.started && !book.finished && (categorie === 'All' || categorie === 'In progress')) {
                        return <Book book={book} deleteBook={deleteBook} func={finished} text='Finished ?'/>           
                    } else if (book.finished && (categorie === 'All' || categorie === 'Already read')) {
                        return <Book book={book} deleteBook={deleteBook} func={restart} text='Finished'/>
                    } else if (!book.started && (categorie === 'All' || categorie === 'To read')) {
                        return <Book book={book} deleteBook={deleteBook} func={started} text='Started ?'/>
                    }
                })
            }
        </section>
    );
};

export default BooksList;