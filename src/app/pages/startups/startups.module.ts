import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupsRoutingModule } from './startups-routing.module';
import { StartupsComponent } from './startups/startups.component';
import { StartupDetailsComponent } from './startup-details/startup-details.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { AddStartupComponent } from './add-startup/add-startup.component';
import { UpdateStartupComponent } from './update-startup/update-startup.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RequestStartupComponent } from './request-startup/request-startup.component';

const MatImports=[MatTableModule ,MatButtonModule,MatInputModule ,MatListModule,MatIconModule ,MatMenuModule,MatPaginatorModule,MatFormFieldModule
   ,RouterModule, MatSelectModule,FormsModule ,ReactiveFormsModule ,MatProgressSpinnerModule ]

@NgModule({
  declarations: [
    StartupsComponent,
    StartupDetailsComponent,
    AddStartupComponent,
    UpdateStartupComponent,
    RequestStartupComponent
  ],
  imports: [
    CommonModule,
    StartupsRoutingModule,
    ...MatImports
  ]
})
export class StartupsModule { }
