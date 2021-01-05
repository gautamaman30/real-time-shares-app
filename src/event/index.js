import userDb from '../data-access/index.js'
import events from 'events'
const EventEmitter = events.EventEmitter;
const em = new EventEmitter();


function createSharesUpdateEvent(){
  em.emit('UpdateShares');
}


async function updateSharesValues(){
  try{
    let shares = await userDb.getAllShares();

    shares.forEach(item => {
      delete item.id;
      let power = (Math.floor(item.value)+'').length;
      const val = Math.floor((Math.random()*(Math.pow(10,power)))*100)/100;
      item.value = val;
    });

    const res = await userDb.updateShares(shares);
    return res;
  }catch(e){
    console.log(e.message);
    return {error: e.message};
  }
}


export default function updateSharesEvent(){
  em.on('UpdateShares', () => {
    updateSharesValues()
      .then( res => em.emit('UpdateUserShares'))
      .catch(e => console.log(e.message));
    })

  setInterval(() => createSharesUpdateEvent(), 10000);
}


export {em};
