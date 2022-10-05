import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnDestroy,OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { product } from './model/Products';
import { ProductsService } from './Service/products.service';

import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'dataproject';
  allProducts : product[]=[];
  isFetching:boolean =false;
  editMode:boolean=false;
  classMode:boolean=false;
  CurrentProductId:string;
  errorMessage:string=null;
  errorSub:Subscription
  //////
  

 @ViewChild('productsForm',) form:NgForm;
 
constructor(private productsService:ProductsService,private http:HttpClient ){
}
 
ngOnInit(){
this.fetchProdeucts();
this.errorSub= this.productsService.error.subscribe((message)=>{
this.errorMessage=message;
})
}
onProductFetch(){
     this.fetchProdeucts()
}
  onProductCreate(products:{
    pName:string,
    desc:string,
    price:string
  }){
    if(!this.editMode){
      this.productsService.createProducts(products);
    }
    else{
      this.productsService.updateProduct(this.CurrentProductId,products)
      setTimeout(() => {
        this.fetchProdeucts()
      },1000);
    }
    
setTimeout(() => {
  this.fetchProdeucts()
},1000);
  }
 private fetchProdeucts(){
  this.isFetching=true
this.productsService.fetchProducts().subscribe((products)=>{
  this.allProducts=products;
  this.isFetching=false;
},(err)=>{
this.errorMessage=err.message;
})
  }
  onDeleteProduct(id:string){
this.productsService.onDeleteProduct(id);
setTimeout(() => {
  this.fetchProdeucts()
},1000);
  }
  onDeleteAllProduct(){
  this.productsService.onDeleteAllProduct()
  setTimeout(() => {
    this.fetchProdeucts()
  },1000);
      }
      onEditClicked(id:string){
        this.CurrentProductId=id;
//Get the product based on id
let currentProduct= this.allProducts.find((p)=>{return p.id ===id});
// console.log(this.form);
//Populate the form with the product details
this.form.setValue({
pName:currentProduct.pName,
desc:currentProduct.desc,
price:currentProduct.price
});
//Chang the boutton value to update product
this.editMode=true;
this.classMode=true
      }
     ngOnDestroy(): void {
   this.errorSub.unsubscribe();
  }
  // fetchEmails(){
  //   const header =new HttpHeaders()
  //   .set('content-type','application/json')
  //   .set('Access-Control-Allow-Origin','*')
  //     return this.http.get<{[key:string]:Emails}>('https://signinapi-99884-default-rtdb.firebaseio.com/Emails.json',
  //                                               {'headers':header})
  //      .pipe(map((res)=>{
  //        const Emails=[];
  //  for(const key in res){
  //    if(res.hasOwnProperty(key)){
  //     Emails.push({...res[key], id:key})
  //    }
   
  //  }
  //  return Emails;
  //      }),catchError((err)=>{
  //        return throwError(err);
  //        //writ the logic for logging error
  //      }))
  //      .subscribe((Emails)=> {
  //        console.log(Emails);
  //      });
  //  }
  // createEmail(Emails:{
  //   Email:string;
  //   Password:string;}){ 
  //     // if(''){
        
  //     // }
  //   const headers=new HttpHeaders({'myHeader':'procademy'});
  //   this.http.get<{Emails:string}>('https://signinapi-99884-default-rtdb.firebaseio.com/Emails.json'
  //  )
  //   .subscribe((res)=>{
  //   console.log(res,res.Emails)
  //   },(err)=>{
  //     // this.error.next(err.message);
  
  //   })
  
  //   // setTimeout(() => {     
  //   // },1000);;;
  // }
  
}
