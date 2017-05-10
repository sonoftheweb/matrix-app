import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BatteryPage} from "../battery/battery";

@Component({
  selector: 'page-buttons',
  templateUrl: 'buttons.html'
})

export class ButtonsPage {

  displayButton: boolean = false;
  hdwButtons: string;
  hdwButtonsScore: string;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {}

  onSel(){
    if(this.hdwButtons == 'excellent'){
      this.hdwButtonsScore = '3';
    }else if(this.hdwButtons == 'stiff'){
      this.hdwButtonsScore = '2';
    }else{
      this.hdwButtonsScore = '1';
    }
    localStorage.setItem('hardware_buttons',this.hdwButtonsScore);
    this.displayButton = true;
  }

  nextStage(){
    this.navCtrl.push(BatteryPage);
  }

}
