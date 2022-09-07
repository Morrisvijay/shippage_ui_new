import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DebitmemoService } from './../debitmemo.service';
import { DebitMemo } from './../debitmemo-model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-service/common.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-add-debit-memo',
  templateUrl: './add-debit-memo.component.html',
  styleUrls: ['./add-debit-memo.component.sass']
})
export class AddDebitMemoComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  companyList =[];
  debitMemo:DebitMemo;
  submitted: boolean=false;
  requestId: number;
  edit: boolean=false;
  today = moment().format('YYYY-MM-DD');
  constructor( public commonService: CommonService,public dialogRef: MatDialogRef<AddDebitMemoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private authService: AuthService,public router: Router,
    private debitmemoService:DebitmemoService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public datepipe: DatePipe,public route: ActivatedRoute, private tokenStorage: TokenStorageService) {
    this.docForm = this.fb.group({
      company: ["", [Validators.required]],
      returnMemoDate: ["", [Validators.required]],
      returnMemoName: ["", [Validators.required]],
      returnMemoNo: ["", [Validators.required]],
      createdBy: this.tokenStorage.getUsername()
    });

  }
  ngOnInit(): void {

    this.httpService.get<any>(this.commonService.getcompanyMasterDropdownList).subscribe(
      (data) => {
        this.companyList = data;
        if(this.data.type=='Edit'){
          this.edit=true;
        this.docForm.patchValue({
          'company' : this.data.company,
          'returnMemoDate': this.data.returnMemoDate,
      'returnMemoName': this.data.returnMemoName,
      'returnMemoNo': this.data.returnMemoNo,
       })
      }else if(this.data.type=='Add'){
        this.edit=false;
        this.docForm.patchValue({
          'company' : this.data.company,
          'returnMemoDate' : this.today
       })
      }
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );
  }
  onSubmit() {
    this.submitted=true;   
if (this.docForm.valid) {
  
  this.docForm.patchValue({
    'returnMemoDate': this.datepipe.transform(this.docForm.value.returnMemoDate, 'yyyy-MM-dd')
  });
    this.debitMemo = this.docForm.value;
    console.log(this.debitMemo);
    
    this.debitmemoService.addDebitMemo(this.debitMemo);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.dialogRef.close();
   // this.router.navigate(['/setup/debitMemo/listdebitMemo']);
  }
  }
  fetchDetails(cusCode: any): void {
    this.httpService.get(this.debitmemoService.editDebitMemo+"?company="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'company' : res.debitMemo.company,
        'returnMemoDate' : res.debitMemo.returnMemoDate,
        'returnMemoName' : res.debitMemo.returnMemoName,
        'returnMemoNo' : res.debitMemo.returnMemoNo
     })

      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  
  update(){
    this.submitted=true;
    if (this.docForm.valid) {
      this.docForm.patchValue({
        'returnMemoDate': this.datepipe.transform(this.docForm.value.returnMemoDate, 'yyyy-MM-dd')
      });
    this.debitMemo = this.docForm.value;
    this.debitmemoService.debitMemoUpdate(this.debitMemo);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    //this.router.navigate(['/setup/debitMemo/listdebitMemo']);
    this.dialogRef.close();
  }
  }
  reset(){}

  
  onCancel(){
    this.dialogRef.close();
    //this.router.navigate(['/setup/debitMemo/listdebitMemo']);
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


  keyPressDebitMemoNo(event: any) {
    const pattern = /[A-Z,a-z 0-9-]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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

}
