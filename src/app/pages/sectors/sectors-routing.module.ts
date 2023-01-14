import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSectorComponent } from './add-sector/add-sector.component';

import { SectorsComponent } from './sectors/sectors.component';
import { UpdateSectorComponent } from './update-sector/update-sector.component';

const routes: Routes = [
  {path:'',
  redirectTo:'all-sectors',
  pathMatch:'full',},


  {
    path:'all-sectors',
    component:SectorsComponent,
  },


  {
    path:'add-sectors',
    component:AddSectorComponent,
  },
  {
    path:'update-sector',
    component:UpdateSectorComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorsRoutingModule { }
