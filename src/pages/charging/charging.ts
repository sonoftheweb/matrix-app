import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HeadsetPage } from '../../pages/headset/headset';
import {BatteryStatus} from "ionic-native";

@Component({
  selector: 'page-charging',
  templateUrl: 'charging.html'
})
export class ChargingPage {

  nextButton: boolean = false;
  isCharging: boolean = false;
  isNotCharging: boolean = false;
  subscription: any;
  timer: any;

  constructor(public navCtrl: NavController, public loading: LoadingController) {}

  ionViewDidLoad() {

    this.setChargingDetected();

    this.timer = setInterval(()=>{
      if(localStorage.getItem('charger') == '1'){
        this.isCharging = true;
        this.isNotCharging = false;
        this.nextButton = false;
        setTimeout(()=>{
          this.navCtrl.push(HeadsetPage);
        },2000);
      }else{
        this.isCharging = false;
        this.isNotCharging = true;
        this.nextButton = true;
      }
    }, 5000);
  }

  setChargingDetected(){
    this.subscription = BatteryStatus.onChange().subscribe(
      (status) => {
        if(status.isPlugged){
            localStorage.setItem('charger','1');
        }else{
          localStorage.setItem('charger','0');
        }
      }
    );
  }

  nextStage(){
    clearInterval(this.timer);
    this.subscription.unsubscribe();
    this.navCtrl.push(HeadsetPage);
  }

  ionViewWillLeave() {
    clearInterval(this.timer);
    this.subscription.unsubscribe();
  }

}
