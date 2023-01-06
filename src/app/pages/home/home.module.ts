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
import{FontAwesomeModule } from '@fortawesome/angular-fontawesome'
const MatImports = [

  MatTableModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatMenuModule,

  MatFormFieldModule,

  MatSelectModule,


];
@NgModule({
  declarations: [HomeComponent, StartupComponent, PreviewStartupComponent, ListSectorsComponent, FooterComponent],
  imports: [CommonModule, HomeRoutingModule, HeaderModule,  RouterModule,
    FormsModule,
    MatPaginatorModule,

    ReactiveFormsModule, ...MatImports,
    ShareButtonsModule.withConfig({
      debug:true,
    }),
    ShareIconsModule,
    FontAwesomeModule
  ],
})
export class HomeModule {}