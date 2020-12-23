import {addUser,loginUser} from '../use-cases/index.js'
import makePostUser from './post-user.js'
import makeGetUser from './get-user.js'
import makeUserSession from './user-session.js'
import {makeId, updateFile, readFile} from '../utils/index.js'


const userSession = makeUserSession({makeId, readFile, updateFile});
const postUser = makePostUser({addUser, userSession});
const getUser = makeGetUser({loginUser, userSession});


export {
  postUser,
  getUser,
  userSession
};
