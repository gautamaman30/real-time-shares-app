import {userSession} from '../controllers/index.js'
import userDb from '../data-access/index.js'


export default function fetchCurrentUserShares(session, ws){
  return new Promise((resolve, reject) => {
    userSession.checkSession(session)
      .then((res) => {
        if(res){
          userDb.findByUser_id({_id: session.user_id})
           .then((user) => {
             let arr = user.shares;
             userDb.getAllShares()
              .then((shares) => {
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
                resolve(ws.send(JSON.stringify(arr)));
              }).catch((err) => {
                console.log(err.message);
                resolve(ws.send(''));
              });
           }).catch((err) => {
             console.log(err.message);
             resolve(ws.send(''));
           });
         }else{
           resolve(ws.on('close', () => console.log('disconnected')));
         }
       });
    });
}
