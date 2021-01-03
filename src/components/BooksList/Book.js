import React from 'react'

const Book = ({ book, deleteBook, func, text }) => {
    return (
        <div className='dark:bg-gray-600 bg-gray-200 shadow-md min-h-24 w-4/5 mb-6 rounded-lg flex justify-between items-center p-4' key={book.title}>
            <div className='flex flex-col flex-wrap justify-center'>
                <h3 className='text-sm mb-1'>{book.title}</h3>
                <h4 className='text-xs dark:text-gray-400 text-gray-500 italic'>{book.author}</h4>
            </div>
            <div className='flex flex-col justify-center'>
                <h1 className='mb-1 self-end pr-2 text-black dark:text-red-400 cursor-pointer' onClick={() => deleteBook(book)}>X</h1>
                <h3 className='self-end justify-center bg-red-400 text-white dark:bg-green-400 py-1 px-2 w-24 text-center rounded-md shadow-md cursor-pointer text-xs md:w-auto md:px-4 md:text-base' onClick={() => func(book)}>{text}</h3>
            </div>
        </div> 
    );
};

export default Book;