import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {TouchID, AndroidFingerprintAuth} from "ionic-native";
import {DeviceAgePage} from "../device-age/device-age";

@Component({
  selector: 'page-fingerprint',
  templateUrl: 'fingerprint.html'
})
export class FingerprintPage {

  iosTouchAvailable: boolean = false;
  iosTouchError: any;
  androidTouchAvailable: boolean = false;
  tryAgain: boolean = false;
  wasCancelled: boolean = false;

  isIos: boolean = false;
  isAndroid: boolean = false;

  displayButton: boolean = false;
  fingerprint: string;
  fingerprintScore: string;

  constructor(public navCtrl: NavController, public platform: Platform) {

    //check if device has capabilities

    this.platform.ready().then(() => {
      if(this.platform.is('iphone')){
        this.isIos = true;
        TouchID.isAvailable().then(
          (res) => {
            this.iosTouchAvailable = true;
          }, (err) => {
            this.iosTouchAvailable = false;
            localStorage.setItem('fingerprint','3');
            this.delayedNext();
          }
        );
      }else if(this.platform.is('android')){
        this.isAndroid = true;
        /*AndroidFingerprintAuth.isAvailable()
          .then((result) => {
            if(result.isAvailable){
              this.androidTouchAvailable = true;
            }else{
              this.androidTouchAvailable = false;
              localStorage.setItem('fingerprint','3');
              // do a redirect
            }
          })*/
      }else{
        this.iosTouchAvailable = false;
        this.androidTouchAvailable = false;
        localStorage.setItem('fingerprint','3');
        this.delayedNext();
      }
    });
  }

  ionViewDidLoad() {}

  onSel(){
    if(this.fingerprint == 'excellent'){
      this.fingerprintScore = '3';
    }else if(this.fingerprint == 'bad'){
      this.fingerprintScore = '2';
    }else{
      this.fingerprintScore = '1';
    }
    localStorage.setItem('fingerprint',this.fingerprintScore);
    this.displayButton = true;
  }

  triggerFP(){
    /*if(this.platform.is('android')){
      AndroidFingerprintAuth.encrypt({ clientId: "matrix" })
        .then((result) => {
          if (result.withFingerprint) {
            localStorage.setItem('fingerprint','3');
            //do a delayed redirect
          }else if(result.withBackup) {
            localStorage.setItem('fingerprint','1');
            this.tryAgain = true;
          }
        })
        .catch((error) => {
          localStorage.setItem('fingerprint','1');
          this.tryAgain = true;
          this.wasCancelled = error === "Cancelled";
        });
    }*/

    if(this.platform.is('iphone')){
      TouchID.verifyFingerprint('Scan your fingerprint please')
        .then(
          (res) => {
            localStorage.setItem('fingerprint','3');
            this.delayedNext();
          },
          (err) => {
            if(err == -1){
              this.iosTouchError = 'Your attempt to scan failed three times';
              localStorage.setItem('fingerprint','2');
              this.delayedNext();
            }else if(err == -2 || err == -128){
              this.iosTouchError = 'You cancelled the scan attempt';
              localStorage.setItem('fingerprint','2');
            }else if(err == -3){
              this.iosTouchError = 'This test is meant for fingerprint scanning, not password tests';
              localStorage.setItem('fingerprint','2');
            }else if(err == -8){
              this.iosTouchError = 'Fingerprint is locked from too many tries';
              localStorage.setItem('fingerprint','2');
              this.delayedNext();
            }else{
              this.iosTouchError = 'Fingerprint recognition failed';
              localStorage.setItem('fingerprint','2');
            }
            this.displayButton = true;
          }
        )
    }
  }

  delayedNext(){
    setTimeout(()=>{
      this.navCtrl.push(DeviceAgePage);
    },2000);
  }

  nextStage(){
    this.navCtrl.push(DeviceAgePage);
  }

}
