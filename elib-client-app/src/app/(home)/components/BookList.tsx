import { Book } from '@/types';
import React from 'react'
import Bookcards from './Bookcards';

const BookList = ({books} : {books : Book[]}) => {
  return (

    <div className='grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto mb-10'>
      {
        books.map((book, index) => {
          return(
            // <h1 key={index}>{book.title}</h1>
            <Bookcards key={index} books={book}/>
          )
        })
      }
    </div>
    
  )
}

export default BookList;