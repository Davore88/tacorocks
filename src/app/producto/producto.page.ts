import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { productoI } from '../models/producto';
import { UtileriaService } from '../services/utileria.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  constructor(private firestore:FirebaseService,private util:UtileriaService) { }

  ngOnInit() {
  }

  data : productoI ={
       nombre:"",
      cantidad:null,
      precio:null,
      id:""
  }
  listado: any = [];


  getProducts(){
     this.firestore.getCollection<productoI>('Productos').subscribe(res =>{
      this.listado =res;
    })
  }

  getOneProduct(prod:productoI){
console.log('editar -> ',prod)
     this.data =prod;
   }
 
  createProduct(txtNombre: any, txtCantidad: any, txtPrecio: any,txtId:any){
    this.util.showLoading("Guardando producto")
   
    const path= 'Productos';
    this.firestore.createDocument(this.data,path,txtId.value).then(
      ()=>{
        this.util.closeLoading();
        this.util.presentToast("Guardado con exito");

    })
  }
   async deleteProduct(prod:productoI){
  const res=  this.util.presentAlert('Alerta','Seguro que desea eliminar?')

   if (res) {
    const path ='Productos'
   await this.firestore.deleteDoc(path, prod.id);
   this.util.presentToast('Eliminado con exito');
   }
  }

}
