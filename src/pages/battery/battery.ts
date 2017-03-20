import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FingerprintPage} from "../fingerprint/fingerprint";

@Component({
  selector: 'page-battery',
  templateUrl: 'battery.html'
})
export class BatteryPage {

  displayButton: boolean = false;
  battery: string;
  batteryScore: string;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {}

  onSel(){
    if(this.battery == 'excellent'){
      this.batteryScore = '3';
    }else if(this.battery == 'swollen'){
      this.batteryScore = '2';
    }else{
      this.batteryScore = '1';
    }
    localStorage.setItem('batteries',this.batteryScore);
    this.displayButton = true;
  }

  nextStage(){
    this.navCtrl.push(FingerprintPage);
  }

}
