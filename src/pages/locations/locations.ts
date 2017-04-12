import { Component } from '@angular/core';
import {NavController, LoadingController, Platform} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import {ApiCalls} from "../../providers/api-calls";

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {

  shops: any;
  show_success: boolean = false;

  constructor(public navCtrl: NavController, public apicall: ApiCalls, public loadingCtrl: LoadingController, public platform: Platform) {}

  ionViewDidLoad() {
    this.getLocationsClosest();
  }

  getLocationsClosest(){
    this.platform.ready().then(() => {
      let loading = this.loadingCtrl.create({
        content: 'Getting closest locations...'
      });

      loading.present();

      Geolocation.getCurrentPosition({enableHighAccuracy:false}).then((resp) => {
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
      });
    });
  }

  exitApp(){
    navigator['app'].exitApp();
  }

}
