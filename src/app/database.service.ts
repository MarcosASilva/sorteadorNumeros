import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
 
  constructor(private storage: Storage) { }

  insert(numSorteados){
    //let key = new Date().toUTCString();
    let key = this.makeid(7)
    this.storage.set(key, numSorteados);
  }

  getAll(){
    let numeros: Numeros[] = []
    return this.storage.forEach((value, key, iterationNumber) => {
      console.log(key);
      
      let num = new Numeros()
      num.key = key
      num.numeros = value

      numeros.push(num)

    }).then(() => {
      return Promise.resolve(numeros);
    })
    
  }
  makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
}
export class Numeros {
  numeros = []
  key

}