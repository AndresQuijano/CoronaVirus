// const Connector=require("./connector");
import {Connector} from "./connector.js";

export class PeopleDAO{
    constructor(){

    }

    insertUsers(arrPeople){
        const connector=new Connector();

        // Create a new MongoClient
        const client = connector.getMongoClient();

        // Use connect method to connect to the Server
        client.connect(function(err, client) {
            console.log("Connected correctly to server");

            const db = client.db("coronaVirus");

            db.collection('people').insertMany(arrPeople, function(err, r) {
                client.close();
            });
        });
    }
}


// module.exports=PeopleDAO;

// //For testing
// let arrTest=
// [
//     {
//         name:"Andrés Quijano",
//         phone:"+57 301 209 23 03",
//         genre:"male",
//         age:"34",
//         status:"never",
//         social:["+573206278044",
//             "+5123412345"
//         ]
//     },{        
//         name:"Camila Niño",
//         phone:"+573206278044",
//         genre:"female",
//         age:"29",
//         status:"recovered",
//     },{        
//         name:"César Peluño",
//         phone:"+5123412345",
//         genre:"male",
//         age:"31",
//         status:"dead",
//     }
// ]


// let dao=new PeopleDAO();
// dao.insertUsers(arrTest);