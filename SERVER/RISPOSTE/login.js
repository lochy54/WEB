import { z } from 'zod';
import { connectToCluster } from './connect.js';
import { createHash } from 'crypto';
import { timeStamp } from 'console';

function forgot(email){
    const userDataSchema = z.object({
        email: z.string().email(),
    });

    try{
        userDataSchema.parse({"email":email});
        return {res:true , code:200};
    }catch(error){
        console.error(error);
        return {res:false , code:400};
    }
}

async function login(userData){

    
    const userDataSchema = z.object({
        email: z.string().email(),
        password: z.string()
    });


    try {
    

        userData.data= new Date(userData.data);
        userDataSchema.parse(userData);
    try{ 
        const client = await connectToCluster();
    try{

        const db = client.db("Uni");
        const col = db.collection("Utenti");
        const user = await col.findOne({"email": userData.email, "password": userData.password});
     

        if(user == null){
            return {res:false , code:400};
        }
        
        return {res: createHash('sha256').update(userData.email+userData.password+Date.now()).digest('base64'), code:200 };
    }catch (error) {
            console.error(error);
            return {res:false , code:500};
        }finally{
            await client.close();
        }}catch (error) {
            console.error(error);
            return {res:false , code:500};
        }
}catch(error){
        console.error(error);
        return {res:false , code:400};
    }
}

export { login, forgot };
