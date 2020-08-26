import axios from 'axios';
import { baseURL } from '../../../baseUrl/baseURL';

const client = axios.create({ baseURL: `${baseURL}` })

export async function saveTransaction(trx) {
    const { data } = await client.post('/transaction', trx)
    console.log('DATA SERVICE', data);

    return data;
} 
