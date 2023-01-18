import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotAuthGuard } from './core/guards/notauth.guard';
import { HomeComponent } from './pages/home/home/home.component';

const routes: Routes = [

  {path: '',
  redirectTo:'startups',
  pathMatch:'full',
  },
  { path: 'auth',
loadChildren:() =>
import('./pages/auth/auth.module').then ((m)=> m.AuthModule),
canLoad : [ NotAuthGuard] ,

},
  { path: 'home',
  loadChildren:() =>
  import('./pages/home/home.module').then ((m)=> m.HomeModule),
  canLoad:[ NotAuthGuard] ,
  },

  { path: 'approval',
  loadChildren:() =>
  import('./pages/approval/approval.module').then ((m)=> m.ApprovalModule),
  canLoad:[AuthGuard] ,
},

  { path: 'sectors',
  loadChildren:() =>
  import('./pages/sectors/sectors.module').then ((m)=> m.SectorsModule),
  canLoad:[AuthGuard] ,
},

  { path: 'startups',
  loadChildren:() =>
  import('./pages/startups/startups.module').then ((m)=> m.StartupsModule),
  canLoad:[AuthGuard] ,
  },


  {path: '**',
  redirectTo:'home',
  pathMatch:'full',
  },
];
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};




@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }






















