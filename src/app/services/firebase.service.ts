import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/compat/firestore';

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

  


}
