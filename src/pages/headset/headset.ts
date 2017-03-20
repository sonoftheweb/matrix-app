import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { EarpiecePage } from "../../pages/earpiece/earpiece";
import {NetworkPage} from "../network/network";

declare let HeadsetDetection;

@Component({
  selector: 'page-headset',
  templateUrl: 'headset.html'
})
export class HeadsetPage {

  isHeadsetPlugged: string;
  timer: any;

  constructor(public navCtrl: NavController, public platform: Platform) {
    localStorage.setItem('headset','0');
  }

  ionViewDidLoad() {

    this.setHeadSetDetected();

    this.timer = setInterval(()=>{
      if(localStorage.getItem('headset') == '1'){
        this.isHeadsetPlugged = '1';
        //clear timer
        clearInterval(this.timer);
        setTimeout(()=>{
          this.navCtrl.push(NetworkPage);
        },5000);
      }else{
        this.isHeadsetPlugged = '0';
        setTimeout(()=>{
          this.setHeadSetDetected()
        },5000);
      }
    }, 5000);
  }

  setHeadSetDetected(){
    this.platform.ready().then(() => {
      HeadsetDetection.detect(function (detected) {
        if(detected == true){
          localStorage.setItem('headset','1');
        }else{
          localStorage.setItem('headset','0');
        }
      });
    });
  }

  nextStage(){
    clearInterval(this.timer);
    //this.navCtrl.push(EarpiecePage);
    this.navCtrl.push(NetworkPage);
  }
}
