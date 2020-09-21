// import * as MongoClient from 'mongodb';
let MongoClient=require("mongodb").MongoClient;

class Connector{
    getMongoClient(){
        // Connection URL
        const url = 'mongodb+srv://admin:6W0vUCNIbfdw6ew1@coronavirus-wqs91.mongodb.net/coronaVirus?retryWrites=true&w=majority';

        // Create a new MongoClient
        const client = new MongoClient(url);

        return client;
    }
}

module.exports=Connector;