import userDb from '../data-access/index.js'
import {userSession} from '../controllers/index.js'


function checkUserSession({session}){
  return new Promise((resolve, reject) => {
    userSession.checkSession(session)
      .then(res => {
          resolve(res);
      })
  });
}


async function getUserShares({user_id}){
  try{
    const user = await userDb.findByUser_id({_id: user_id});
    let arr = user.shares;
    const shares = await userDb.getAllShares();

    let map = {};
    for(let i=0;i<shares.length;i++){
      map[shares[i].name] = shares[i];
    }
    for(let i=0;i<arr.length;i++){
      let temp = arr[i];
      arr[i] = {
        name: temp,
        quantity: map[temp].quantity,
        value: map[temp].value
      }
    }
    return arr;
  }catch(e){
    console.log(e.message);
    return {error: e.message};
  }
}


export default function fetchCurrentUserShares(session, ws){
  return new Promise((resolve, reject) => {
    checkUserSession(session)
      .then(res => {
        if(res){
          getUserShares(session.user_id)
            .then( arr =>
              resolve(ws.send(JSON.stringify(arr)))
            ).catch(e => {
                console.log(e.message);
                resolve(ws.send(''));
            });
         }
         else resolve(ws.on('close', () => console.log('disconnected')));
       });
    });
}
