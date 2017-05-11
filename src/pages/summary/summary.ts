import { Component } from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {Screen1Page} from "../screen1/screen1";
import {ApiCalls} from "../../providers/api-calls";
import {LocationsPage} from "../locations/locations";

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {

  screen: string = 'Bad';
  casing: string = 'Broken';
  charge: string = 'Bad';
  headset: string = 'Bad';
  earpiece: string = 'Bad';
  mouthpiece: string = 'Bad';
  network: string = 'Bad';
  camera: string = 'Bad';
  cameraProof: string = 'Bad';
  camera_glass: string = 'Broken';
  hardware_buttons: string = 'Bad';
  batteries: string = 'Bad';
  vibrate: string = 'Bad';
  temperature: string = 'Hot';
  fingerprint: string = 'None';
  device_age: string = 'A Month +';
  new_headset: string;
  new_charger: string;
  new_case: string;

  api_reply: any;
  api_submit_reply: any;
  stat: boolean = false;
  show_success: boolean = false;
  price: any;
  eval_failed: boolean = false;
  hide_summary: boolean = false;
  error: boolean = false;

  name: string;
  email: string;
  phone: string;
  location: string;
  comment: string;

  shops: any;
  show_submitbutton: boolean = false;

  constructor(public navCtrl: NavController, public apicall: ApiCalls, public loadingCtrl: LoadingController) {
    if(!!this.name){
      this.show_submitbutton = false;
    }else if(!!this.email){
      this.show_submitbutton = false;
    }else if(!!this.phone){
      this.show_submitbutton = false;
    }else if(!!this.location){
      this.show_submitbutton = false;
    }else if(!!this.comment){
      this.show_submitbutton = false;
    }else{
      this.show_submitbutton = true;
    }
  }

  ionViewDidLoad() {

    if(localStorage.getItem('screen') == '1'){
      this.screen = 'Excellent';
    }

    if(localStorage.getItem('casing') == '3'){
      this.casing = 'Clean';
    }else if(localStorage.getItem('casing') == '2'){
      this.casing = 'Rough';
    }

    if(localStorage.getItem('charger') == '1'){
      this.charge = 'Excellent';
    }

    if(localStorage.getItem('headset') == '1'){
      this.headset = 'Excellent';
    }

    if(localStorage.getItem('earpiece') == '3'){
      this.earpiece = 'Excellent';
    }else if(localStorage.getItem('earpiece') == '2'){
      this.earpiece = 'Unstable';
    }

    if(localStorage.getItem('mouthpiece') == '3'){
      this.mouthpiece = 'Excellent';
    }else if(localStorage.getItem('mouthpiece') == '2'){
      this.mouthpiece = 'Unstable';
    }

    if(localStorage.getItem('network') == '1'){
      this.network = 'Excellent';
    }

    if(localStorage.getItem('camera') == '3'){
      this.camera = 'Excellent';
      this.cameraProof = localStorage.getItem('camera_proof');
    }else if(localStorage.getItem('camera') == '2'){
      this.camera = 'Unstable';
    }

    /*if(localStorage.getItem('camera') == '3'){
      this.camera = 'Excellent';
      this.cameraProof = localStorage.getItem('camera_proof');
    }else if(localStorage.getItem('camera') == '2'){
      this.camera = 'Unstable';
    }*/

    if(localStorage.getItem('camera_glass') == '3'){
      this.camera_glass = 'Excellent';
    }else if(localStorage.getItem('camera_glass') == '2'){
      this.camera_glass = 'Cracked';
    }

    if(localStorage.getItem('hardware_buttons') == '3'){
      this.hardware_buttons = 'Excellent';
    }else if(localStorage.getItem('hardware_buttons') == '2'){
      this.hardware_buttons = 'Stiff';
    }

    if(localStorage.getItem('batteries') == '3'){
      this.batteries = 'Excellent';
    }else if(localStorage.getItem('batteries') == '2'){
      this.batteries = 'Swollen';
    }

    if(localStorage.getItem('vibrate') == '1'){
      this.vibrate = 'Works';
    }

    if(localStorage.getItem('temperature') == '3'){
      this.temperature = 'Cool';
    }else if(localStorage.getItem('temperature') == '2'){
      this.temperature = 'Unstable';
    }

    if(localStorage.getItem('fingerprint') == '3'){
      this.fingerprint = 'Excellent';
    }else if(localStorage.getItem('fingerprint') == '2'){
      this.fingerprint = 'Bad';
    }

    if(localStorage.getItem('device_age') == '3'){
      this.device_age = 'A Week Old';
    }else if(localStorage.getItem('device_age') == '2'){
      this.device_age = 'A Month Old';
    }

    this.new_headset = localStorage.getItem('new_headset');
    this.new_charger = localStorage.getItem('new_charger');
    this.new_case = localStorage.getItem('new_case');

    if(!!this.name){
      this.show_submitbutton = false;
    }else if(!!this.email){
      this.show_submitbutton = false;
    }else if(!!this.phone){
      this.show_submitbutton = false;
    }else if(!!this.location){
      this.show_submitbutton = false;
    }else if(!!this.comment){
      this.show_submitbutton = false;
    }else{
      this.show_submitbutton = true;
    }

  }

  backToBegining(){
    this.navCtrl.push(Screen1Page);
  }

  doCalc(){
    let loading = this.loadingCtrl.create({
      content: 'Calculating...'
    });

    loading.present();

    let screen = localStorage.getItem('screen');
    let casing = localStorage.getItem('casing');
    let charger = localStorage.getItem('charger');
    let headset = localStorage.getItem('headset');
    let earpiece = localStorage.getItem('earpiece');
    let mouthpiece = localStorage.getItem('mouthpiece');
    let network = localStorage.getItem('network');
    let keyboard = localStorage.getItem('keyboard');
    let camera = localStorage.getItem('camera');
    let camera_glass = localStorage.getItem('camera_glass');
    let hardware_buttons = localStorage.getItem('hardware_buttons');
    let batteries = localStorage.getItem('batteries');
    let vibrate = localStorage.getItem('vibrate');
    let temperature = localStorage.getItem('temperature');
    let fingerprint = localStorage.getItem('fingerprint');
    let device_age = localStorage.getItem('device_age');
    let new_headset = localStorage.getItem('new_headset');
    let new_charger = localStorage.getItem('new_charger');
    let new_case = localStorage.getItem('new_case');
    let manufacturer = localStorage.getItem('manufacturer');
    let model = localStorage.getItem('model');

    let obj = {
        screen: parseInt(screen),
        casing: parseInt(casing),
        charger: parseInt(charger),
      headset: parseInt(headset),
        earpiece: parseInt(earpiece),
        mouthpiece: parseInt(mouthpiece),
       network: parseInt(network),
        keyboard: parseInt(keyboard),
        camera: parseInt(camera),
        camera_glass: parseInt(camera_glass),
        hardware_buttons: parseInt(hardware_buttons),
        batteries: parseInt(batteries),
        vibrate: parseInt(vibrate),
        temperature: parseInt(temperature),
        fingerprint: parseInt(fingerprint),
        device_age: parseInt(device_age),
        new_headset: parseInt(new_headset),
        new_charger: parseInt(new_charger),
        new_case: parseInt(new_case),
        skuname: manufacturer,
        skumodel: model
    };

    /*let query_string = '?batteries='+batteries+'&camera='+camera+'&camera_glass='+camera_glass+'&casing='+casing+'&charger='+charger
      +'&device_age='+device_age+'&earpiece='+earpiece+'&fingerprint='+fingerprint+'&hardware_buttons='+hardware_buttons+'&mouthpiece='
      +mouthpiece+'&network='+network+'&new_case='+new_case+'&new_charger='+new_charger+'&new_headset='+new_headset+'&screen='+screen+'&skumodel='+model
      +'&skuname='+manufacturer+'&temperature='+temperature+'&vibrate='+vibrate+'&keyboard='+keyboard;*/

    this.apicall.runPricing(obj)
      .then(
        (data) => {
          console.log(data);
          this.api_reply = data;
          if(this.api_reply.status == 'success'){
            this.price = this.api_reply.value;
            this.stat = true;
          }else{
            this.eval_failed = true;
            this.price = '0';
          }
          this.hide_summary = true;
          setTimeout(() => {
            loading.dismiss();
          }, 1000);
        },
        (err) => {
        console.log(err);
        this.hide_summary = false;
        this.error = true;
          setTimeout(() => {
            loading.dismiss();
          }, 1000);
      });

  }

  continueSubmission(){

    let loading = this.loadingCtrl.create({
      content: 'Getting Locations...'
    });

    loading.present();

    let screen = localStorage.getItem('screen');
    let charger = localStorage.getItem('charger');
    let headset = localStorage.getItem('headset');
    let network = localStorage.getItem('network');
    let camera = localStorage.getItem('camera');
    let vibrate = localStorage.getItem('vibrate');

    let casing = localStorage.getItem('casing');
    let earpiece = localStorage.getItem('earpiece');
    let mouthpiece = localStorage.getItem('mouthpiece');
    let keyboard = localStorage.getItem('keyboard');
    let camera_glass = localStorage.getItem('camera_glass');
    let hardware_buttons = localStorage.getItem('hardware_buttons');
    let batteries = localStorage.getItem('batteries');
    let temperature = localStorage.getItem('temperature');
    let fingerprint = localStorage.getItem('fingerprint');
    let device_age = localStorage.getItem('device_age');
    let new_headset = localStorage.getItem('new_headset');
    let new_charger = localStorage.getItem('new_charger');
    let new_case = localStorage.getItem('new_case');
    let manufacturer = localStorage.getItem('manufacturer');
    let model = localStorage.getItem('model');
    let imei = localStorage.getItem('imei');
    let camera_proof = localStorage.getItem('camera_proof');

    //alert(imei);

    let obj = {
      screen: parseInt(screen),
      casing: parseInt(casing),
      charger: parseInt(charger),
      headset: parseInt(headset),
      earpiece: parseInt(earpiece),
      mouthpiece: parseInt(mouthpiece),
      network: parseInt(network),
      keyboard: parseInt(keyboard),
      camera: parseInt(camera),
      camera_proof: camera_proof,
      camera_glass: parseInt(camera_glass),
      hardware_buttons: parseInt(hardware_buttons),
      batteries: parseInt(batteries),
      vibrate: parseInt(vibrate),
      temperature: parseInt(temperature),
      fingerprint: parseInt(fingerprint),
      device_age: parseInt(device_age),
      new_headset: parseInt(new_headset),
      new_charger: parseInt(new_charger),
      new_case: parseInt(new_case),
      phonemake: manufacturer,
      phonemodel: model,
      imei: imei,
      fname: this.name,
      phone: this.phone,
      emailadd: this.email,
      location: this.location,
      comment: this.comment,
      postcost: this.price,
    };

    //console.log(obj);

    this.apicall.submitEvaluation(obj)
      .then(
        (data) => {
          console.log(data);
          this.api_submit_reply = data;
          if(this.api_submit_reply.status == 'success'){
            this.stat = false;
            this.show_success = true;
            this.navCtrl.push(LocationsPage);
          }
          setTimeout(() => {
            loading.dismiss();
          }, 1000);
        },
        (err) => {
          console.log(err);
          setTimeout(() => {
            loading.dismiss();
          }, 1000);
        });
  }



}
