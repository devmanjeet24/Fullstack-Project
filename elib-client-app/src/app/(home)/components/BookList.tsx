import { Book } from '@/types';
import React from 'react'
import Bookcards from './Bookcards';

const BookList = async () => {

     const response = await fetch(`${process.env.BACKEND_URL}/books`, {cache : 'no-store'});
   if (!response.ok) {
      throw new Error('An error occured whils fetchind the data');
   }

   const books = await response.json();
   console.log('books', books);

  return (

    <div className='grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto mb-10'>
      {
        books.map((book : Book, index : any) => {
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