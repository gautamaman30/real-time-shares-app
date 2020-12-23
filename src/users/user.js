export default function buildMakeUserEntity({makeId}){
  return function makeUserEntity({
    user_id = makeId(),
    name,
    timestamp_created = Date.now(),
    password,
    confirm_password
  }){
    let err = {error: {}};

    if(!name) err.error.message1 = "Please provide your name";
    if(!password) err.error.message2 = "Please provide a password (greater than 8 characters)";
    else if(!confirm_password) err.error.message3 = "Please confirm your password";
    else if(password !== confirm_password) err.error.message4 = "Passwords do not match";
    else if(password.length <= 8) err.error.message5 = "Password must have at least 9 characters";

    if(Object.keys(err.error).length > 0){
      return err;
    }
    return Object.freeze({
      getUser_id: () => user_id,
      getName: () => name,
      getTimestamp_created: () => timestamp_created,
      getPassword: () => password
    });
  }
}
