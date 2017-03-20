import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewAccessoriesPage} from "../new-accessories/new-accessories";

@Component({
  selector: 'page-device-age',
  templateUrl: 'device-age.html'
})
export class DeviceAgePage {

  displayButton: boolean = false;
  device_age: string;
  device_ageScore: string;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {}

  onSel(){
    if(this.device_age == '1'){
      this.device_ageScore = '3';
    }else if(this.device_age == '4'){
      this.device_ageScore = '2';
    }else{
      this.device_ageScore = '1';
    }
    localStorage.setItem('device_age',this.device_ageScore);
    this.displayButton = true;
  }

  nextStage(){
    this.navCtrl.push(NewAccessoriesPage);
  }

}
