import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MapPage } from '../pages/map/map';
import { CameraPage } from '../pages/camera/camera';

import { HomePage } from '../pages/home/home';
import { OneSignal } from '@ionic-native/onesignal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = HomePage;

  constructor(public oneSignal: OneSignal, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //Insert your One signal id and firebase id as below:
      this.oneSignal.startInit('YOUR_ONE_SIGNAL_ID_HERE', 'YOUR_FIREBASE_ID_HERE').then(()=>{
        
      });

      this.oneSignal.getIds().then(res => {
        //oneSignal id 
        console.log(res);
      })

      this.oneSignal.handleNotificationReceived().subscribe((data) => {
        // do something when notification is received
        console.log(data);

      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });

      this.oneSignal.endInit();


    });
  }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  } goToMap(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MapPage);
  } goToCamera(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CameraPage);
  }
}
