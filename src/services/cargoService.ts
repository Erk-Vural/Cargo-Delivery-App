import {Cargo} from "../models/cargoModel";


// Api to communicate with cloud DB

export function createCargo(name:string,locX:string,locY:string,del:boolean, callback:any){
    const cargo = new Cargo({
        clientName: name,
        locationX: locX,
        locationY:locY,
        delivered:del
    });
    
    cargo.save((err:any,result:any) =>{
        if (err){
            return callback(err);
        }
        else{
            return callback(err, result);
        }
    });
}


export function findCargos(callback:any ){

    Cargo.find((err:any,result:any) =>{
        if (err){
            return callback(err);
        }
        else{
            return callback(err, result);
        }
    });
}

export async function updateCargo(name: string, del: string, callback:any) {
    const filter = { clientName: name };
    const update = { delivered: del };
  
    Cargo.findOneAndUpdate(
      filter,
      update,
      { upsert: false },
      function (err: any, user: any) {
        if (err) {
          return callback(err);
        }
        if (!user) {
          return callback(null,false);
        } else {
          return callback(null,true);
        }
      }
    );
  }