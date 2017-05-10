import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {KeyboardPage} from "../keyboard/keyboard";

@Component({
  selector: 'page-mouthpiece',
  templateUrl: 'mouthpiece.html'
})
export class MouthpiecePage {

  displayButton: boolean = false;
  mouthpiece: any;
  mpScore: string = '0';

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {}

  onSel(){
    if(this.mouthpiece == 'excellent'){
      this.mpScore = '3';
    }else if(this.mouthpiece == 'unstable'){
      this.mpScore = '2';
    }else{
      this.mpScore = '1';
    }
    localStorage.setItem('mouthpiece',this.mpScore);
    this.displayButton = true;
  }

  nextStage(){
    this.navCtrl.push(KeyboardPage);
  }

}
