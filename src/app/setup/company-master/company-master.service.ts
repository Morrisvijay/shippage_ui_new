import { CompanyMaster } from './company-model';
import { CompanyMasterResultBean } from './company-result-bean';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyMasterService extends UnsubscribeOnDestroyAdapter{

  roleList:any;
  isRoleAdmin:boolean;
 
   
  isTblLoading = true;
  dataChange: BehaviorSubject<CompanyMaster[]> = new BehaviorSubject<CompanyMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
  }

  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/companyMaster/getList`;
  private saveCompanyMaster = `${this.serverUrl.apiServerAddress}api/auth/app/companyMaster/save`;
  public editCompanyMaster = `${this.serverUrl.apiServerAddress}api/auth/app/companyMaster/edit`;
  public updateCompanyMaster = `${this.serverUrl.apiServerAddress}api/auth/app/companyMaster/update`;
  public deleteCompanyMaster = `${this.serverUrl.apiServerAddress}api/auth/app/companyMaster/delete`;
  public getCompanyMasterDropdownList = `${this.serverUrl.apiServerAddress}api/auth/app/companyMaster/getCompanyMasterDropdownList`;
  public getdebitMemoDropdownList= `${this.serverUrl.apiServerAddress}api/auth/app/companyMaster/getDebitMemoDropdownList`;
 

  get data(): CompanyMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCompany(): void {
    // this.roleList = this.tokenStorage.getAuthorities();
    // for(let i=0;i<this.roleList.length; i++){
    //   if(this.roleList[i].roleId==1){
    //     this.isRoleAdmin = true;
    //     break;
    //   }else{
    //     this.isRoleAdmin = false;
    //   }
    // }
      if(this.tokenStorage.getPharmaciesType()=='SELECTED'){
        this.isRoleAdmin = false;
      }else{
        this.isRoleAdmin = true;
      }
   

        this.subs.sink = this.httpService.get<CompanyMasterResultBean>(this.getAllMasters+"?company="+this.tokenStorage.getCustomerCompanyCode()+'&isRoleAdmin='+this.isRoleAdmin).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.listCompanyMaster);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addCompanyMaster(companyMaster: CompanyMaster): void {
    this.dialogData = companyMaster;
    this.httpService.post<CompanyMaster>(this.saveCompanyMaster, companyMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
  companyMasterUpdate(companyMaster: CompanyMaster): void {
    this.dialogData = companyMaster;
    this.httpService.post<CompanyMaster>(this.updateCompanyMaster, companyMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

 

}