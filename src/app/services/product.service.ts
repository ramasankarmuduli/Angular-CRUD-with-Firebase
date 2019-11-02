import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  create(product) {
    const productCollection = this.db.collection('products');
    productCollection.add(product);
  }

  getAll() {
    return this.db.collection('products').snapshotChanges();
  }

  edit(key, product) {
    const productCollection = this.db.collection('products');
    return productCollection.doc(key).update(product);
  }

  delete(key) {
    return this.db.collection('products').doc(key).delete();
  }
}
