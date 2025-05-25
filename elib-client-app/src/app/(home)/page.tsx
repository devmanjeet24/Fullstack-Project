import Banner from "@/app/(home)/components/Banner";
import BookList from "./components/BookList";


export default async function Home() {

   const response = await fetch(`${process.env.BACKEND_URL}/books`);
   if (!response.ok) {
      throw new Error('An error occured whils fetchind the data');
   }

   const books = await response.json();
   console.log('books', books);


  return (
     <>
        <Banner />

        <BookList books={books}/>

     </>
  );
}


// 01:26