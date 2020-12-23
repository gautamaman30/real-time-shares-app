export default function makeUserDb({connectDb}){
  return Object.freeze({
    insert,
    findByUser_id,
    getAllShares,
    updateShares
  });

  async function insert(userInfo){
    try{
      const db = await connectDb();
      const res = await db.collection('users').insertOne(userInfo);
      return res.insertedCount;
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }

  async function findByUser_id( {_id} ){
    try{
      const db = await connectDb();
      const res = await db.collection('users').findOne({_id});
      return res;
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }


  async function getAllShares(){
    try{
      const db = await connectDb();
      const res = await db.collection('shares').find();
      return (await res.toArray()).map(({ _id: id, ...rest}) => ({id, ...rest}));
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }

  async function updateShares(shares){
    try{
      const db = await connectDb();
      await db.collection('shares').deleteMany();
      const res = await db.collection('shares').insertMany(shares);
      return res;
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }
}
