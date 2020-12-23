export default function makeLoginUser({ userDb, compareHashPassword}){
  return async function loginUser( userInfo ){
    try{
      const user = await userDb.findByUser_id({_id: userInfo.user_id });
      if(user && user.error) throw new Error('Internal Error');
      if(user){
        const check = await compareHashPassword(userInfo.password, user.password);
        if(check === false) throw new Error('Wrong Password');
        else if (check === true ){
          return Object.freeze({
            user_id: user._id,
            name: user.name,
            timestamp_created: user.timestamp_created,
          });
        }
        else throw new Error('Internal Error');
      }
      throw new Error('User does not exist');
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }
}
