import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ordenI } from '../models/orden';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fireStore:AngularFirestore) { }

  createDocument(data:any,nameCollection:string,id:string){
    const collection =this.fireStore.collection(nameCollection)
    return collection.doc(id).set(data);

  }

  readCollection(nameCollection:string){
    console.log("leyendo collection desde firestore")
    this.fireStore.collection(nameCollection).valueChanges().subscribe( (res)=>
    {
      console.log('res ->',res);
    })
  }

  getCollection<tipo>(path:string){
   const collection= this.fireStore.collection<tipo>(path);
   return collection.valueChanges();
  }

  deleteDoc(path:string,id:string){
    return this.fireStore.collection(path).doc(id).delete();
  }
  getSalesByDateRange(startDate: string, endDate: string): Observable<ordenI[]> {
    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate)
    return this.fireStore.collection<ordenI>('Ordenes', ref =>
      ref.where('fecha', '>=', dateStart).where('fecha', '<=', dateEnd)
    ).valueChanges();
  }
}
