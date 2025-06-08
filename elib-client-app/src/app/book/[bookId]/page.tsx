import { Book } from '@/types';
import Image from 'next/image';
import React from 'react'

const SingleBookPage = async ({ params }: { params: { bookId: string } }) => {

    console.log('params', params)

    let book: Book | null = null;

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/books/${params.bookId}`);
        if (!response.ok) {
            throw new Error("An error occurred");
        }
        book = await response.json();
    } catch (err: any) {
        console.error(err);
        return (
            <div className="p-10 text-red-600">
                <h2>Error loading book.</h2>
            </div>
        );
    }


    if (!book) {
        throw new Error("Book not found");
    }



    return (
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10">
            <div className="col-span-2 pr-16 text-primary-950">
                <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.title}</h2>
                <span className="font-semibold">by {book.author.name}</span>
                <p className="mt-5 text-lg leading-8">{book.description}</p>
                {/* <DownloadButton fileLink={book.file} /> */}
            </div>
            <div className="flex justify-end">
                <Image
                    src={book.coverImage}
                    alt={book.title}
                    className="rounded-md border"
                    height={0}
                    width={0}
                    sizes="100vw"
                    style={{ width: 'auto', height: 'auto' }}
                />
            </div>
        </div>
    )
}

export default SingleBookPage;