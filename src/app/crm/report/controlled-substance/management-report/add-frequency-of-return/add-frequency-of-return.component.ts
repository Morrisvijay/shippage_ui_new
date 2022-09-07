import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
 
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

import { ManagementFormBean } from '../management-result-bean';
import { ManagementFormService } from '../management-service';
import { DeaformService } from '../../deaform41/deaform.service'; 
import { CommonService } from 'src/app/common-service/common.service';
import { DebitmemoService } from 'src/app/setup/company-master/debit-memo/debitmemo.service';
@Component({
  selector: 'app-add-frequency-of-return',
  templateUrl: './add-frequency-of-return.component.html',
  styleUrls: ['./add-frequency-of-return.component.sass']
})
export class AddFrequencyOfReturnComponent implements OnInit {

 
  docForm: FormGroup;
  companyNameList: any;
  exampleDatabase: ManagementFormService | null;
  requestId: any;
  companyList =[];
  debitMemoList =[];
  listDebitMemo =[];
  searchList: any;

  constructor(private fb: FormBuilder,public router: Router,
  private httpService: HttpServiceService,public deaformService:DeaformService
    ,public route: ActivatedRoute,  public commonService: CommonService,    public debitmemoService: DebitmemoService) {
    this.docForm = this.fb.group({
      company: ["", [Validators.required]],
      returnMemoNo: "",
      startDate:"",
      endDate:"",
    });
  }
  

  ngOnInit(): void {
    
    
  }
 
}

