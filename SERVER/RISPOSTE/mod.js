import { connectToCluster } from './connect.js';
import { z } from 'zod';

async function mod(userData) {


try{
    const client = await connectToCluster();
    try {

        const db = client.db("Uni");
        const col = db.collection("Utenti");
        const user = await col.findOne({ "email": userData });
        user.password = "";
        return { res: user, code: 200, status: "ok" };

    } catch (error) {
        console.error(error);
        return { res: false, code: 500 };
    }finally{
        await client.close()
    }} catch (error) {
        console.error(error);
        return { res: false, code: 500 };
    }
}



async function modData(userData, email, generi, countries) {

    const userDataSchema = z.object({
        nome: z.string().min(2),
        cognome: z.string().min(2),
        data: z.date(),
        paese: z.string(),
        email: z.string().email(),
        artisti: z.array(z.string().min(2)).default([]),
    });

    try {
        userData.data = new Date(userData.data);
        userDataSchema.parse(userData);
        if (!countries.includes(userData.paese)) {
            return { res: false, code: 400 };
        }
        try{
            const client = await connectToCluster();
            const session = client.startSession()
        try {
            const db = client.db("Uni");
            var col = db.collection("Utenti");
            if (!userData.generi.every(v => generi['genres'].includes(v))) {
                return { res: false, code: 400 };
            }
            await session.startTransaction()
            await col.updateOne(
                { email: email }, // Filter
                { $set: userData } // Update operation
            );
            col = db.collection("Playlist");
            await col.updateMany(
                { "email": email }, // Filter
                { $set: { "email.$": userData.email } } // Update operation
            );
            await session.commitTransaction()
            return { res: true, code: 200 };

        } catch (error) {
            session.abortTransaction()
            console.error(error);
            return { res: false, code: 500 };

        }finally{
            await session.endSession();
            await client.close();
        }}catch (error) {
            console.error(error);
            return { res: false, code: 500 };

        }



    } catch (error) {
        console.error(error);
        return { res: false, code: 400 };



    }
}


async function modPass(userData, email) {


    const userDataSchema = z.object({
        passn: z.string().min(6),
        passv: z.string().min(6),

    });

    try {
        userDataSchema.parse(userData);
        try {
            const client = await connectToCluster();
            try{
            const db = client.db("Uni");
            const col = db.collection("Utenti");
            const user = await col.findOne({ "email": email });
            if (user.password === userData.passv) {
                await col.updateOne(
                    { email: email }, // Filter
                    { $set: { password: userData.passn } } // Update operation
                );
                return { res: true, code: 200 };

            } else {
                return { res: false, code: 400 };
            }






        } catch (error) {
            console.error(error);
            return { res: false, code: 500 };
        }finally{
            await client.close();
        }} catch (error) {
            console.error(error);
            return { res: false, code: 500 };
        }
    } catch (error) {
        console.error(error);
        return { res: false, code: 400 };



    }
}


export { mod, modData, modPass }
