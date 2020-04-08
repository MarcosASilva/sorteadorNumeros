import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {
  numeros: Numeros[] = []
  constructor(public loadingController: LoadingController,private storage: Storage) {
      this.loading()
      storage.forEach((value,key,iterationNumber) => {
        let num = new Numeros()
        num.key = key
        num.numeros = value
        console.log(num);
        
        this.numeros.push(num)
        
      })
  }
  async loading(){
    const loading = await this.loadingController.create({
      message: 'Sorteando...',
      duration: 2000
    });
    await loading.present()
    
  }

}
export class Numeros{
  numeros = []
  key

}