import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private firestore: AngularFirestore
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() { }

  async ingresar() {
    var f = this.formularioLogin.value;

    // Consultar Firestore para encontrar el usuario
    try {
      const usuarioSnapshot = await this.firestore.collection('usuarios', ref =>
        ref.where('nombre', '==', f.nombre).where('password', '==', f.password)
      ).get().toPromise();

      if (!usuarioSnapshot.empty) {
        // Usuario encontrado, iniciar sesión
        localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateRoot('menu/inicio');
      } else {
        // Usuario no encontrado o credenciales incorrectas
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos que ingresaste son incorrectos.',
          buttons: ['Aceptar']
        });

        await alert.present();
      }
    } catch (error) {
      // Error al consultar Firestore
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al intentar iniciar sesión.',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }

}

