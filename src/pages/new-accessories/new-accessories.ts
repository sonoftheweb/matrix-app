import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SummaryPage} from "../summary/summary";

@Component({
  selector: 'page-new-accessories',
  templateUrl: 'new-accessories.html'
})
export class NewAccessoriesPage {

  newHeadset: any;
  newCharger: any;
  newCase: any;

  constructor(public navCtrl: NavController) {
    localStorage.setItem('new_headset','0');
    localStorage.setItem('new_charger','0');
    localStorage.setItem('new_case','0');
  }

  ionViewDidLoad() {}

  onSel(){
    if(this.newHeadset){
      localStorage.setItem('new_headset','1');
    }else{
      localStorage.setItem('new_headset','0');
    }
    if(this.newCharger){
      localStorage.setItem('new_charger','1');
    }else{
      localStorage.setItem('new_charger','0');
    }
    if(this.newCase){
      localStorage.setItem('new_case','1');
    }else{
      localStorage.setItem('new_case','0');
    }
  }

  nextStage(){
    this.navCtrl.push(SummaryPage);
  }

}
