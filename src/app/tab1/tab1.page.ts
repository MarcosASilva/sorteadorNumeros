import { Component } from '@angular/core';

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
  numSorteado = 0
  modo = 'simples'
  numLoteria = []
  constructor() {}


  sortear = () => {
    if(this.modo==='mega'||this.modo==='quina'){
      return this.sortearLoteria();
    }

    let min = Math.ceil(this.numInicial);
    
    let max = Math.floor(this.numFinal);
   
    this.numSorteado =  Math.floor(Math.random() * (max - min)) + min;
    this.sorteado = true
    
  }
  sortearLoteria = () => {
    this.numLoteria = []
    let min = Math.ceil(this.numInicialLoteria );
    let max = Math.floor(this.numFinalLoteria + 1);
    let x = 0
    if(this.modo==='mega'){
       x = 60
    }else{
       x = 5
    }

    for(let i=0;i< x;i++){

      let num =  Math.floor(Math.random() * (max - min)) + min;
      while(this.numLoteria.includes(num)){
        num =  Math.floor(Math.random() * (max - min)) + min;
      }
      this.numLoteria.push(num)
    }
    this.sorteado = true
    this.numLoteria.sort((a,b) => {
      return a - b;
    })
    console.log(this.numLoteria);
    
    
  }
}
