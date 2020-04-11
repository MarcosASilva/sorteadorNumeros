import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
 
  constructor(private storage: Storage) { }

  insert(numSorteados){
    let key = new Date().toUTCString();
    this.storage.set(key, numSorteados);
  }

  getAll(){
    let numeros: Numeros[] = []
    return this.storage.forEach((value, key, iterationNumber) => {
      
      let num = new Numeros()
      num.key = key
      num.numeros = value

      numeros.push(num)

    }).then(() => {
      return Promise.resolve(numeros);
    })
    
  }
}
export class Numeros {
  numeros = []
  key

}