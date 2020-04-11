import { DatabaseService } from './../database.service';
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
  show: false
  
  constructor(public loadingController: LoadingController, public db: DatabaseService) {
      this.loading()
    this.db.getAll().then((num) => {
      this.numeros = num
    })
  }
  async loading(){
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present()
    
  }
  doRefresh(event){
    this.numeros = []
    this.db.getAll().then((num) => {
      this.numeros = num
      event.target.complete();
    })


    
  }
}
export class Numeros {
  numeros = []
  key

}