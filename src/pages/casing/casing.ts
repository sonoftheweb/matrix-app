import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TemperaturePage} from "../temperature/temperature";

@Component({
  selector: 'page-casing',
  templateUrl: 'casing.html'
})
export class CasingPage {

  displayButton: boolean = false;
  casing: any;
  caseScore: string = '0';


  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {}

  onSel(){
    if(this.casing == 'clean'){
      this.caseScore = '3';
    }else if(this.casing == 'rough'){
      this.caseScore = '2';
    }else{
      this.caseScore = '1';
    }
    localStorage.setItem('casing',this.caseScore);
    this.displayButton = true;
  }

  nextStage(){
    this.navCtrl.push(TemperaturePage);
  }

}
