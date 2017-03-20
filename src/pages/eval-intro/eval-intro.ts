import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Screen1Page } from '../screen1/screen1';

@Component({
  selector: 'page-eval-intro',
  templateUrl: 'eval-intro.html'
})
export class EvalIntroPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvalIntroPage');
  }

  backToPrev(){
    this.navCtrl.pop();
  }

  nextStage(){
    this.navCtrl.push(Screen1Page);
  }

}
