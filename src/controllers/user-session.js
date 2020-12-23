export default function makeUserSession({makeId,readFile,updateFile}){
  const userSession = Object.freeze({
    binarySearch: function(arr, session){
      let i=0,j=arr.length;
      let b = parseInt(session.timestamp);
      let ind = -1;
      while(i<=j){
        let mid = Math.floor(i+(j-i)/2);
        let a = parseInt(arr[mid].timestamp);
        if(a < b){
          i = mid + 1;
        }
        else if(a > b){
          j = mid - 1;
        }
        else{
          ind = mid;
          break;
        }
      }
      if(arr[ind].session_id === session.session_id)return true;
      return false;
    },
    createSession: function(user_id){
        let id = makeId();
        id += Math.floor(Math.random()*1000000000);
        id += user_id;
        const session = {
          session_id: id,
          timestamp: Date.now(),
        }
        readFile()
          .then((sessions) => {
            if(!sessions[user_id]){
              sessions[user_id] = [];
            }
            sessions[user_id].push(session);
            updateFile(sessions)
              .then((res) => console.log(res))
              .catch((e) => console.log(e));
          }).catch((e) => console.log(e));

        session.user_id = user_id;
        return Object.freeze(session);
    },
    checkSession:function(session){
      return new Promise((resolve, reject) => {
        readFile()
          .then((sessions) => {
            let arr = sessions[session.user_id];
            if(arr && arr.length > 0){
              const res = this.binarySearch(arr, session);
              resolve(res);
            }
            return false;
          }).catch((e) => console.log(e));
        });
      }
  });
  return userSession;
}
