import { MongoClient } from 'mongodb';
require('dotenv').config(); 

//POST /api/new-meetup

async function handler(req, res) {
    if(req.method === 'POST') {
        const data = req.body;

        // const { title, image, address, description } = data;

        const client = await MongoClient.connect(process.env.MONGO_URI);
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        
        const result = await meetupsCollection.insertOne(data);
        
        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;