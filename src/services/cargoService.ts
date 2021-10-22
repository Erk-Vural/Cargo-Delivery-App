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