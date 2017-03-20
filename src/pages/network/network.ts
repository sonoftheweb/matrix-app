import { Component } from '@angular/core';
import {NavController, AlertController, Platform} from 'ionic-angular';
import { Network } from 'ionic-native';
import {KeyboardPage} from "../keyboard/keyboard";
import {CameraPage} from "../camera/camera";

@Component({
  selector: 'page-network',
  templateUrl: 'network.html'
})
export class NetworkPage {

  timer: any;
  displayButton: boolean = false;
  ntw: boolean = false;
  ntwType: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform) {}

  ionViewDidLoad() {
    this.checkNetwork()
  }

  checkNetwork() {
    this.platform.ready().then(() => {
      this.timer = setInterval(()=> {
        setTimeout(() => {
          if (Network.type != 'none') {
            localStorage.setItem('network', '1');
            this.ntw = true;
            this.displayButton = false;
            this.ntwType = Network.type;
            setTimeout(()=>{
              clearInterval(this.timer);
              //this.navCtrl.push(KeyboardPage);
              this.navCtrl.push(CameraPage);
            },2000);
          } else {
            localStorage.setItem('network', '0');
            this.displayButton = true;
            this.ntw = false;
          }
        }, 2000);
      },5000);
    });
  }

  ionViewWillLeave() {
    clearInterval(this.timer);
  }

}
