import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { EvalIntroPage } from "../pages/eval-intro/eval-intro";
import { Screen1Page } from "../pages/screen1/screen1";
import { Screen2Page } from "../pages/screen2/screen2";
import { CasingPage } from "../pages/casing/casing";
import { ChargingPage } from "../pages/charging/charging";
import { HeadsetPage } from "../pages/headset/headset";
import { EarpiecePage } from "../pages/earpiece/earpiece";
import { MouthpiecePage } from "../pages/mouthpiece/mouthpiece";
import { NetworkPage } from "../pages/network/network";
import { KeyboardPage } from "../pages/keyboard/keyboard";
import { CameraPage } from "../pages/camera/camera";
import { CameraglassPage } from "../pages/cameraglass/cameraglass";
import { ButtonsPage } from "../pages/buttons/buttons";
import { BatteryPage } from "../pages/battery/battery";
import { VibrationPage } from "../pages/vibration/vibration";
import { TemperaturePage } from "../pages/temperature/temperature";
import { FingerprintPage } from "../pages/fingerprint/fingerprint";
import { DeviceAgePage } from "../pages/device-age/device-age";
import { NewAccessoriesPage } from "../pages/new-accessories/new-accessories";
import { SummaryPage } from "../pages/summary/summary";
import {ApiCalls} from "../providers/api-calls";
import {LocationsPage} from "../pages/locations/locations";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EvalIntroPage,
    Screen1Page,
    Screen2Page,
    CasingPage,
    ChargingPage,
    HeadsetPage,
    EarpiecePage,
    MouthpiecePage,
    NetworkPage,
    KeyboardPage,
    CameraPage,
    CameraglassPage,
    ButtonsPage,
    BatteryPage,
    VibrationPage,
    TemperaturePage,
    FingerprintPage,
    DeviceAgePage,
    NewAccessoriesPage,
    SummaryPage,
    LocationsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EvalIntroPage,
    Screen1Page,
    Screen2Page,
    CasingPage,
    ChargingPage,
    HeadsetPage,
    EarpiecePage,
    MouthpiecePage,
    NetworkPage,
    KeyboardPage,
    CameraPage,
    CameraglassPage,
    ButtonsPage,
    BatteryPage,
    VibrationPage,
    TemperaturePage,
    FingerprintPage,
    DeviceAgePage,
    NewAccessoriesPage,
    SummaryPage,
    LocationsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},ApiCalls]
})
export class AppModule {}
