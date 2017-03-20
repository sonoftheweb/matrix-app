import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {CameraglassPage} from "../cameraglass/cameraglass";

@Component({
  selector: 'page-keyboard',
  templateUrl: 'keyboard.html'
})
export class KeyboardPage {

  noKeyboard: boolean = false;
  displayButton: boolean = false;
  keyboard: string;
  kbScore: string;

  constructor(public navCtrl: NavController, platform: Platform) {
    platform.ready().then((readySource) => {
      if(platform.height() > 480){
        this.noKeyboard = true;
        localStorage.setItem('keyboard','3');
        setTimeout(()=>{
          this.navCtrl.push(CameraglassPage);
        },3000);
      }
    });
  }

  ionViewDidLoad() {}

  onSel(){
    if(this.keyboard == 'excellent'){
      this.kbScore = '3';
    }else if(this.keyboard == 'unstable'){
      this.kbScore = '2';
    }else{
      this.kbScore = '1';
    }
    localStorage.setItem('keyboard',this.kbScore);
    this.displayButton = true;
  }

  nextStage(){
    this.navCtrl.push(CameraglassPage);
  }

}
