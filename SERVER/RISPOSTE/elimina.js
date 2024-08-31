import { connectToCluster } from './connect.js';


async function elimina(email){

    try{
        const client = await connectToCluster();
        const session = client.startSession();

        try{
        await session.startTransaction();
        const db = client.db("Uni");
        const col = db.collection("Utenti");
        await col.deleteOne({"email": email});
        await session.commitTransaction()
        return {res:true , code:200};
    }catch(error){
        await session.abortTransaction()
        console.error(error);
        return {res:false , code:500};
    }finally{
        await session.close()
        await client.close()
    }
    }catch(error){
        console.error(error);
        return {res:false , code:500};
    }
}

    

export {elimina}