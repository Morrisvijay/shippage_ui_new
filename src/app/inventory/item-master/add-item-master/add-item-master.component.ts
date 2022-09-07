import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ExampleDataSource } from 'src/app/admin/employees/allEmployees/allemployees.component';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ItemMasterService } from '../item-master.service';
import { MultipleRowComponent } from 'src/app/inventory/item-master/multiple-row/multiple-row.component';
import { ItemMaster } from '../item-master.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemMasterResultBean } from '../item-master-result-bean';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item-master.component.html',
  styleUrls: ['./add-item-master.component.sass']
})
export class AddItemMasterComponent implements OnInit {
  [x: string]: any;
  docForm: FormGroup;
  itemMaster:ItemMaster;
  requestId: number;
  edit:boolean=false;
  hide3 = true;
  agree3 = false;
  itemList=[];
  dataarray=[];
  listOfItem = [];
  datas:any;
//  multipleRowComponent = new MultipleRowComponent;

  itemMasterDetailBean = {
   //vendor
    itemId:'',
    vendor:'',
    vendorItemName:'',
    vendorItemCode:'',
    itemCode: '',
    itemName:'',
    vendorminimumQty:'',
    vendorUom:'',
    deliveryLeadTime:'',
    pricingType:'',
 
    
  
  }

  constructor( private fb: FormBuilder,
    private itemMasterService : ItemMasterService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,) {
  //  this.datas=[];
    this.docForm = this.fb.group({
      itemId:[""],
      itemCode: ["", [Validators.required]],
      itemName: ["", [Validators.required]],
      itemDescription: ["", [Validators.required]],
      itemType: ["", [Validators.required]],
      itemCategory: ["", [Validators.required]],
      saleable: [""],
      purchaseable: [""],
      purchaseReq:[""],
      costingMethod:[""],
      costPrice:[""],
      warranty:[""],
      leadTime:[""],
      purchaseMethod:[""],
      pruchaseUom:[""],
      reorderLevel:[""],
      minimumQty:[""],
      maximumQty:[""],
     //GRN
       batchNo:[""], 
       mrp:[""],
       expiryDate:[""],
       manufactureDetails:[""],
      //INVENTORY
       inventoryValuation:[""], 
       issueMethod:[""],
      
       

    });
  }

  ngOnInit(): void {
  
  this.route.params.subscribe(params => {
   if(params.id!=undefined && params.id!=0){
    this.requestId = params.id;
    this.edit=true;
    //For User login Editable mode
    this.fetchDetails(this.requestId) ;

   } 
   });
  this.dataarray.push(this.itemMasterDetailBean)
 

  this.httpService.get<ItemMasterResultBean>(this.itemMasterService.itemListUrl).subscribe(
    (data) => {
      this.listOfItem = data.itemListUrl;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

   this.httpService.get<ItemMasterResultBean>(this.itemMasterService.itemListUrl).subscribe(
     (data) => {
       console.log(data);
       this.itemList = data.itemList;
     },
     (error: HttpErrorResponse) => {
       console.log(error.name + " " + error.message);
     }
    );
}



  onSubmit(){
    this.itemMaster = this.docForm.value;
    this.itemMaster.itemMasterDetailBean = this.dataarray;
    console.log(this.itemMaster);
    console.log(this.dataarray);
    this.itemMasterService.addItem(this.itemMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
      
  
    );
    this.router.navigate(['/inventory/item-master/list-item-master']);
  }
  fetchDetails(itemId: any): void {
    this.httpService.get(this.itemMasterService.editItem +"?itemMaster="+ itemId).subscribe((res: any) => {
      console.log(itemId);

      this.docForm.patchValue({
        'itemId': res.itemMasterBean.itemId,
        'itemCode': res.itemMasterBean.itemCode,
        'itemName': res.itemMasterBean.itemName,
        'itemDescription': res.itemMasterBean.itemDescription,
        'itemType': res.itemMasterBean.itemType,
        'itemCategory': res.itemMasterBean.itemCategory,
        'saleable': res.itemMasterBean.saleable,
        'purchaseable': res.itemMasterBean.purchaseable,
        'purchaseReq':res.itemMasterBean.purchaseReq,
        'costingMethod':res.itemMasterBean.costingMethod,
        'costPrice':res.itemMasterBean.costPrice,
        'warranty':res.itemMasterBean.warranty,
        'leadTime':res.itemMasterBean.leadTime,
        'purchaseMethod':res.itemMasterBean.purchaseMethod,
        'pruchaseUom':res.itemMasterBean.pruchaseUom,
        'reorderLevel':res.itemMasterBean.reorderLevel,
        'minimumQty':res.itemMasterBean.minimumQty,
        'maximumQty':res.itemMasterBean.maximumQty,
       //GRN
        'batchNo':res.itemMasterBean.batchNo,
        'mrp':res.itemMasterBean.mrp,
        'expiryDate':res.itemMasterBean.expiryDate,
        'manufactureDetails':res.itemMasterBean.manufactureDetails,
        //INVENTORY
         'inventoryValuation':res.itemMasterBean.inventoryValuation,
         'issueMethod':res.itemMasterBean.issueMethod,
        
      })
      this.dataarray = res.itemMasterDetailBean;
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
  
  update() {

    this.itemMaster = this.docForm.value;
    this.itemMaster.itemMasterDetailBean = this.dataarray;
    this.itemMasterService.itemUpdate(this.itemMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/inventory/item-master/list-item-master']);

  }

  
 onCancel(){
     this.router.navigate(['/inventory/item-master/list-item-master']);
}
  reset(){}

  addRow(){
    this.itemMasterDetailBean=this.itemMasterDetailBean;
    this.dataarray.push(this.itemMasterDetailBean)

  }

     removeRow(index){
      this.dataarray.splice(index, 1);
    }
    showNotification(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
       
}
}

