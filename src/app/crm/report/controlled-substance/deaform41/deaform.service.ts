import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient,HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DEAForm } from './deaform-model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DeaformService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<DEAForm[]> = new BehaviorSubject<DEAForm[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }

  public companyNameUrl = `${this.serverUrl.apiServerAddress}api/auth/app/report/getCompanyNameList`;
  public savedEAForm = `${this.serverUrl.apiServerAddress}api/auth/app/report/getDEAList`;
  public saveSechdule = `${this.serverUrl.apiServerAddress}api/auth/app/report/getSearchList`;
  public deaExportPDF  = `${this.serverUrl.apiServerAddress}api/auth/app/report/getDEAexport`;
  get data(): DEAForm[] {
    return this.dataChange.value;
  }
 


  addScheduleInfo(dEAForm:DEAForm): void {
    this.dialogData = dEAForm;
    this.httpService.post<DEAForm>(this.savedEAForm, dEAForm).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

}