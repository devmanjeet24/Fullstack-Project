export interface Book  {
    _id: string;
    title: string;
    coverImage: string;
    file: string;
    description: string;
    author: Author;
}


export interface Author  {
  name : string;
}




