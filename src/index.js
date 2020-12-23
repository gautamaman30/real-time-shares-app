import http from 'http'
import ws from 'ws'
import express from 'express'
import userDb from './data-access/index.js'
import makeCallBack from './callback/index.js'
import {postUser,getUser} from './controllers/index.js'
import updateSharesEvent from './event/index.js'
import {em} from './event/index.js'
import fetchCurrentUserShares from './userEvent/index.js'
import path from 'path'



const staticPath = path.join(process.cwd(), 'public');
const app = express();
app.use(express.static(staticPath));
app.use(express.json());


app.get('/login', (req, res) => {
  res.sendFile(path.join(staticPath,'login.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(staticPath,'signup.html'));
});
app.post('/api/v1/user/signup', makeCallBack(postUser));
app.post('/api/v1/user/login', makeCallBack(getUser));


const server = http.createServer(app);
const WebSocketServer = ws.Server;
const wss = new WebSocketServer({server: server});
wss.on('connection', (ws) => {

    ws.on('message', (message) => {
      const session = JSON.parse(message);
      em.on('UpdateUserShares', () => {
        fetchCurrentUserShares(session, ws)
         .then((res) => res);
      })
    })
});
updateSharesEvent();


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running at PORT:${PORT}`))
