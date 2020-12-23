export default function makeGetUser({loginUser, userSession}){
  return async function getUser(httpRequest){
    try{
      const userInfo = httpRequest.body;
      if(!userInfo.user_id) throw new Error('User must provide an user id');
      if(!userInfo.password) throw new Error('User must provide the password');
      const user = await loginUser({user_id: userInfo.user_id, password: userInfo.password});
      if(user.error) throw new Error(user.error);
      console.log(user);
      const session = userSession.createSession(user.user_id);
      if(session){
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          statusCode: 200,
          body: {
            user,
            session
          },
        }
      }
      throw new Error('Authentication failed');
    } catch(e){
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 401,
        body: {
          error: e.message,
        },
      }
    }
  }
}
