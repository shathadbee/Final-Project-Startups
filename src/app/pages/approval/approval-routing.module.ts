import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovelStartupComponent } from './approvel-startup/approvel-startup.component';

const routes: Routes = [

  {path:'',
  redirectTo:'approval',
  pathMatch:'full',},

  {path: 'approval',
  component: ApprovelStartupComponent ,}









];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoutingModule { }
