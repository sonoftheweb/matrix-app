import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HeadsetPage } from '../../pages/headset/headset';

@Component({
  selector: 'page-charging',
  templateUrl: 'charging.html'
})
export class ChargingPage {

  nextButton: boolean = false;
  timer: any;
  isCharging: boolean = false;

  constructor(public navCtrl: NavController, public loading: LoadingController) {}

  ionViewDidLoad() {
    this.timer = setInterval(()=>{
      if(localStorage.getItem('charger') == '1'){
        this.isCharging = true;
        setTimeout(()=>{
          clearInterval(this.timer);
          this.navCtrl.push(HeadsetPage);
        },2000);
      }else{
        this.isCharging = false;
        this.nextButton = true;
      }
    }, 5000);
  }

  nextStage(){
    clearInterval(this.timer);
    this.navCtrl.push(HeadsetPage);
  }

  ionViewWillLeave() {
    clearInterval(this.timer);
  }

}
