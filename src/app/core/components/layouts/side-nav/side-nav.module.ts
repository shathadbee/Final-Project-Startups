import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const MatImports =[MatSidenavModule,MatToolbarModule,MatListModule,MatIconModule,MatButtonModule,RouterModule,MatProgressSpinnerModule]


@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    CommonModule,
    ...MatImports
  ],
  exports:[SideNavComponent],
})
export class SideNavModule { }
