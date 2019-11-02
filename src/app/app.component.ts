import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  product = {title: '', price: '', category: '', imageUrl: ''};
  productKey = '';
  products = {};
  formTitle = 'Add Product';
  
  constructor(private productService: ProductService) {
    this.productService.getAll().pipe(
      map(p => {
        return p.map( p1 => {
          return ( 
            {
              id: p1.payload.doc.id,
              category: p1.payload.doc.data()['category'],
              imageUrl : p1.payload.doc.data()['imageUrl'],
              price: p1.payload.doc.data()['price'],
              title: p1.payload.doc.data()['title']
            }            
          );
        });
      })
    ).subscribe(products => {
      this.products = products;
    })
  }

  save(product) {
    if(this.productKey !== '')
      this.productService.edit(this.productKey, this.product);
    else 
      this.productService.create(this.product);
    //this.resetProduct();
  }

  editProduct(product) {
    this.formTitle = 'Edit Product';
    this.product.title = product.title;
    this.product.price = product.price;
    this.product.category = product.category;
    this.product.imageUrl = product.imageUrl;
    this.productKey = product.id;
  }

  resetProduct() {
    this.formTitle = 'Add Product';
    this.product.title = '';
    this.product.price = '';
    this.product.category = '';
    this.product.imageUrl = '';
    this.productKey = '';
  }

  deleteProduct(pid) {
    console.log(pid);
    if(confirm("Are you sure you want to delete this product.")){
      this.productService.delete(pid);
    }
  }
}
