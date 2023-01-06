import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListSectorsComponent } from './list-sectors/list-sectors.component';
import { PreviewStartupComponent } from './preview-startup/preview-startup.component';
import { StartupComponent } from './startup/startup.component';

const routes: Routes = [


  { path: '', component: HomeComponent, children: [
{path:'',
redirectTo:'startup',
pathMatch:'full'

},

    {path:'startup',
    component:StartupComponent,
    },
    {path:'startup-preview',
    component :PreviewStartupComponent,
    },
{path:'sector-list',
  component : ListSectorsComponent,
},
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
