import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
   {
     path: "salesCallEntry",
   loadChildren: () =>
     import("./sales-call-entry/sales-call-entry.module").then((m) => m.SalesCallEntryModule),
  },
  {
    path: "territory",
    loadChildren: () =>
    import("./territory/territory.module").then((m) => m.TerritoryModule),
  },
  {
    path: "report",
    loadChildren: () =>
    import("./report/report.module").then((m) => m.ReportModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
    MatIconModule]
})
export class CRMRoutingModule { }
