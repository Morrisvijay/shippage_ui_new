import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InventoryForm } from './inventory-model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class InventoryformService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<InventoryForm[]> = new BehaviorSubject<InventoryForm[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }

  public saveSechdule = `${this.serverUrl.apiServerAddress}api/auth/app/report/getSearchList`;
  public exportPDF = `${this.serverUrl.apiServerAddress}api/auth/app/report/getExportString`;



  get data(): InventoryForm[] {
    return this.dataChange.value;
  }
 


}