import {Cargo} from "../models/cargoModel";


// Api to communicate with cloud DB

export function createCargo(name:string,locX:string,locY:string, callback:any){
    const cargo = new Cargo({
        clientName: name,
        locationX: locX,
        locationY:locY
    });
    
    cargo.save(function(err:any,result:any){
        if (err){
            return(err);
        }
        else{
            console.log(result)
        }
    });
}