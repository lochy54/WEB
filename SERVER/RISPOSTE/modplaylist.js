import { connectToCluster } from './connect.js';
import { getapi } from './connectapi.js';
import { z } from 'zod';

async function modplaylist1(email){

    
        try{
    
            const client = await connectToCluster();
            const db = client.db("Uni");
            const col = db.collection("Playlist");
        try {

            
            const playlist = await col.find({"email.0":email}).toArray()
            await client.close();
            return {res: playlist, code:200 , status:"ok"};

        } catch (error) {
            await client.close();
            console.error(error);
            return {res:false , code:500 , status: "Internal Server Error"};
        }}catch(error){
            console.error(error);
            return {res:false , code:500 , status: "Internal Server Error"};
        }
    }
    


async function modplaylist2(email,nome){

    try{
    
        const client = await connectToCluster();
        const db = client.db("Uni");
        const col = db.collection("Playlist");
       

        

    try {

        
        const playlist = await col.findOne({"email.0":email, "nome":nome})
        await client.close();

        try{
            var spotifyApi = await getapi();
            if (playlist.canzoni!=""){
                var tra = []
                tra.push(playlist.canzoni)
                var data = await spotifyApi.getTracks(tra);
                var tracks = data.body;
                playlist.canzoni=tracks;
            }else{
                playlist.canzoni.tracks=null; 
            }

                
             
           
            
            return {res: playlist, code:200 , status:"ok"};}
            catch(e){
                console.log(e);
                return { res:false ,  code:400 , status: "Bed Request" };
            }
        
        
        


        return {res: playlist, code:200 , status:"ok"};

    } catch (error) {
        await client.close();
        console.error(error);
        return {res:false , code:500 , status: "Internal Server Error"};
    }}catch(error){
        console.error(error);
        return {res:false , code:500 , status: "Internal Server Error"};
    }
}


async function modplaylist3(email){

    
    try{

        const client = await connectToCluster();
        const db = client.db("Uni");
        const col = db.collection("Playlist");
    try {

        
        const playlist = await col.find({ "email": { $elemMatch: { $eq: email } } }).toArray()
        await client.close();
        return {res: playlist, code:200 , status:"ok"};

    } catch (error) {
        await client.close();
        console.error(error);
        return {res:false , code:500 , status: "Internal Server Error"};
    }}catch(error){
        console.error(error);
        return {res:false , code:500 , status: "Internal Server Error"};
    }
}



async function modplaylist4(email,nome){



try{

    const client = await connectToCluster();
    const db = client.db("Uni");
    const col = db.collection("Playlist");
   

    

try {

    
    const playlist = await col.findOne({ "email": { $elemMatch: { $eq: email } }, nome:nome})
    await client.close();

    try{
        var spotifyApi = await getapi();
        if (playlist.canzoni!=""){
            var tra = []
            tra.push(playlist.canzoni)
            var data = await spotifyApi.getTracks(tra);
            var tracks = data.body;
            playlist.canzoni=tracks;
        }else{
            playlist.canzoni.tracks=null; 
        }

            
         
       
        
        return {res: playlist, code:200 , status:"ok"};}
        catch(e){
            console.log(e);
            return { res:false ,  code:400 , status: "Bed Request" };
        }
    
    
    


    return {res: playlist, code:200 , status:"ok"};

} catch (error) {
    await client.close();
    console.error(error);
    return {res:false , code:500 , status: "Internal Server Error"};
}}catch(error){
    console.error(error);
    return {res:false , code:500 , status: "Internal Server Error"};
}
}

async function ADDplay(email,emailpass,nome){

    try{

        const client = await connectToCluster();
        const db = client.db("Uni");
        const col = db.collection("Playlist");
    try {

        
        await col.updateOne(
            { "email.0":emailpass, "nome":nome}, // Filter
            { $push: { email: email }}
        );
    
        await client.close();
        return {res: true, code:200 , status:"ok"};

    } catch (error) {
        await client.close();
        console.error(error);
        return {res:false , code:500 , status: "Internal Server Error"};
    }}catch(error){
        console.error(error);
        return {res:false , code:500 , status: "Internal Server Error"};
    }


   
}


async function delPlaylist(email,nome){
    try{

        const client = await connectToCluster();
        const db = client.db("Uni");
        const col = db.collection("Playlist");
        await col.deleteOne({"email.0":email, "nome":nome});
        await client.close();
        return {res:true , code:200 , status: "ok"};
   
    }catch(error){
        console.error(error);
        return {res:false , code:500 , status: "Internal Server Error"};
    }
}


export{modplaylist1,modplaylist2,modplaylist3,modplaylist4,ADDplay,delPlaylist};