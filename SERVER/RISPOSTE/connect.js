import { MongoClient } from 'mongodb';
async function connectToCluster() {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient("mongodb://localhost:27017");
        await mongoClient.connect(); 
        return mongoClient;
    } catch (error) {
        throw new Error ('problemi di connesione');
    }
 }
export {connectToCluster};
