import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

declare var google: any;
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  coords: any;
  constructor(
      public navCtrl: NavController,
      public viewCtrl: ViewController,
      public navParams: NavParams
    ) {
        this.coords = this.navParams.get('item');
      }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap(){
    // 2.9993472, 101.6696125
    let latitude: number = this.coords.latitude;
    let longitude: number = this.coords.longitude;

    let latlng = new google.maps.LatLng(latitude,longitude);

    let mapOptions = {
      center: latlng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(latitude, longitude, 'You are here!');
  }

  addMarker(lat, lng, message){
    let marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(lat, lng),
      animation: google.maps.Animation.DROP,
      label: 'test marker'
    })

    let content = '<h3>' + message + '</h3>';

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  close(){
    this.viewCtrl.dismiss();
  }

  //AIzaSyDtEKdTmJ7OU4EK7zYlOaP14ygqefIOrZY
  
}
