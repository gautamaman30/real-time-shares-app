import mongodb from 'mongodb'
import makeUserDb from './user-db.js'


const url = process.env.URL;
const dbName = process.env.DBNAME;
const MongoClient = mongodb.MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDb(){
  try{
      if(!client.isConnected()) {
        await client.connect();
      }
      return client.db(dbName);
  } catch(e){
    console.log(e);
  } 
}


const userDb = makeUserDb({connectDb});
export default userDb;
