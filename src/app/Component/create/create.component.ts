
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnDestroy,OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { product } from 'src/app/model/Products';
import { ProductsService } from 'src/app/Service/products.service';

import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  errorMessage:string=null;
  errorSub:Subscription
  editMode:boolean=false;
  CurrentProductId:string;
  allProducts : product[]=[];

  constructor(private productsService:ProductsService,private http:HttpClient) { }

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
     
    this.productsService.fetchProducts().subscribe((products)=>{
      this.allProducts=products;
     
    },(err)=>{
    this.errorMessage=err.message;
    })
      }


  
}
