import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTPService } from './httpservice';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { CloseDialogComponent } from './close-dialog/close-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DuplicatedDialogComponent } from './duplicated-dialog/duplicated-dialog.component';
import { UnacceptedExcelComponent } from './unaccepted-excel/unaccepted-excel.component';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './login/login.component';








@NgModule({
  declarations: [
    AppComponent,
    UpdateDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    CloseDialogComponent,
    AddDialogComponent,
    DuplicatedDialogComponent,
    UnacceptedExcelComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule
  ],
  providers: [HTTPService],
  bootstrap: [AppComponent]
})
export class AppModule { }
