import axios, { AxiosResponse } from 'axios';

const post = async (url: string, payload: Record<string, string | string[] | boolean > ) => {
    try {        
        const response: AxiosResponse = await axios.post(url, payload);
        const responseData: Record<string, string | string[] | boolean > = response.data;
        return responseData;
    } catch (error) {
        console.error("post " + url + " request failed with error");
        console.error(error);      
    }
} 

const get = async (url: string ) => {
    try {        
        const response: AxiosResponse = await axios.get(url);
        const responseData: Record<string, string> = response.data;
        return responseData;
    } catch (error) {
        console.error("get " + url + " request failed with error");
        console.error(error);      
    }
} 

export  { post, get };