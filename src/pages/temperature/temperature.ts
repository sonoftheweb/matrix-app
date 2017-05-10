import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FingerprintPage} from "../fingerprint/fingerprint";
import {EarpiecePage} from "../earpiece/earpiece";

@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html'
})
export class TemperaturePage {

  displayButton: boolean = false;
  temperature: string;
  temperatureScore: string;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {}

  onSel(){
    if(this.temperature == 'cool'){
      this.temperatureScore = '3';
    }else if(this.temperature == 'unstable'){
      this.temperatureScore = '2';
    }else{
      this.temperatureScore = '1';
    }
    localStorage.setItem('temperature',this.temperatureScore);
    this.displayButton = true;
  }

  nextStage(){
    this.navCtrl.push(EarpiecePage);
  }

}
