import buildMakeUserEntity from './user.js'
import {makeId} from '../utils/index.js'


const makeUserEntity = buildMakeUserEntity({makeId});

export default makeUserEntity;
