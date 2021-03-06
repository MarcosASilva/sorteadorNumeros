import { DatabaseService } from './../database.service';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  numInicial = 1;
  numInicialLoteria = 1;
  numFinal = 1;
  numFinalLoteria = 60;
  sorteado = false;
  numSorteado = []
  modo = 'simples'
  numLoteria = []
  qtdNumeros = 1
  valido = true
  message = ''
  carregando = false
  repeat = true

  constructor(
    public loadingController: LoadingController, 
    private db: DatabaseService, 
    public alertController: AlertController,
    public toastController: ToastController
    ) { }


  async  sortear() {
    if (this.modo === 'mega' || this.modo === 'quina') {
      return this.sortearLoteria();
    }
    this.numSorteado = []
    let min = Math.ceil(this.numInicial);

    let max = Math.floor(this.numFinal + 1);

    // let num;
    // num =  Math.floor(Math.random() * (max - min)) + min;

    //this.sorteado= false
    const loading = await this.loadingController.create({
      message: 'Sorteando...',
      duration: 2000
    });
    await loading.present();
    for (let i = 0; i < this.qtdNumeros; i++) {

      let num = Math.floor(Math.random() * (max - min)) + min;
      /*   while (this.numSorteado.includes(num)) {
           num = Math.floor(Math.random() * (max - min)) + min;
         }*/
      this.numSorteado.push(num)
    }
    loading.dismiss()
    // this.numSorteado.push(num)
    this.sorteado = true
    console.log(this.numSorteado);


  }
  async sortearLoteria(){
    this.numLoteria = this.numSorteado = []
    let min = Math.ceil(this.numInicialLoteria);
    let max = Math.floor(this.numFinalLoteria + 1);
    let x = 0
    if (this.modo === 'mega') {

      x = 6
    } else {
      x = 5
    }
    const loading = await this.loadingController.create({
      message: 'Sorteando...',
      duration: 2000
    });
    await loading.present();
    for (let i = 0; i < x; i++) {

      let num = Math.floor(Math.random() * (max - min)) + min;
      while (this.numSorteado.includes(num)) {
        num = Math.floor(Math.random() * (max - min)) + min;
      }

      this.numSorteado.push(num)


    }
    this.sorteado = true
    this.numLoteria.sort((a, b) => {
      return a - b;
    })
    
    this.numLoteria = this.numSorteado
    loading.dismiss()
    // console.log(this.numLoteria);
    


  }

  changeInputFinal = () => {

    if (this.numFinal < this.numInicial) {
      this.valido = false
      this.message = '*O Valor Inicial não pode ser maior que o valor final'
    }
    /*else if (this.qtdNumeros > (1 + this.numFinal - this.numInicial)) {
      this.valido = false
      this.message = '*O Valor Inicial não pode ser maior que o valor final'
    }*/
    else {
      this.valido = true
    }
  }
  limpar() {
    this.sorteado = false
    this.numSorteado = this.numLoteria = []
  }
  async salvar() {
    const alert = await this.alertController.create({
      header: 'Salvar Sortieo!',
      message: 'Deseja salvar o sorteio?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
           this.db.insert(this.numSorteado)
           this.presentToastSalvo()
          }
        }
      ]
    });

    await alert.present();
  }
  async presentToastSalvo() {
    const toast = await this.toastController.create({
      message: 'Salvo com sucesso!',
      duration: 2000
    });
    toast.present();
  }
}
