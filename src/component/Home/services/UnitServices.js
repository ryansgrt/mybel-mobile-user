import axios from 'axios';
import { baseURL } from '../../../baseUrl/baseURL';

const client = axios.create({ baseURL: `${baseURL}` })

export async function getAllUnit() {
    const { data } = await client.get('/unit/list');
    return data;
}

export async function getAllType() {
    const { data } = await client.get('/type/list');
    return data;
}

export async function getAllDesign() {
    const { data } = await client.get('/design/list');
    return data;
}

export async function getAllRoom() {
    const { data } = await client.get('/room/list');
    console.log('DATA ROOM', data);

    return data;
}

export async function getUnitId(Id) {
    const {data} = await client.get(`/unit/${Id}`)
    return data
}

export async function getDesignId(Id) {
    const {data} = await client.get(`/design/${Id}`)
    return data
}
