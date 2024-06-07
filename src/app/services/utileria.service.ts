import { Injectable } from '@angular/core';
import { LoadingController, ToastController,AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtileriaService {
loading:any;
  constructor(public toastController:ToastController,public loadingCtr:LoadingController,public alerCtr:AlertController) { }

  async presentToast(mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration:200
    });
    toast.present();
  }

  async showLoading(mensaje:string) {
    this.loading = await this.loadingCtr.create({
      message: mensaje,
      duration: 3000,
    });

    this.loading.present();
  }

  async closeLoading(){
    await this.loading.dismiss();
  }

 async  presentAlert(text:string,subtitulo:string){

    let aceptar = false;
    const alert = await this.alerCtr.create({
      cssClass: 'my-custom-class',
      header: text,
      subHeader: subtitulo,
      buttons:[
       {text: 'Cancelar',
       role:'cancel',
       cssClass:'secondary'
     } ,{
      text:'OK',
      handler: ()=>{
        aceptar = true;
      }
     }
    ]
    });
    await alert.present();
    await alert.onDidDismiss();
    return aceptar

  }
}
