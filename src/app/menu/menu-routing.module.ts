import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [{
      path: 'producto',
      loadChildren: () => import('../producto/producto.module').then( m => m.ProductoPageModule)
    },
    {
      path: 'ordenes',
      loadChildren: () => import('../ordenes/ordenes.module').then( m => m.OrdenesPageModule)
    },
    {
      path: 'registro',
      loadChildren: () => import('../registro/registro.module').then( m => m.RegistroPageModule)
    },
    {
      path: 'lista',
      loadChildren: () => import('../lista/lista.module').then( m => m.ListaPageModule)
    },
    {
      path: 'reportes',
      loadChildren: () => import('../reportes/reportes.module').then( m => m.ReportesPageModule)
    },
    {
      path: 'inicio',
      loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}

