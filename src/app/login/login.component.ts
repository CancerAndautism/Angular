import { Component, Inject } from '@angular/core';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HTTPService } from '../httpservice';
import { FormControl, Validators } from '@angular/forms';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
import { DuplicatedDialogComponent } from '../duplicated-dialog/duplicated-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true

  newData = {"username":"", "password":""};

  error = false

  Username:any = ""
  Password:any = ""
 

  validator1 = new FormControl(this.Username, [Validators.required, Validators.maxLength(100)]);
  validator2 = new FormControl(this.Password, [Validators.required, Validators.maxLength(100)]);
  
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
    return ''
     
  }

  submit(event:any){
    this.newData = {"username": this.validator1.value, "password": this.validator2.value}
    this.httpService.postdata(this.newData, "login").subscribe((response: any) => {
      if (response != "invalid"){
        this.dialogRef.close(response)
      }
      else {
        this.error = true
      }
  });
    
  }

  


  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>, private httpService: HTTPService, public dialog: MatDialog
    ) {}
  
    ngAfterViewInit() {
      
    }


}
