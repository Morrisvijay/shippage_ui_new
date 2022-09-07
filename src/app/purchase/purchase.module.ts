import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseRequestModule } from './purchase-request/purchase-request.module';
import { LopRoutingModule } from './lop/lop-routing.module';
import { LopModule } from './lop/lop.module';
import { GrnModule } from './grn/grn.module';


@NgModule({
  declarations: [
  
    
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    PurchaseRequestModule,
    LopModule,
    GrnModule
    
    
  ]
})
export class PurchaseModule { }



