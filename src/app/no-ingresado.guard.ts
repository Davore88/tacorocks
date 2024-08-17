import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoIngresadoGuard implements CanActivate {

  constructor(
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const user = this.firestore.collection('usuarios', ref => 
      ref.where('activo', '==', true) // Suponiendo que tienes un campo que indica si el usuario está activo o autenticado
    ).valueChanges();

    return user.pipe(
      map(users => {
        if (users.length > 0) {
          this.navCtrl.navigateRoot('menu/inicio');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}

