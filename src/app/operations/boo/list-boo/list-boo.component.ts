import { Component , ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { FormDialogComponent } from 'src/app/admin/employees/allEmployees/dialogs/form-dialog/form-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BillOfOperation } from '../boo.model';
import { BooService } from '../boo.service';
import { DeleteBooComponent } from './delete-boo/delete-boo.component';


@Component({
  selector: 'app-list-boo',
  templateUrl: './list-boo.component.html',
  styleUrls: ['./list-boo.component.sass']
})
export class ListBooComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  displayedColumns = ['booNo', 'bomRef','productName','date','actions'];
  dataSource: ExampleDataSource | null;
  exampleDatabase: BooService | null;
  selection = new SelectionModel<BillOfOperation>(true, []);
  billOfOperation : BillOfOperation | null;
  booNo : string;
  id : number;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public booService: BooService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.loadData();

    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo') 
    // }
  }
  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new BooService(this.httpClient, this.serverUrl, this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }


  editCall(row) {

    this.router.navigate(['/operations/billOfOperation/addBoo/'+row.booNo]);

  }

  deleteItem(row){ 
    this.id = row.idNo;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteBooComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
      this.loadData();
        this.showNotification(
          "snackbar-success",
          "Delete Record Successfully...!!!",
          "bottom",
          "center"
        );
      
      // else{
      //   this.showNotification(
      //     "snackbar-danger",
      //     "Error in Delete....",
      //     "bottom",
      //     "center"
      //   );
      // }
    });

  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
// context menu
  onContextMenu(event: MouseEvent, item: BillOfOperation) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}


export class ExampleDataSource extends DataSource<BillOfOperation> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: BillOfOperation[] = [];
  renderedData: BillOfOperation[] = [];
  constructor(
    public exampleDatabase: BooService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<BillOfOperation[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((billOfOperation: BillOfOperation) => {
            const searchStr = (
              billOfOperation.booNo +
              billOfOperation.bomRef +
              billOfOperation.productName +
              billOfOperation.date
             
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: BillOfOperation[]): BillOfOperation[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "booNo":
          [propertyA, propertyB] = [a.booNo, b.booNo];
          break;
        case "bomRef":
          [propertyA, propertyB] = [a.bomRef, b.bomRef];
          break;
        case "productName":
          [propertyA, propertyB] = [a.productName, b.productName];
          break;
        case "date":
          [propertyA, propertyB] = [a.date, b.date];
          break;
        case "idNo":
          [propertyA, propertyB] = [a.idNo, b.idNo];
          break;
        
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
  


}
