import { DrugInfoMasterResultBean } from './../druginfo-result-bean';
import { DrugInfoMaster } from './../druginfo-model';
import { DruginfoService } from './../druginfo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-add-drug-info-return-policy',
  templateUrl: './add-drug-info-return-policy.component.html',
  styleUrls: ['./add-drug-info-return-policy.component.sass']
})
export class AddDrugInfoReturnPolicyComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  manufacturerList=[];
  drugInfoMaster:DrugInfoMaster;
  
  requestId: number;
  edit: boolean=false;
  submitted: boolean=false;
  constructor(private tokenStorage: TokenStorageService,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private druginfoService:DruginfoService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
     
     

    this.docForm = this.fb.group({
      ndcupcCode: ["", [Validators.required]],
      noMonthsBeforeExpiration: ["", [Validators.required]],
      noMonthsAfterExpiration: ["", [Validators.required]],
      acceptReturns: ["", [Validators.required]],
      acceptPartialReturns: ["", [Validators.required]],
      acceptpercentage: ["", [Validators.required]],
      checkPackageOriginality: false,
           
    });

    

  }
  ngOnInit(): void {

    this.httpService.get<DrugInfoMasterResultBean>(this.druginfoService.getManufacturerList).subscribe(
      (data) => {
        this.manufacturerList = data.manufacturerList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
       this.docForm.patchValue({
        'ndcupcCode': this.requestId
     })
      }
     });
  }

  drugInfo() {
    this.router.navigate(['/setup/druginfoMaster/addDruginfoMaster/',this.requestId]);
  }
  
  onSubmit() {
    this.submitted=true;
    if(this.docForm.value.acceptReturns=='true'){
       this.docForm.controls.acceptPartialReturns.setValidators(Validators.required);
       this.docForm.controls['acceptPartialReturns'].updateValueAndValidity();
       if(this.docForm.value.acceptPartialReturns=='true'){
        this.docForm.controls.acceptpercentage.setValidators(Validators.required);
        this.docForm.controls['acceptpercentage'].updateValueAndValidity();
       }else{
        this.docForm.patchValue({
          'acceptpercentage': 0,
       })
       }
    }else{
      this.docForm.patchValue({
        'acceptPartialReturns': false,
        'acceptpercentage': 0,
     })
    }

    

  if (this.docForm.valid) {
    this.httpService.post<any>(this.druginfoService.adddruginfoReturnPolicy, this.docForm.value).subscribe(
      (data) => {
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        
        this.router.navigate(['/setup/druginfoMaster/listDruginfoMaster']);
    
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

    
  }  
  }

  fetchDetails(ndcupc: any): void {
    
    this.httpService.get(this.druginfoService.editdrugInfoReturnPolicy+"?drugInfoId="+ndcupc).subscribe((res: any)=> {
     // console.log(ndcupc);
     

      this.docForm.patchValue({
        'ndcupcCode': res.druginfoReturnPolicyBean.ndcupcCode,
        'noMonthsBeforeExpiration': res.druginfoReturnPolicyBean.noMonthsBeforeExpiration,
        'noMonthsAfterExpiration': res.druginfoReturnPolicyBean.noMonthsAfterExpiration,
        'acceptReturns': this.getBoolean(res.druginfoReturnPolicyBean.acceptReturns).toString(),
        'acceptPartialReturns': this.getBoolean(res.druginfoReturnPolicyBean.acceptPartialReturns).toString(),
        'acceptpercentage': res.druginfoReturnPolicyBean.acceptpercentage,
     })

     

      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  update(){
    this.submitted=true;
    if(this.docForm.value.acceptReturns=='true'){
      this.docForm.controls.acceptPartialReturns.setValidators(Validators.required);
      this.docForm.controls['acceptPartialReturns'].updateValueAndValidity();
      if(this.docForm.value.acceptPartialReturns=='true'){
       this.docForm.controls.acceptpercentage.setValidators(Validators.required);
       this.docForm.controls['acceptpercentage'].updateValueAndValidity();
      }else{
       this.docForm.patchValue({
         'acceptpercentage': 0,
      })
      }
   }else{
     this.docForm.patchValue({
       'acceptPartialReturns': false,
       'acceptpercentage': 0,
    })
   }
   
    if (this.docForm.valid) {
    this.drugInfoMaster = this.docForm.value;
    this.druginfoService.drugInfoMasterUpdate(this.drugInfoMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/setup/druginfoMaster/listDruginfoMaster']);
    }
  }

  reset(){}

  
  onCancel(){
    this.router.navigate(['/setup/druginfoMaster/listDruginfoMaster']);
   }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }


  getBoolean(value){
    switch(value){
         case true:
         case "true":
         case 1:
         case "1":
         case "on":
         case "yes":
          case "t":
             return true;
         default: 
             return false;
     }
    }

    keyPressName(event: any) {
      const pattern = /[A-Z,a-z 0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    keyPressNumberDouble(event: any) {
      const pattern = /[0-9.]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  
    keyPressNumberInt(event: any) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
}
