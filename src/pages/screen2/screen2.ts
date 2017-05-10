import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ChargingPage} from "../charging/charging";

@Component({
  selector: 'page-screen2',
  templateUrl: 'screen2.html'
})
export class Screen2Page {

  swipe1Dir: string;
  swipe1Score: number = 0;
  showtestbox: boolean = true;
  displayButton: boolean = false;
  swipeExplanation: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.swipe1Dir = 'Swipe Left';
    this.swipeExplanation = 'Swipe fast across the screen from right to left on the rectangular section of the screen';
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.displayButton = true;
    }, 5000);
  }

  detectSwipe1(e){
    if(e.direction == 2 && this.swipe1Dir == 'Swipe Left'){
      this.swipe1Score++;
      this.swipe1Dir = 'Swipe Right';
      this.swipeExplanation = 'Swipe fast across the screen from left to right on the rectangular section of the screen';
    }
    if(e.direction == 4 && this.swipe1Dir == 'Swipe Right'){
      this.swipe1Score++;
    }
    if(this.swipe1Score == 2){
      localStorage.setItem('screen','1');
      this.navCtrl.push(ChargingPage);
    }
  }

  restartTest(){
    this.swipe1Dir = 'Swipe Left';
    this.swipe1Score = 0;
  }

  nextStage(){
    localStorage.setItem('screen','0');
    //this.navCtrl.push(CasingPage);
    this.navCtrl.push(ChargingPage);
  }

}
