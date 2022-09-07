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
import {MatRadioModule} from '@angular/material/radio';
import { ManagementReportRoutingModule } from './management-report-routing.module';
import { AddNonReturnableProductReportComponent } from './add-non-returnable-product-report/add-non-returnable-product-report.component';
import { AddReturnableProductReportComponent } from './add-returnable-product-report/add-returnable-product-report.component';
import { AddFrequencyOfReturnComponent } from './add-frequency-of-return/add-frequency-of-return.component';
import { AddReconcilliationReportComponent } from './add-reconcilliation-report/add-reconcilliation-report.component';
import { CalculatorReturnableComponent } from './add-returnable-product-report/calculator-returnable/calculator-returnable.component';
import { AddScheduleIIReturnRequestComponent } from './add-schedule-iireturn-request/add-schedule-iireturn-request.component';
import { AddScheduleIIIReturnRequestComponent } from './add-schedule-iiireturn-request/add-schedule-iiireturn-request.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AddNonReturnableProductReportComponent,
    AddReturnableProductReportComponent,
    AddFrequencyOfReturnComponent,
    AddReconcilliationReportComponent,
    CalculatorReturnableComponent,
    AddScheduleIIReturnRequestComponent,
    AddScheduleIIIReturnRequestComponent
  ],
  imports: [
    CommonModule,
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
    CommonModule,
    NgxPaginationModule,
    ManagementReportRoutingModule
  ]
})
export class ManagementReportModule { }
