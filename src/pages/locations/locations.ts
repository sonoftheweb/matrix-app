import { Component } from '@angular/core';
import {NavController, LoadingController, Platform, AlertController} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import {ApiCalls} from "../../providers/api-calls";
import {Diagnostic} from "@ionic-native/diagnostic";

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {

  shops: any;
  show_success: boolean = false;

  constructor(public navCtrl: NavController,
              public apicall: ApiCalls,
              public loadingCtrl: LoadingController,
              private diagnostics: Diagnostic,
              public platform: Platform,
              private alertCtrl: AlertController) {
    this.platform.ready().then(()=> {

      //check if geolocation is enabled
      diagnostics.isLocationEnabled().then((isavail) => {
        if (!isavail) {
          this.presentConfirm();
        }
      });
    });
  }

  ionViewDidLoad() {
    this.getLocationsClosest();
  }

  getLocationsClosest(){

    this.platform.ready().then(() => {
      let loading = this.loadingCtrl.create({
        content: 'Getting closest locations...'
      });

      loading.present();

      Geolocation.getCurrentPosition({enableHighAccuracy: false, timeout: 10000, maximumAge: 3000}).then((resp) => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
        this.apicall.apiCall('locations/'+resp.coords.latitude+'/'+resp.coords.longitude)
          .then((data)=>{
            this.shops = data;
            this.show_success = true;
            setTimeout(() => {
              loading.dismiss();
            }, 1000);
          })
      }).catch((error) => {
        console.log('Error getting location', error);
        this.apicall.apiCall('locations/all')
          .then((data)=>{
          this.shops = data;
          this.show_success = true;
          setTimeout(() => {
            loading.dismiss();
          },1000);
          })
      });
    });
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Enable GPS',
      message: 'To use this application you have to enable your GPS',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.platform.exitApp();
          }
        },
        {
          text: 'Continue',
          handler: () => {
            this.loadGPSSettings();
          }
        }
      ]
    });
    alert.present();
  }

  loadGPSSettings(){
    this.diagnostics.switchToLocationSettings();
  }

  exitApp(){
    navigator['app'].exitApp();
  }

}
