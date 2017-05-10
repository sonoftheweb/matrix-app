import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Vibration, DeviceMotion, DeviceMotionAccelerationData} from "ionic-native";
import {CasingPage} from "../casing/casing";

@Component({
  selector: 'page-vibration',
  templateUrl: 'vibration.html'
})
export class VibrationPage {

  accelWatch: any;
  flat: boolean = false;
  cx: any;
  cy: any;
  cz: any;
  vibrated: boolean = false;
  rerun: boolean = false;

  constructor(public navCtrl: NavController) {
    localStorage.setItem('vibrate','0');
    localStorage.setItem('vbstart','0');

    setTimeout(()=>{
      this.accelWatch = DeviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
        this.cx = acceleration.x;
        this.cy = acceleration.y;
        this.cz = acceleration.z;
        console.log(acceleration);
        if(this.cz > 30){
          if(localStorage.getItem('vbstart') == '0'){
            this.flat = false;
          }
        }else{
          let acel = String(this.cz);
          localStorage.setItem('isFlatAcel',acel);
          this.flat = true;
          console.log('I am flat');
        }
      });
    },2000);
  }

  ionViewDidLoad() {}

  runVibrate(){
    localStorage.setItem('vbstart','1');
    Vibration.vibrate(3000);
    DeviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);
        let prevAcel = localStorage.getItem('isFlatAcel');
        let prevAcel2 = parseInt(prevAcel);
        if(acceleration.z > prevAcel2){
          this.vibrated = true;
          this.accelWatch.unsubscribe();
          localStorage.setItem('vbstart','0');
          localStorage.setItem('vibrate','1');
          setTimeout(()=>{
            //next page
            this.navCtrl.push(CasingPage);
          },5000);
        }else{
          localStorage.setItem('vbstart','0');
          this.vibrated = false;
          this.rerun = true;
        }
      }
    );
  }

  nextStage(){
    this.accelWatch.unsubscribe();
    this.navCtrl.push(CasingPage);
  }

}
