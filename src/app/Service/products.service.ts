import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { product } from '../model/Products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
error=new Subject<string>();
  constructor(private http:HttpClient) { }
  createProducts(products:{
    pName:string,
    desc:string,
    price:string}){
    const headers=new HttpHeaders({'myHeader':'procademy'});
    this.http.post<{name:string}>('https://angulerbs-default-rtdb.firebaseio.com/products.json',
    products,{headers:headers})
    .subscribe((res)=>{
    console.log(res)
    },(err)=>{
      this.error.next(err.message);

    })

    setTimeout(() => {     
    },1000);;;
}
fetchProducts(){
 const header =new HttpHeaders()
 .set('content-type','application/json')
 .set('Access-Control-Allow-Origin','*')
   return this.http.get<{[key:string]:product}>('https://angulerbs-default-rtdb.firebaseio.com/products.json',
                                             {'headers':header})
    .pipe(map((res)=>{
      const products=[];
for(const key in res){
  if(res.hasOwnProperty(key)){
    products.push({...res[key], id:key})
  }

}
return products;
    }),catchError((err)=>{
      return throwError(err);
      //writ the logic for logging error
    }))
    // .subscribe((Products)=> {
    //   console.log(Products);
    // });
}
onDeleteProduct(id:string){
  // const header =new HttpHeaders()
  // header=header.append('myHeader1','Value1')

  this.http.delete('https://angulerbs-default-rtdb.firebaseio.com/products/'+id+'.json')
  .subscribe();
}
onDeleteAllProduct(){
  this.http.delete('https://angulerbs-default-rtdb.firebaseio.com/products.json')
  .subscribe();
}
updateProduct(id: string,value:product){
  this.http.put('https://angulerbs-default-rtdb.firebaseio.com/products/'+id+'.json',value)
.subscribe()
}
///////////////////////////////////////
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
//   const headers=new HttpHeaders({'myHeader':'procademy'});
//   this.http.post<{name:string}>('https://signinapi-99884-default-rtdb.firebaseio.com/Emails.json',
//   Emails,{headers:headers})
//   .subscribe((res)=>{
//   console.log(res)
//   },(err)=>{
//     this.error.next(err.message);

//   })

//   // setTimeout(() => {     
//   // },1000);;;
// }

}