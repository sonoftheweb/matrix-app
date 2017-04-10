import { Component } from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {HomePage} from "../home/home";
import { Geolocation } from 'ionic-native';
import {ApiCalls} from "../../providers/api-calls";

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {

  shops: any;
  show_success: boolean = false;

  constructor(public navCtrl: NavController, public apicall: ApiCalls, public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    this.getLocationsClosest();
  }

  getLocationsClosest(){
    let loading = this.loadingCtrl.create({
      content: 'Getting closest locations...'
    });

    loading.present();

    Geolocation.getCurrentPosition().then((resp) => {
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
  }

  exitApp(){
    navigator['app'].exitApp();
  }

}
