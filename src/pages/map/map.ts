import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { GoogleMapPage } from '../google-map/google-map';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  coords: {latitude: number, longitude: number};

  constructor(
      public navCtrl: NavController,
      public modalCtrl: ModalController,
      public geolocation: Geolocation,
      public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad(){

    let options: GeolocationOptions = {
      enableHighAccuracy: true,
      timeout: 30000
    }

    let loader = this.loadingCtrl.create({
      content: 'Getting current location'
    });
    loader.present()
    
    this.geolocation.getCurrentPosition(options).then((resp) => {
      
      let response: any = resp;
      this.coords = response.coords;
      console.log(this.coords);
      loader.dismiss();

     }).catch((error) => {
       loader.dismiss();
       console.log('Error getting location', error);
     });
  }

  goToGMap(){
    let modal = this.modalCtrl.create(GoogleMapPage, {item: this.coords});
    modal.present();
  }
  
}
