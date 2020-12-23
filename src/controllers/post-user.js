export default function makePostUser({addUser, userSession}){
  return async function postUser(httpRequest){
    try{
      const {...userInfo } = httpRequest.body;
      const user = await addUser({...userInfo});
      if(user.error) throw new Error(user.error);

      const session = userSession.createSession(user.user_id);
      if(session){
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          statusCode: 201,
          body: {
            user,
            session
          },
        }
      }
      throw new Error('Signup failed');
    } catch(e){
      console.log(e.message);
      return {
         headers: {
           'Content-Type': 'application/json'
         },
         statusCode: 400,
         body: {
           error: e.message,
         },
       }
    }
  }
}
