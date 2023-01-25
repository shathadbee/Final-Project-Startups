import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderModule } from 'src/app/core/components/layouts/header/header.module';
import { StartupComponent } from './startup/startup.component';
import { PreviewStartupComponent } from './preview-startup/preview-startup.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListSectorsComponent } from './list-sectors/list-sectors.component';
import { FooterComponent } from './footer/footer.component';
import{ ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import{ ShareIconsModule} from 'ngx-sharebuttons/icons';
import{FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsStartupComponent } from './details-startup/details-startup.component'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SliderComponent } from './slider/slider.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MainComponent } from './main/main.component';
const MatImports = [

  MatTableModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatToolbarModule,
  MatTabsModule


];
@NgModule({
  declarations: [HomeComponent, StartupComponent, PreviewStartupComponent, ListSectorsComponent, FooterComponent, DetailsStartupComponent, SliderComponent, MainComponent],
  imports: [CommonModule, HomeRoutingModule, HeaderModule,  RouterModule,
    FormsModule,
    MatPaginatorModule,

    ReactiveFormsModule,

     ...MatImports,
    ShareButtonsModule.withConfig({
      debug:true,
    }),
    ShareIconsModule,
    FontAwesomeModule
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
