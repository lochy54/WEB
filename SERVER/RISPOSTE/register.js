import { z } from 'zod';
import { connectToCluster } from './connect.js';

async function register(userData, generi){

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua e Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaigian", "Bahamas",
        "Bahrein", "Bangladesh", "Barbados", "Bielorussia", "Belgio", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia ed Erzegovina", "Botswana", "Brasile",
        "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambogia", "Camerun", "Canada", "Capo Verde", "Repubblica Centrafricana", "Ciad", "Cile", "Cina",
        "Colombia", "Comore", "Congo", "Repubblica Democratica del Congo", "Costa Rica", "Croazia", "Cuba", "Cipro", "Repubblica Ceca", "Danimarca",
        "Djibouti", "Dominica", "Repubblica Dominicana", "Timor Est", "Ecuador", "Egitto", "El Salvador", "Guinea Equatoriale", "Eritrea", "Estonia",
        "Eswatini", "Etiopia", "Figi", "Finlandia", "Francia", "Gabon", "Gambia", "Georgia", "Germania", "Ghana", "Grecia", "Grenada", "Guatemala", "Guinea",
        "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Ungheria", "Islanda", "India", "Indonesia", "Iran", "Iraq", "Irlanda", "Israele", "Italia",
        "Costa d'Avorio", "Giamaica", "Giappone", "Giordania", "Kazakistan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kirghizistan", "Laos", "Lettonia",
        "Libano", "Lesotho", "Liberia", "Libia", "Liechtenstein", "Lituania", "Lussemburgo", "Madagascar", "Malawi", "Malesia", "Maldive", "Mali", "Malta",
        "Isole Marshall", "Mauritania", "Mauritius", "Messico", "Micronesia", "Moldavia", "Monaco", "Mongolia", "Montenegro", "Marocco", "Mozambico",
        "Myanmar", "Namibia", "Nauru", "Nepal", "Paesi Bassi", "Nuova Zelanda", "Nicaragua", "Niger", "Nigeria", "Corea del Nord", "Macedonia del Nord",
        "Norvegia", "Oman", "Pakistan", "Palau", "Panama", "Papua Nuova Guinea", "Paraguay", "Perù", "Filippine", "Polonia", "Portogallo", "Qatar",
        "Romania", "Russia", "Rwanda", "Saint Kitts e Nevis", "Santa Lucia", "Saint Vincent e Grenadine", "Samoa", "San Marino", "Sao Tome e Principe",
        "Arabia Saudita", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovacchia", "Slovenia", "Isole Salomone", "Somalia", "Sudafrica",
        "Corea del Sud", "Sudan del Sud", "Spagna", "Sri Lanka", "Sudan", "Suriname", "Svezia", "Svizzera", "Siria", "Taiwan", "Tagikistan", "Tanzania",
        "Tailandia", "Togo", "Tonga", "Trinidad e Tobago", "Tunisia", "Turchia", "Turkmenistan", "Tuvalu", "Uganda", "Ucraina", "Emirati Arabi Uniti",
        "Regno Unito", "Stati Uniti d'America", "Uruguay", "Uzbekistan", "Vanuatu", "Città del Vaticano", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];





const userDataSchema = z.object({
    nome: z.string().min(2),
    cognome: z.string().min(2),
    data: z.date(), 
    paese: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    artisti: z.array(z.string()).default([]),
});

try {
    const client = await connectToCluster();
    const db = client.db("Uni");
    const col = db.collection("Utenti");

try {
    userData.data= new Date(userData.data);
    userDataSchema.parse(userData);
    if(countries.includes(userData.paese)){
        if(userData.generi.length==0){
            await col.insertOne(userData);
            await client.close();
            return {res:true , code:201 , status: "Created"};
        }
        for (let index = 0; index < userData.generi.length; index++) {
            if(generi['genres'].includes(userData.generi[index])){
                await col.insertOne(userData);
                await client.close();
                return {res:true , code:201 , status: "Created"};
            }
            
        }
    }


} catch (error) {
    console.error(error);
    return {res:false , code:400 , status: "Bed request"};
}
}catch (error) {
    console.error(error);
    return {res:false , code:500 , status: "Internal Server Error"};



}}

export {register}


