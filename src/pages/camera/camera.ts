import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  myImage: any;
  constructor(public navCtrl: NavController, 
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public socialSharing: SocialSharing
  ) {
  }

  getImage(){
    //1. user make selection
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Get image from..',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.takePicture('camera');
          }
        },{
          text: 'Gallery',
          handler: () => {
              this.takePicture('gallery');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

    //2. Get image from the selection

  }

  takePicture(source){
    let pictureSource: any;

    if(source == 'camera'){
      pictureSource = this.camera.PictureSourceType.CAMERA;
    } else {
      pictureSource = this.camera.PictureSourceType.PHOTOLIBRARY;
    }

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: pictureSource,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.myImage = base64Image;
    }, (err) => {
     // Handle error
    });

  }

  share(){
    let options = {
      message: 'Ionic Framework Training',
      subject: 'Sharing Function',
      files: [this.myImage],
      url: 'http://www.caspian.my/'
    }

    this.socialSharing.shareWithOptions(options).then(res => {
      console.log('sharing successful', res);
    }, err => {
      console.log('sharing failed', err);
    });
  }
  
}
