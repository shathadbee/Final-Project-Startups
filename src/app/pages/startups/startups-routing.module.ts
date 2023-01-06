import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovelStartupComponent } from '../approval/approvel-startup/approvel-startup.component';
import { AddStartupComponent } from './add-startup/add-startup.component';
import { RequestStartupComponent } from './request-startup/request-startup.component';
import { StartupDetailsComponent } from './startup-details/startup-details.component';
import { StartupsComponent } from './startups/startups.component';
import { UpdateStartupComponent } from './update-startup/update-startup.component';

const routes: Routes = [
  {path:'',
redirectTo:'all-startup',
pathMatch:'full',},

{
  path:'all-startup',
  component:StartupsComponent,
},
{
  path:'add-startup',
  component:AddStartupComponent,
},
{
  path:'update-startup',
  component:UpdateStartupComponent,
},
{
  path:'details-startup',
  component:StartupDetailsComponent,
},
{
  path:'request-startup',
  component:RequestStartupComponent,
},{
  path:'approvel-startup',
  component:ApprovelStartupComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupsRoutingModule { }
