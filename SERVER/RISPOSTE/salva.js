import { z } from 'zod';
import { connectToCluster } from './connect.js';
import { ObjectId } from "bson"


async function salva(userData, email){

    delete userData.token;

    const userDataSchema = z.object({
        nome: z.string().min(2),
        tag: z.array(z.string()).default([]),
        descrizione: z.string().min(2), 
        canzoni: z.array(z.string()).default([]),
        public: z.boolean(),
        durata: z.number().positive()
    });
    
    try {
        const client = await connectToCluster();
        const db = client.db("Uni");
        const col = db.collection("Playlist");
    
    try {
        userDataSchema.parse(userData);
        userData.email= [email];
        await col.insertOne(userData);
        await client.close();
        return {res:true , code:201 };


    } catch (error) {
        console.error(error);
        return {res:false , code:400};
    }
    }catch (error) {
        console.error(error);
        return {res:false , code:500 };
    
    
    
    }}

    async function salvaMod(userData){
        delete userData.token;
        const id = userData.id;
        delete userData.id
     
        const userDataSchema = z.object({
            nome: z.string().min(2),
            tag: z.array(z.string()).default([]),
            descrizione: z.string().min(2), 
            canzoni: z.array(z.string()).default([]),
            public: z.boolean(),
            durata: z.number().positive()

        });
        
        try {
            userDataSchema.parse(userData);
            const client = await connectToCluster();
            const db = client.db("Uni");
            const col = db.collection("Playlist");
        
        try {
            await col.updateOne({_id: new ObjectId(id)},{$set:{nome:userData.nome,
                                                        tag:userData.tag,
                                                        descrizione:userData.descrizione,
                                                        canzoni: userData.canzoni,
                                                        public: userData.public,
                                                        durata: userData.durata

            
            }});
            await client.close();
            return {res:true , code:201 };
    
    
        } catch (error) {
            console.error(error);
            return {res:false , code:400};
        }
        }catch (error) {
            console.error(error);
            return {res:false , code:500 };
        
        
        
        }}

    
    export {salva,salvaMod}
    
    
    