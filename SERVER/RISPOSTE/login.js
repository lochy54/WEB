import { z } from 'zod';
import { connectToCluster } from './connect.js';
import { createHash } from 'crypto';

function forgot(email){
    const userDataSchema = z.object({
        email: z.string().email(),
    });

    try{
        userDataSchema.parse({"email":email});
        return {res:true , code:200 , mess: "Richiesta inviata"};
    }catch(error){
        console.error(error);
        return {res:false , code:400 , mess: "Bad Request"};
    }
}

async function login(userData){

    
    const userDataSchema = z.object({
        email: z.string().email(),
        password: z.string()
    });

    try{

        const client = await connectToCluster();
        const db = client.db("Uni");
        const col = db.collection("Utenti");
    

    try {
    

        userData.data= new Date(userData.data);
        userDataSchema.parse(userData);
        const user = await col.findOne({"email": userData.email, "password": userData.password});
        await client.close();
        if(!user){
            return {res:false , code:400 , status: "Bad Request"};
        }
        return {res: createHash('sha256').update(userData.email+userData.password).digest('base64'), code:200 , status:"ok"};
    } catch (error) {
        await client.close();
        console.error(error);
        return {res:false , code:500 , mess: "Internal Server Error"};
    }}catch(error){
        console.error(error);
        return {res:false , code:500 , mess: "Internal Server Error"};
    }
}

export { login, forgot };
