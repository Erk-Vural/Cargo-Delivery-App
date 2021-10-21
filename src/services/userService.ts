import {DBconnect} from "../DBconnect";
import {User} from "../models/userModel";

DBconnect();


// Api to communicate with cloud DB
export async function findUser(uss: string, pass: string) {
  const data = {
    username: uss,
    password: pass,
  };

  return await User.findOne(data, function (err: any, user: any) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      console.log("Username or password is invalid");
    } else {
      console.log("Logged in");
    }
  });
}

export async function addUser(uss: string, pass: string) {
  const filter = { username: uss, password: pass };
  const newUser = { username: uss, password: pass };

  User.findOneAndUpdate(
    filter,
    newUser,
    { upsert: true },
    function (err: any, doc: any) {
      if (err) {
        console.log(err);
      }
      if (doc === null) {
        console.log("User doesn't exist, adding new user");
      } else {
        console.log("User found try to login");
      }
    }
  );
}

export async function updateUser(uss: string, pass: string) {
  const filter = { username: uss };
  const update = { password: pass };

  User.findOneAndUpdate(
    filter,
    update,
    { upsert: false },
    function (err: any, doc: any) {
      if (err) {
        console.log("Can't update the password");
      }
      if (doc === null) {
        console.log("User doesn't exist.");
      } else {
        console.log("Succesfully updated the password");
      }
    }
  );
}
