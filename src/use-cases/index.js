import userDb from '../data-access/index.js'
import makeUserEntity from '../users/index.js'
import makeAddUser from './add-user.js'
import makeLoginUser from './login-user.js'
import {hashPassword, compareHashPassword} from '../utils/index.js'


const addUser = makeAddUser({makeUserEntity, userDb, hashPassword});
const loginUser = makeLoginUser({userDb, compareHashPassword});


export {
  addUser,
  loginUser
};
