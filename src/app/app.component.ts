import { Component, Inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HTTPService } from './httpservice';
import {ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { group } from '@angular/animations';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { UnacceptedExcelComponent } from './unaccepted-excel/unaccepted-excel.component';
import { FormControl } from '@angular/forms';
import { LoginComponent } from './login/login.component';







@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  
  

  newData = [{"Folio_No":"", "Description":"", "Unit":"", "Stock_Qty":"", "WAC": "", "Bin_Location":"", "Remarks":"", "Shelf_life_item":""}];
  displayColumns : string[] = []
  Columns : string[] = ["Folio_No","Description", "Unit", "Stock_Qty", "WAC", "Bin_Location", "Remarks", "Shelf_life_item", "Actions"]
  //,"Description","Unit","Stock Qty","WAC","Bin Location","Remarks","Shelf-life item"
  
  


  ExcelData: any;
  Data = [{"Folio_No":"", "Description":"", "Unit":"", "Stock_Qty":"", "WAC": "", "Bin_Location":"", "Remarks":"", "Shelf_life_item":""}];
  show = false;


  user: string = ""
  role: string = ""
  userRights: boolean = false
  adminRights: boolean = false


  loading: boolean = false;
  errorMessage: any;

  constructor(private httpService: HTTPService, public dialog: MatDialog) {
    
  }
  title = 'ASMG Inventory';

  length1 = 0;
  length2 = 0;

  dataSource1 = new MatTableDataSource(this.Data);

  Filter1 = new FormControl('');
  Filter2 = new FormControl('');
  
  column = new FormControl(this.Columns);
  

  

  @ViewChild('firstPaginator', {static: true}) firstPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('group') toggle!: MatButtonToggle;
  
  

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngOnInit() {
    this.dataSource1.paginator = this.firstPaginator;
    this.updateTable()
    this.updateLogin()
    this.column.valueChanges.subscribe(name =>{
      this.updateTable()
    })
  }
  ngAfterViewInit(){
    this.dataSource1.sort = this.sort
    this.Filter1.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(result =>{
      this.updateTable()
    })
    this.Filter2.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(result =>{
      this.updateTable()
    })
  }

  logout(){
    localStorage.clear()
    this.updateLogin()
  }

  updateLogin(){
    var tempUser = localStorage.getItem("name")
    var tempRole = localStorage.getItem("role")
    if (tempUser != null){
      this.user = tempUser
    }
    else {
      this.user = ""
    }
    if (tempRole != null){
      this.role = tempRole
    }
    else {
      this.role = ""
    }
    if (this.role == "user") {
      this.userRights = true
    }
    else if (this.role == "admin") {
      this.userRights = true
      this.adminRights = true
    }
    else {
      this.userRights = false
      this.adminRights = false
    }
  }

  login(){
    const dialogRef = this.dialog.open(LoginComponent, { panelClass: 'custom-dialog-container'})
              dialogRef.afterClosed().subscribe(result =>{
                if (result != null){
                  var username = result.username
                  var role = result.role
                  localStorage.setItem("name", username)
                  localStorage.setItem("role", role)
                  this.updateLogin()
                }
                

          })
  }

  updateTable() {
    this.displayColumns.length = 0
    for (var i =0; i < this.Columns.length;i++){
      if (this.column.value != null){
        if (this.column.value.includes(this.Columns[i])){
          var temp = this.Columns[i]
            this.displayColumns.push(temp)
        }
      }
    }
    var combinedFilter = {"description":this.Filter1.value != null ? this.Filter1.value : "", "remarks":this.Filter2.value != null ? this.Filter2.value : ""}
    this.httpService.postdata(combinedFilter, "getDB").subscribe((response:any) => {
      if (response != "empty"){
        this.Data = response
        this.dataSource1.data = this.Data
      }
      
  })
    
  }

  addDialog(){
    const dialogRef = this.dialog.open(AddDialogComponent, {panelClass: 'custom-dialog-container'})
          dialogRef.afterClosed().subscribe((result:any) =>{
            if (result != null){
              const dialogRef = this.dialog.open(EditDialogComponent, {data: result, panelClass: 'custom-dialog-container'})
              dialogRef.afterClosed().subscribe(result =>{
              this.updateTable()
          })
            }
            this.updateTable()
          })
  }

  editDialog(ID: string){

    if (ID != null){

      for (var i = 0; i< this.Data.length;i++){
        var matchRow = this.Data[i]
        var matchID = matchRow["Folio_No"]
        if (matchID == ID){
          const dialogRef = this.dialog.open(EditDialogComponent, {data: this.Data[i], panelClass: 'custom-dialog-container'})
          dialogRef.afterClosed().subscribe(result =>{
            this.updateTable()
          })
          return
        }
        
      }
      
    }
      


  }

  deleteDialog(ID: string){

    if (ID != null){

      for (var i = 0; i< this.Data.length;i++){
        var matchRow = this.Data[i]
        var matchID = matchRow["Folio_No"]
        if (matchID == ID){
          const dialogRef = this.dialog.open(DeleteDialogComponent, {data: this.Data[i], panelClass: 'custom-dialog-container'})
          dialogRef.afterClosed().subscribe(result =>{
            this.updateTable()
          })
          return
        }
        
      }
      
    }
      


  }

 

  ReadExcel(event: any) {

    let file = event.target.files[0];

    if (file == null) {
      return
    }

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' })
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]], {range:6});
      var valdikeys = ["Folio No", "Description", "Unit", "Stock Qty","WAC","Bin Location","Remarks","Shelf-life item"];
      var validation = true;
      var validrow = this.ExcelData[0];
      if (validrow != null){
        var keys = Object.keys(validrow);
        if (keys.length == valdikeys.length){
          for (var i = 0; i<valdikeys.length;i++){
            if (valdikeys[i] != keys[i]){
              validation = false
              break
            }
          }
        } else {
          validation = false
        }
      } else {
        validation = false
      }
      
      //console.log(valdikeys[0]);
      //console.log(validrow);
      
      if (validation == false){
        const dialogRef = this.dialog.open(UnacceptedExcelComponent)
        return
      }
      
      

      


      //console.log(validation);
      var tempData = [];
      for (var i =0; i < this.ExcelData.length;i++){
        var copyrow = this.ExcelData[i]
        var Folio_No = copyrow["Folio No"]
        var Description = copyrow["Description"]
        var Unit = copyrow["Unit"]
        var Stock_Qty = copyrow["Stock Qty"]
        var WAC = copyrow["WAC"]
        var Bin_Location = copyrow["Bin Location"]
        var Remarks = copyrow["Remarks"]
        var Shelf_life_item = copyrow["Shelf-life item"]

        
        if ((typeof(Stock_Qty)!="number" && Stock_Qty != null)&& (typeof(WAC)!="number" && WAC != null)){
          const dialogRef = this.dialog.open(UnacceptedExcelComponent)
          return
        }
        

        if (Folio_No != null && Description != null && Unit != null && Stock_Qty != null && WAC != null && Bin_Location != null && Remarks != null && Shelf_life_item != null){
          tempData.push({"Folio_No":Folio_No, "Description":Description, "Unit":Unit, "Stock_Qty":Stock_Qty, "WAC": WAC, "Bin_Location":Bin_Location, "Remarks":Remarks, "Shelf_life_item":Shelf_life_item})
        }

        


      }
      this.newData = tempData
      const dialogRef = this.dialog.open(UpdateDialogComponent, {data: this.newData,panelClass: 'custom-dialog-container', width: '1000px', height: '700px'})
      dialogRef.afterClosed().subscribe(result =>{
        this.updateTable()
      })
      

      
      
      
      




    }

  }
  

 
}


