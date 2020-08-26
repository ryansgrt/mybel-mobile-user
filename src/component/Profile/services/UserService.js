import axios from 'axios';
import RNFetchBlob from "rn-fetch-blob";
import { baseURL } from '../../../baseUrl/baseURL';

const client = axios.create({ baseURL: `${baseURL}` })
const baseUrl = `${baseURL}`

export async function getUsers() {
    console.log("masuk services")
    const { data: { content } } = await client.get('/user/list');
    return content;
}
export async function getSingleData(id) {

    const { data: { content } } = await client.get(`/user/${id}`);
    return content;
}
export async function saveUser(form) {
    const { data } = await client.post('/user/', form);
    console.log(data, 'DATA');

    return data;
}

export async function updateUser({photo, body}) {
    console.log("masuk services")
    console.log("PHOTO", photo);
    console.log('BODY', body);
    
    const res = await RNFetchBlob.fetch('PUT', baseUrl, {
        'Content-Type': 'multipart/form-data',
    }, [
        { name: 'file', filename: photo.fileName, type: photo.type, data: RNFetchBlob.wrap(photo.uri) },
        {
            name: 'user',
            data: JSON.stringify(body)
        }
    ])
    return await res.json();

}

export async function deleteUser(Id) {
    const response = await client.delete(`/user/${Id}`);
    if (response.status === 200) return true;
    else return false;
}

export async function login(user, password) {

    const { data } = await client.get(`/user/signin?identity=${user}&password=${password}`);
    alert("log in berhasil")
    return data;
}

export async function getUsername(keyword) {
    const { data } = await client.get(`/user/username/${keyword}`);
    console.log(data, "service")
    return data;
}
export async function getEmail(keyword) {
    const { data } = await client.get(`/user/email/${keyword}`);
    return data;
}

export async function getUserId(id) {
    const { data } = await client.get(`/user/${id}`);
    console.log('SERVICE', data);

    return data;
}
