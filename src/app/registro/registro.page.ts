import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  usuarioId: string | null = null;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private firestore: AngularFirestore,
    private route: ActivatedRoute // Inyecta ActivatedRoute
  ) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required),
      'tipoUsuario': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.usuarioId = this.route.snapshot.paramMap.get('id');
    if (this.usuarioId) {
      this.cargarUsuario(this.usuarioId);
    }
  }

  async cargarUsuario(id: string) {
    try {
      const usuarioDoc = await this.firestore.doc<any>(`usuarios/${id}`).ref.get();
      if (usuarioDoc.exists) {
        const usuario = usuarioDoc.data();
        this.formularioRegistro.patchValue({
          nombre: usuario.nombre,
          password: usuario.password,
          confirmacionPassword: usuario.password,
          tipoUsuario: usuario.tipoUsuario
        });
      }
    } catch (error) {
      console.error("Error al cargar usuario:", error);
    }
  }

  async guardar() {
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    if (f.password !== f.confirmacionPassword) {
      const alert = await this.alertController.create({
        header: 'Contraseñas no coinciden',
        message: 'Las contraseñas no coinciden, por favor verifica.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    const usuario = {
      nombre: f.nombre,
      password: f.password,
      tipoUsuario: f.tipoUsuario
    };

    try {
      if (this.usuarioId) {
        // Actualiza el usuario existente
        await this.firestore.doc(`usuarios/${this.usuarioId}`).update(usuario);
        const alert = await this.alertController.create({
          header: 'Actualización exitosa',
          message: 'Usuario actualizado correctamente',
          buttons: ['Aceptar']
        });
        await alert.present();
      } else {
        // Crea un nuevo usuario
        await this.firestore.collection('usuarios').add(usuario);
        const alert = await this.alertController.create({
          header: 'Registro exitoso',
          message: 'Usuario registrado correctamente',
          buttons: ['Aceptar']
        });
        await alert.present();
      }

      this.navCtrl.navigateRoot('lista');
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al registrar el usuario',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }
}




