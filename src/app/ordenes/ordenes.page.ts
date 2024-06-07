import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { productoI } from '../models/producto';

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


  constructor(private firestore:FirebaseService) { }

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
  }

  getProducts(){
    this.firestore.getCollection<productoI>('Productos').subscribe(res =>{
     this.listado =res;
   })
 }

 addProduct() {

    this.orderedProducts.push(this.selectedProduct);
  
}
}
