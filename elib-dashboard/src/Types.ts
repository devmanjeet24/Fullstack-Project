export default interface Author{
    _id: string;
    name: string
}

export interface Book{
    _id: string;
    title: string;
    description: string;
    author: Author;
    genre: string;
    coverImage: string;
    file: string;
    createdAt: string;
}