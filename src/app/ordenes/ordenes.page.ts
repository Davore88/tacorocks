import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { productoI } from '../models/producto';
import { UtileriaService } from '../services/utileria.service';
import { ordenI } from '../models/orden';


@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})
export class OrdenesPage implements OnInit {

  inputs: any[] = [];
  total: number = 0;
  listado: any = [];
  orderedProducts: any[] = [];
  selectedProduct: any;
  data : ordenI ={
    fecha:null,
   total:null,
   listaProductos:null,
   id:""
}

  constructor(private firestore:FirebaseService,private util:UtileriaService) { }

  ngOnInit() {
    this.getProducts();
  }

  addInput(): void {
    this.inputs.push({ value: '' });
  }

  removeInput(index: number): void {
    this.inputs.splice(index, 1);
  }
  calculateTotal(): void {
    this.total = this.inputs.reduce((acc, val) => acc + val, 0);
    this.data.total = this.orderedProducts.reduce((acc, val) => acc + val.precio, 0);
    this.data.fecha = new Date();
    this.data.listaProductos = this.orderedProducts;
    this.data.id = this.generateRandomId();
    this.createOrden(this.data);

  }

  getProducts(){
    this.firestore.getCollection<productoI>('Productos').subscribe(res =>{
     this.listado =res;
   })
 }

 addProduct() {
    this.orderedProducts.push(this.selectedProduct);      
}

createOrden( data: any){
  this.util.showLoading("Guardando Orden")
 
  const path= 'Ordenes';
  this.firestore.createDocument(data,path,this.generateRandomId()).then(
    ()=>{
      this.util.closeLoading();
      this.util.presentToast("Guardado con exito");

  })
}

generateRandomId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

removeItem(index: number) {
  this.orderedProducts.splice(index, 1);
}
}
