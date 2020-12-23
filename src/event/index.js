import userDb from '../data-access/index.js'
import events from 'events'
const EventEmitter = events.EventEmitter;
const em = new EventEmitter();


function createUpdateEvent(){
  em.emit('UpdateShares');
}

export default function updateSharesEvent(){
  em.on('UpdateShares', async () => {
    try{
      const shares = await userDb.getAllShares();
      shares.forEach((item) => {
        delete item.id;
        let power = (Math.floor(item.value)+'').length;
        const val = Math.floor((Math.random()*(Math.pow(10,power)))*100)/100;
        item.value = val;
      });
      userDb.updateShares(shares)
        .then((res) => {
          em.emit('UpdateUserShares')
        });
    } catch(e){
      console.log(e);
    }
  })

  setInterval(() => {
    createUpdateEvent();
  }, 10000);
}
export {em};
