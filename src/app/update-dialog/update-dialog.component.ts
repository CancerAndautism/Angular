import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HTTPService } from '../httpservice';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {

  newData = [{"Folio_No":"", "Description":"", "Unit":"", "Stock_Qty":"", "WAC": "", "Bin_Location":"", "Remarks":"", "Shelf_life_item":""}];
  displayColumns = ["Folio_No","Description", "Unit", "Stock_Qty", "WAC", "Bin_Location", "Remarks", "Shelf_life_item"]
  Changes = [{}];
  NewInsert = [{}];
  length1 = 0;
  length2 = 0;

  dataSource1 = new MatTableDataSource(this.NewInsert);
  dataSource2 = new MatTableDataSource(this.Changes);

  

  @ViewChild('firstPaginator', {static: true}) firstPaginator!: MatPaginator;
  @ViewChild('secondPaginator', {static: true}) secondPaginator!: MatPaginator;
  

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>, private httpService: HTTPService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
  ngAfterViewInit() {
    this.dataSource1.paginator = this.firstPaginator;
    this.dataSource2.paginator = this.secondPaginator;

    this.httpService.postdata(this.data, "updateDB").subscribe((response: any) => {

      this.Changes = response.change
      this.NewInsert = response.new
      if (this.NewInsert != null) {
        this.length1 = this.NewInsert.length
        console.log(this.length1)
      } else {
        this.length1 = 0
      }

      
      if (this.Changes != null) {
        this.length2 = this.Changes.length
        console.log(this.length2)
      } else {
        this.length2 = 0
      }
      this.dataSource1.data = this.NewInsert
      this.dataSource2.data = this.Changes


    });
    
  }

  submit(event: any){
    var combined = {"new": this.NewInsert, "change": this.Changes}
    console.log(combined)
    this.httpService.postdata(combined, "submitDB").subscribe((response: any) => {

    });
    const dialogRef = this.dialog.open(CloseDialogComponent, {width: '500px', height: '100px'})
    this.dialogRef.close();
    
    
  }

  onNoClick(): void {
    this.dialogRef.close();
    
  }

}

