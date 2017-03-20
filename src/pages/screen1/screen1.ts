import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Screen2Page } from '../screen2/screen2';
import {CasingPage} from "../casing/casing";
import {ChargingPage} from "../charging/charging";

@Component({
  selector: 'page-screen1',
  templateUrl: 'screen1.html'
})
export class Screen1Page {

  screenTouch: any;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

  }

  ionViewDidLoad() {
    this.menuCtrl.swipeEnable(false,'mainmenu');
    console.log('ionViewDidLoad Screen1Page');
  }

  updateIsCracked(screenCracked){
    this.screenTouch = false;
    if(screenCracked){
      localStorage.setItem('screen','0');
    }else{
      localStorage.setItem('screen','1');
    }
  }

  screen2(){
    this.navCtrl.push(Screen2Page);
  }

  nextStage(){
    localStorage.setItem('screen','0');
    this.navCtrl.push(ChargingPage);
  }

}
