import { connectToCluster } from './connect.js';


async function elimina(email) {
    try {
        const client = await connectToCluster();
        const session = client.startSession()
        try {
            const db = client.db("Uni");
            var col = db.collection("Utenti");
            await session.startTransaction()
            await col.deleteOne({ "email": email });
            col = db.collection("Playlist");
            await col.deleteMany({ "email.0": email })
            await col.updateMany(
                { "email": email }, // Filter
                { $pull: { email: email } } // Update operation
            );
            await session.commitTransaction()
            return { res: true, code: 200 };
        } catch (error) {
            session.abortTransaction()
            console.error(error);
            return { res: false, code: 500 };
        } finally {
            await session.endSession();
            await client.close()    
        }
    } catch (error) {
        console.error(error);
        return { res: false, code: 500 };
    }
}

export { elimina }