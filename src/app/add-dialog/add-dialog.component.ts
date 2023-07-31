import { Component, Inject } from '@angular/core';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HTTPService } from '../httpservice';
import { FormControl, Validators } from '@angular/forms';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
import { DuplicatedDialogComponent } from '../duplicated-dialog/duplicated-dialog.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {

  newData = {"Folio_No":"", "Description":"", "Unit":"", "Stock_Qty":"", "WAC": "", "Bin_Location":"", "Remarks":"", "Shelf_life_item":""};

  error = false

  Folio_No:any = ""
  Description:any = ""
  Unit:any = ""
  Stock_Qty:any = ""
  WAC :any = ""
  Bin_Location :any = ""
  Remarks:any = ""
  Shelf_life_item:any = ""

  validator1 = new FormControl(this.Description, [Validators.required, Validators.maxLength(100)]);
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
    this.newData = {"Folio_No":this.validator1.value, "Description":this.validator2.value, "Unit":this.validator3.value, "Stock_Qty":this.validator4.value, "WAC": this.validator5.value, "Bin_Location":this.validator6.value, "Remarks":this.validator7.value, "Shelf_life_item":this.validator8.value};
    console.log(this.newData)
    this.httpService.postdata(this.newData, "add").subscribe((response: any) => {
        if (response == null) {
          const dialogRef = this.dialog.open(CloseDialogComponent, {width: '500px', height: '100px'})
          this.dialogRef.close();
        } else {
          const dialogRef = this.dialog.open(DuplicatedDialogComponent, {data:response})
          dialogRef.afterClosed().subscribe((result:any) =>{
            if (result == "edit"){
              this.dialogRef.close(response)
            }
            else {
              this.dialogRef.close();
            }
          })
          
        }
    });
    
  }

  


  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>, private httpService: HTTPService, public dialog: MatDialog
    ) {}
  
    ngAfterViewInit() {
      
    }

}
