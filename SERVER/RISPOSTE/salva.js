import { z } from 'zod';
import { connectToCluster } from './connect.js';
import { ObjectId } from "bson"

const userDataSchema = z.object({
    nome: z.string().min(2),
    tag: z.array(z.string()).default([]),
    descrizione: z.string().min(2),
    canzoni: z.array(z.string()).default([]),
    public: z.boolean(),
    durata: z.number().positive()
});

async function salva(userData, email) {

    delete userData.token;
    try {
        userDataSchema.parse(userData);
        userData.email = [email];
        try {
            const client = await connectToCluster();
            try {
                const db = client.db("Uni");
                const col = db.collection("Playlist");
                await col.insertOne(userData);
                return { res: true, code: 200 };


            } catch (error) {
                console.error(error);
                return { res: false, code: 500 };
            } finally {
                await client.close();
            }
        } catch (error) {
            console.error(error);
            return { res: false, code: 500 };



        }
    } catch (error) {
        console.error(error);
        return { res: false, code: 400 };



    }
}

async function salvaMod(userData,email) {
    delete userData.token;
    const id = userData.id;
    delete userData.id
    try {
        userDataSchema.parse(userData);
        try {
            const client = await connectToCluster();
            try {
                const db = client.db("Uni");
                const col = db.collection("Playlist");
                await col.updateOne({ _id: new ObjectId(id) , "email.0": email}, {
                    $set: {
                        nome: userData.nome,
                        tag: userData.tag,
                        descrizione: userData.descrizione,
                        canzoni: userData.canzoni,
                        public: userData.public,
                        durata: userData.durata

                    }
                });
                return { res: true, code: 200 };


            } catch (error) {
                console.error(error);
                return { res: false, code: 500 };
            }finally{
                await client.close();
            }
        } catch (error) {
            console.error(error);
            return { res: false, code: 500 };



        }}catch (error) {
            console.error(error);
            return { res: false, code: 400 };
        }
    }

    
    export { salva, salvaMod }


