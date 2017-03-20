import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Diagnostic, Camera} from "ionic-native";
import {CameraglassPage} from "../cameraglass/cameraglass";
import {VibrationPage} from "../vibration/vibration";

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  hasCamera: boolean = false;
  base64Image: string;
  proofTaken: boolean = false;
  error: boolean = false;

  constructor(public navCtrl: NavController) {
    Diagnostic.isCameraPresent().then((result) => {
      this.base64Image = "https://placehold.it/150x150";
      this.hasCamera = result;
      console.log(this.hasCamera);
      if(this.hasCamera === false){
        localStorage.setItem('camera','1');
        setTimeout(()=>{
          this.navCtrl.push(VibrationPage);
        },5000);
      }
    });
  }

  ionViewDidLoad() {

  }

  public takePicture() {
    Camera.getPicture({
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: false
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.proofTaken = true;
      localStorage.setItem('camera','3');
      localStorage.setItem('camera_proof',this.base64Image);
      setTimeout(()=>{
        this.navCtrl.push(VibrationPage);
      },2000);
    }, error => {
      localStorage.setItem('camera','1');
      this.error = true;
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  nextStage(){
    //this.navCtrl.push(CameraglassPage);
    this.navCtrl.push(VibrationPage);
  }

}
