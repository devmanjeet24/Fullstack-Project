import useTokenstore from "@/store";
import axios from "axios";



const api = axios.create({
    baseURL:'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
    }
})


api.interceptors.request.use((config) => {
    const token = useTokenstore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
});

export const login = async (data: {email: string; password: string}) => {
    return api.post('/api/users/login', data)
}       
    
export const register = async (data: {name : string; email: string; password: string}) => {
    return api.post('/api/users/register', data)
}  

export const getBooks = async () => {
    return api.get('/api/books/');
}

export const createBook = async (data : FormData) => {
    return api.post('/api/books/', data, {
        headers : {
            'content-type' : 'multipart/form-data'
        },
    });
}

export const updateBook = async ({bookid, data} : {bookid : string, data:FormData}) => {
    return api.patch(`/api/books/${bookid}`, data, {
        headers : {
            'content-type' : 'multipart/form-data'
        },
    })
}

export const deleteBook = async ({bookid} : {bookid : string} ) => {
   return api.delete(`/api/books/${bookid}`);
}