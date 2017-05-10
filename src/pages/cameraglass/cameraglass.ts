import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Diagnostic} from "ionic-native";
import {ButtonsPage} from "../buttons/buttons";

@Component({
  selector: 'page-cameraglass',
  templateUrl: 'cameraglass.html'
})
export class CameraglassPage {

  hasCamera: boolean = false;
  displayButton: boolean = false;
  camGlass: string;
  camGlassScore: string;

  constructor(public navCtrl: NavController) {
    Diagnostic.isCameraPresent().then((result) => {
      this.hasCamera = result;
      if(this.hasCamera === false){
        localStorage.setItem('camera_glass','1');
        setTimeout(()=>{
          this.navCtrl.push(ButtonsPage);
        },2000);
      }
    });
  }

  ionViewDidLoad() {}

  onSel(){
    if(this.camGlass == 'excellent'){
      this.camGlassScore = '3';
    }else if(this.camGlass == 'cracked'){
      this.camGlassScore = '2';
    }else{
      this.camGlassScore = '1';
    }
    localStorage.setItem('camera_glass',this.camGlassScore);
    this.displayButton = true;
  }

  nextStage(){
    this.navCtrl.push(ButtonsPage);
  }

}
