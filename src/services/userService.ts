import { DBconnect } from "../DBconnect";
import { User } from "../models/userModel";

DBconnect();

// Api to communicate with cloud DB

export function findUser(uss: string, pass: string, callback: any) {
  const data = {
    username: uss,
    password: pass,
  };

  User.findOne(data, function (err: any, user: any) {
    if (err) {
      return callback(err);
    }
    if (!user) {
      return callback(null, false);
    } else {
      return callback(null, true);
    }
  });
}

export async function addUser(uss: string, pass: string, callback: any) {
  const filter = { username: uss, password: pass };
  const newUser = { username: uss, password: pass };

  User.findOneAndUpdate(
    filter,
    newUser,
    { upsert: true },
    function (err: any, user: any) {
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback(null, false);
      } else {
        return callback(null, true);
      }
    }
  );
}

export async function updateUser(uss: string, pass: string, callback: any) {
  const filter = { username: uss };
  const update = { password: pass };

  User.findOneAndUpdate(
    filter,
    update,
    { upsert: false },
    function (err: any, user: any) {
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback(null, false);
      } else {
        return callback(null, true);
      }
    }
  );
}
