import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MouthpiecePage } from "../../pages/mouthpiece/mouthpiece";

@Component({
  selector: 'page-earpiece',
  templateUrl: 'earpiece.html'
})
export class EarpiecePage {

  displayButton: boolean = false;
  earpiece: any;
  epScore: string = '0';

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {}

  onSel(){
    if(this.earpiece == 'excellent'){
      this.epScore = '3';
    }else if(this.earpiece == 'unstable'){
      this.epScore = '2';
    }else{
      this.epScore = '1';
    }
    localStorage.setItem('earpiece',this.epScore);
    this.displayButton = true;
  }

  nextStage(){
    this.navCtrl.push(MouthpiecePage);
  }

}
