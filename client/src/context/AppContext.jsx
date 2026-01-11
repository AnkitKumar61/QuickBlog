import {createContext, useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

// for api call we are using axios package
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({children}) =>{

    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]); // it will store the blog data
    const [input, setInput] = useState(""); // to filter the blog

    // creating function to get the data from the database:

    const fetchBlogs = async () =>{
        try {
            const {data} = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect (() =>{
        fetchBlogs();
        const token = localStorage.getItem('token')
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    },[])


    const value = {
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput
    }


    return (
        <AppContext.Provider value = {value}>
            {children}
        </AppContext.Provider>
    )
}


export const useAppContext = () =>{ // we will call this function(useAppContext) whenever we need the data from the context
    return useContext(AppContext)
}