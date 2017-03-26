import { Component } from '@angular/core';
import {NavController, Platform, LoadingController} from 'ionic-angular';
import { Device } from 'ionic-native';
import { EvalIntroPage } from '../eval-intro/eval-intro';
import { ApiCalls } from "../../providers/api-calls";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  uuid: string;
  model: string;
  ost_ype: string;
  os_version: string;
  manufacturer: string;
  serial_number: string;
  is_android: boolean = false;
  imei: string;
  intervals: any;

  hd: any;
  start_evaluation: boolean = false;
  explain: boolean = false;
  reason: string;

  constructor(public navCtrl: NavController, public platform: Platform, public apicall: ApiCalls, public loadingCtrl: LoadingController) {

    localStorage.clear();

    this.platform.ready().then(()=>{
      this.uuid = Device.uuid;
      this.model = Device.model;
      this.ost_ype = Device.platform;
      this.os_version = Device.version;
      this.manufacturer = Device.manufacturer;
      this.serial_number = Device.serial;

      localStorage.setItem('uuid',this.uuid);
      localStorage.setItem('manufacturer',this.manufacturer);
      localStorage.setItem('model',this.model);
      localStorage.setItem('ost_ype',this.ost_ype);
      localStorage.setItem('os_version',this.os_version);
      localStorage.setItem('serial_number',this.serial_number);

      if(this.platform.is('android')) {
        (<any>window).plugins.imeiplugin.getImei(imei => {
          localStorage.setItem('imei',imei);
          this.imei = localStorage.getItem('imei');
          this.is_android = true;
        });
      }

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();


      this.apicall.apiCall('has/'+this.manufacturer+'/'+this.model)
        .then((data)=>{
          this.hd = data;
          if(this.hd.has_device == 1){
            this.start_evaluation = true;
            this.explain = false;
            setTimeout(() => {
              loading.dismiss();
            }, 1000);
          }else{
            this.start_evaluation = false;
            this.explain = true;
            this.reason = this.hd.reason;
            setTimeout(() => {
              loading.dismiss();
            }, 1000);
          }
        });

    });
  }

  start_eval(){
    clearInterval(this.intervals);
    this.navCtrl.push(EvalIntroPage);
  }

  ionViewDidLoad() {
    /*this.intervals = setInterval(function () {
      if(this.platform.is('android')) {
        this.imei = localStorage.getItem('imei');
        this.is_android = true;
      }
    },1000);*/
  }

}
