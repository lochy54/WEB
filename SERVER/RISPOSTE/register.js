import { z } from 'zod';
import { connectToCluster } from './connect.js';

async function register(userData, generi, countries){


const userDataSchema = z.object({
    nome: z.string().min(2),
    cognome: z.string().min(2),
    data: z.date(), 
    paese: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    artisti: z.array(z.string()).default([]),
});

try {
    userData.data= new Date(userData.data);
    userDataSchema.parse(userData);
    if(countries.includes(userData.paese)){
        if (!userData.generi.every(v => generi['genres'].includes(v))) {
            return { res: false, code: 400 };
        }
            try {
                const client = await connectToCluster();
                try{
                const db = client.db("Uni");
                const col = db.collection("Utenti");
                await col.insertOne(userData);
                return {res:true , code:200 };
            } catch (error) {
                console.error(error);
                return {res:false , code:500 };
            }finally{
                await client.close();
            }}catch (error) {
                console.error(error);
                return {res:false , code:500 };
            }              
    }
}catch (error) {
    console.error(error);
    return {res:false , code:400 };



}}
export {register}


