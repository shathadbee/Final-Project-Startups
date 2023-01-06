import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovelStartupComponent } from './approvel-startup/approvel-startup.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
const MatImports=[MatTableModule ,MatButtonModule,MatInputModule ,MatListModule,MatIconModule ,MatMenuModule,MatPaginatorModule,MatFormFieldModule
  ,RouterModule, MatSelectModule,FormsModule ,ReactiveFormsModule ,MatProgressSpinnerModule]

@NgModule({
  declarations: [
    ApprovelStartupComponent
  ],
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    MatCardModule,
    ...MatImports
  ]
})
export class ApprovalModule { }
