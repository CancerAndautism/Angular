import { Component, Inject } from '@angular/core';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HTTPService } from '../httpservice';
import { FormControl, Validators } from '@angular/forms';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  

  newData = [{"Folio_No":"", "Description":"", "Unit":"", "Stock_Qty":"", "WAC": "", "Bin_Location":"", "Remarks":"", "Shelf_life_item":""}];

  error = false

  Folio_No = this.data.Folio_No
  Description = this.data.Description
  Unit = this.data.Unit
  Stock_Qty = this.data.Stock_Qty
  WAC = this.data.WAC
  Bin_Location = this.data.Bin_Location
  Remarks = this.data.Remarks
  Shelf_life_item = this.data.Shelf_life_item

  validator2 = new FormControl(this.Description, [Validators.required, Validators.maxLength(200)]);
  validator3 = new FormControl(this.Unit, [Validators.required,Validators.maxLength(50)]);
  validator4 = new FormControl(this.Stock_Qty, [Validators.required, Validators.max(1000), Validators.min(0), Validators.pattern("^[0-9]*$")]);
  validator5 = new FormControl(this.WAC, [Validators.required, Validators.max(1000000), Validators.min(0)]);
  validator6 = new FormControl(this.Bin_Location, [Validators.required, Validators.maxLength(100)]);
  validator7 = new FormControl(this.Remarks, [Validators.required, Validators.maxLength(100)]);
  validator8 = new FormControl(this.Shelf_life_item, [Validators.required, Validators.maxLength(50)]);

  onNoClick(): void {
    this.dialogRef.close();
    
  }

  getErrorMessage(validator: FormControl) {
    if (validator.hasError('required')){
      return 'You must enter a value';
    } 
    else if (validator.hasError('maxlength')){
      return 'The entered text is too long'
    } 
    else if (validator.hasError('min')){
      return 'The entered value cannot be smaller than 0'
    } 
    else if (validator.hasError('max')){
      return 'The entered value is too large'
    } 
    else if (validator.hasError('pattern')){
      return 'The entered value can only be integers'
    } 
    return ''
     
  }

  submit(event:any){
    this.newData = [{"Folio_No":this.Folio_No, "Description":this.validator2.value, "Unit":this.validator3.value, "Stock_Qty":this.validator4.value, "WAC": this.validator5.value, "Bin_Location":this.validator6.value, "Remarks":this.validator7.value, "Shelf_life_item":this.validator8.value}];
    var combined = {"new": null, "change": this.newData}
    console.log(combined)
    this.httpService.postdata(combined, "submitDB").subscribe((response: any) => {

    });
    const dialogRef = this.dialog.open(CloseDialogComponent, {width: '500px', height: '100px'})
    this.dialogRef.close();
    
  }

  


  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>, private httpService: HTTPService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    ngAfterViewInit() {
      
    }

}


