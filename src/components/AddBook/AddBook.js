import React from 'react'

const AddBook = ({ setNewAuthor, setNewTitle, handleAdd, newTitle, newAuthor }) => {
    return (
        <section className='text-center text-white mt-4'>
            <div className='mb-4'>
                <form className='flex flex-col gap-2 mx-12'>
                    <input onChange={e => setNewTitle(e.target.value)} value={newTitle} className='rounded-md shadow-md py-1 px-3 outline-none dark:bg-gray-600 text-gray-600 dark:text-white' type="text" placeholder="Book's title" required/>
                    <input onKeyDown={({ key }) => key === 'Enter' ? handleAdd() : null} onChange={e => setNewAuthor(e.target.value)} value={newAuthor} className='rounded-md shadow-md py-1 px-3 outline-none dark:bg-gray-600 text-gray-600 dark:text-white' type="text" placeholder="Author's name" required/>
                </form>
            </div>
            <div onClick={handleAdd} className='dark:bg-green-400 bg-red-400 mx-12 py-2 rounded-md font-bold shadow-md cursor-pointer transition-all ease-out duration-300 hover:shadow-xl outline-none'>Add Book</div>
        </section>
    );
};

export default AddBook;