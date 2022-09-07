import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatRadioModule } from '@angular/material/radio';
import { NgxPaginationModule } from 'ngx-pagination'; 


import { ReturnMemoItemsRoutingModule } from './return-memo-items-routing.module';
import { AddReturnMemoItemsComponent } from './add-return-memo-items/add-return-memo-items.component';
import { ListReturnMemoItemsComponent } from './list-return-memo-items/list-return-memo-items.component';
import { ReturnMemoCalculatorComponent } from './add-return-memo-items/return-memo-calculator/return-memo-calculator.component';
import { DeleteReturnMemoItemsComponent } from './list-return-memo-items/delete-return-memo-items/delete-return-memo-items.component';
import { OverrideRepackagedProductPopUpComponent } from './add-return-memo-items/override-repackaged-product-pop-up/override-repackaged-product-pop-up.component';
import { IsReturnablePopUpComponent } from './add-return-memo-items/is-returnable-pop-up/is-returnable-pop-up.component';
import { AddDruginfoMstrPopupComponent } from './add-return-memo-items/add-druginfo-mstr-popup/add-druginfo-mstr-popup.component';


@NgModule({
  declarations: [
    AddReturnMemoItemsComponent,
    ListReturnMemoItemsComponent,
    ReturnMemoCalculatorComponent,
    DeleteReturnMemoItemsComponent,
    OverrideRepackagedProductPopUpComponent,
    IsReturnablePopUpComponent,
    AddDruginfoMstrPopupComponent,
    
  ],
  imports: [
    CommonModule,
    ReturnMemoItemsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    MatRadioModule,
    NgxPaginationModule
  ]
})
export class ReturnMemoItemsModule { }
