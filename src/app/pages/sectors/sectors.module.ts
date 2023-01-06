import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorsRoutingModule } from './sectors-routing.module';
import { SectorsComponent } from './sectors/sectors.component';
import { AddSectorComponent } from './add-sector/add-sector.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SectorDetailsComponent } from './sector-details/sector-details.component';
import { UpdateSectorComponent } from './update-sector/update-sector.component';

const MatImports=[MatTableModule ,MatButtonModule,MatInputModule ,MatListModule,MatIconModule ,MatMenuModule,MatPaginatorModule,MatFormFieldModule
  ,RouterModule, MatSelectModule,FormsModule ,ReactiveFormsModule ,MatProgressSpinnerModule]


@NgModule({
  declarations: [SectorsComponent, AddSectorComponent, SectorDetailsComponent, UpdateSectorComponent],
  imports: [CommonModule, SectorsRoutingModule, ...MatImports],
})
export class SectorsModule {}
