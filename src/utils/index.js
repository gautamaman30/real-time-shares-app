import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'


const makeId = uuidv4;


function readFile(){
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(process.cwd(),'tmp.txt'),'utf8', (err, file) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      else{
        resolve(file.length > 0 ?JSON.parse(file):{});
      }
    });
  });
}


function updateFile(session){
  const data = JSON.stringify(session);
  return new Promise((resolve,reject) => {
    let writer = fs.createWriteStream(path.join(process.cwd(),'tmp.txt'));
    writer.write(data);
    writer.end();
    writer.on("finish", () => {
      console.log(data);
      resolve('File updated');
    });
    writer.on("error", (err) => reject(err));
  });
}


async function hashPassword(password){
  const saltRounds = 10;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err){
        console.log(err);
        reject(null);
      }
      resolve(hash);
    })
  });
  return hashedPassword;
}


async function compareHashPassword(password, hashedPasswod){
  const check = await new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPasswod, (err, isMatch) => {
      if(err){
        console.log(err);
        reject(null);
      }
      if(isMatch) resolve(true);
      else resolve(false);
    });
  });
  return check;
}


export {
  compareHashPassword,
  hashPassword,
  makeId,
  readFile,
  updateFile
};
