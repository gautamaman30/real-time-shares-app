export default function makeAddUser({makeUserEntity, userDb, hashPassword}){
  return async function addUser( userInfo ){
    try{
      const userEntity = makeUserEntity( userInfo );
      if(userEntity.error) throw new Error(JSON.stringify(userEntity.error));

      let user = {
        user_id: userEntity.getUser_id(),
        name: userEntity.getName(),
        timestamp_created: userEntity.getTimestamp_created(),
      }
      const password = await hashPassword(userEntity.getPassword());
      const res = await userDb.insert({
        _id: user.user_id,
        name: user.name,
        timestamp_created: user.timestamp_created,
        password: password,
        shares: ['Tesla', 'Ford']
      });
      if(!res || res.error) throw new Error('Internal Error');
      return Object.freeze(user);
    } catch(e){
      console.log(e.message);
      return {error: e.message};
    }
  }
}
