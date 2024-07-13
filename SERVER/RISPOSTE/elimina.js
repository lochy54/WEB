import { connectToCluster } from './connect.js';


async function elimina(email){

    try{

        const client = await connectToCluster();
        const db = client.db("Uni");
        const col = db.collection("Utenti");
        await col.deleteOne({"email": email});
        await client.close();
        return {res:true , code:200};
   
    }catch(error){
        console.error(error);
        return {res:false , code:500};
    }
}

    



export {elimina}