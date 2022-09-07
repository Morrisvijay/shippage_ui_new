import { Component, OnInit } from '@angular/core';
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SalesCallEntry } from '../sales-call-entry.model';
import { SalesCallEntryResultBean } from '../sales-call-entry-result-bean';
import { SalesCallEntryService } from '../sales-call-entry.service';
import { SalesOrderResultBean } from 'src/app/marketing/sales-order/sales-order-result-bean'; 
import { SalesOrderService } from 'src/app/marketing/sales-order/sales-order.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-add-sales-entry',
  templateUrl: './add-sales-entry.component.html',
  styleUrls: ['./add-sales-entry.component.sass']
})
export class AddSalesEntryComponent implements OnInit {

  docForm: FormGroup;
  salesCallEntry: SalesCallEntry;
  hide3 = true;
  agree3 = false;
  dataarray = [];
  dataarray1 = [];
  customerList =[];
  cusMasterData = [];
  salesEntryData = [];
  requestId: number;
  edit: boolean = false;
  salesDetailRowData = new SalesEntryDetailRowComponent;


  salescallEntryDetailBean = {
    objective: '',
    commodity: '',
    date: '',
    nextCallDate: '',
    status: '',
    conditionSupport: '',
    reasonSupport: '',
    reasonNotSupport: '',
    remarks: '',

  }
  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar,
    private salesCallEntryService: SalesCallEntryService, public salesOrderService:SalesOrderService,public route: ActivatedRoute, private httpService: HttpServiceService) {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      customer: ["", [Validators.required]],
      customerType: ["", [Validators.required]],
      typeOfCall: ["", [Validators.required]],
      salesPerson: ["", [Validators.required]],
      emailId: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      personMet: [""],
      assignTo: [""],
      visitDate: [""],
      modeOfContact: [""],
      designation: [""],
      salesCallHdrId: [""],
    });
  }
  ngOnInit(): void {

    
    // this.dataarray1.push(this.salesDetailRowData)
    // this.cusMasterData.push(this.docForm)
    // this.cusMasterData.push(this.dataarray)
    // this.salesEntryData.push(this.dataarray1)
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        //For User login Editable mode
        this.fetchDetails(this.requestId);

      }
    });
    this.dataarray.push(this.salescallEntryDetailBean)
 
// customer dropdown 
this.httpService.get<SalesOrderResultBean>(this.salesOrderService.customerList).subscribe(
  (data) => {
    console.log(data);
    this.customerList = data.customerList;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);

  }
  onSubmit() {
    this.salesCallEntry = this.docForm.value;
    this.salesCallEntry.salescallEntryDetailBean = this.dataarray;
    console.log(this.salesCallEntry);
    console.log(this.dataarray);
    this.salesCallEntryService.addSalesEntry(this.salesCallEntry);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/crm/salesCallEntry/listSalesCallEntry']);

    // this.salesCallEntry = this.docForm.value;
    // console.log(this.salesCallEntry);
    // this.salesCallEntryService.addSalesEntry(this.salesCallEntry);
  }

  fetchDetails(salesCallHdrId: any): void {
    this.httpService.get(this.salesCallEntryService.editSalesEntry + "?salescallEntry=" + salesCallHdrId).subscribe((res: any) => {
      console.log(salesCallHdrId);

      this.docForm.patchValue({
        'customer': res.salesCallEntryBean.customer,
        'customerType': res.salesCallEntryBean.customerType,
        'typeOfCall': res.salesCallEntryBean.typeOfCall,
        'personMet': res.salesCallEntryBean.personMet,
        'assignTo': res.salesCallEntryBean.assignTo,
        'emailId': res.salesCallEntryBean.emailId,
        'modeOfContact': res.salesCallEntryBean.modeOfContact,
        'designation': res.salesCallEntryBean.designation,
        'visitDate': res.salesCallEntryBean.visitDate,
        'salesCallHdrId': res.salesCallEntryBean.salesCallHdrId,

      })
      this.dataarray = res.salescallEntryDetailBean;
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  update() {
    this.salesCallEntry = this.docForm.value;
    this.salesCallEntry.salescallEntryDetailBean = this.dataarray;

    this.salesCallEntryService.salesCallEntryUpdate(this.salesCallEntry);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/crm/salesCallEntry/listSalesCallEntry']);

  }

  addRow() {
    this.salesDetailRowData = new SalesEntryDetailRowComponent()
    this.dataarray1.push(this.salesDetailRowData)
  }
  removeRow(index) {
    this.dataarray.splice(index, 1);
  }

  addRow1() {
    

    this.salescallEntryDetailBean=this.salescallEntryDetailBean;
    this.dataarray.push(this.salescallEntryDetailBean)

  }
  removeRow1(index) {
    this.dataarray1.splice(index, 1);
  }

  onCancel() {
    this.router.navigate(['/crm/salesCallEntry/listSalesCallEntry']);
  }

  reset() { }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
