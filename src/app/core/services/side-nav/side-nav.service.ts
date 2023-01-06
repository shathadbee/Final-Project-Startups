import { Injectable } from '@angular/core';
import { NavItemDto } from '../../dto/nav-item';
import { NavMenuDto } from '../../dto/nav-menu';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  constructor() { }


  getNavMenu(){
    return new NavMenuDto('NavMenu',[
      new NavItemDto ('Startups','/startups','',''),
      new NavItemDto ('Approval','/approval','','admin'),
      new NavItemDto ('Sectors','/sectors','','admin'),

    ]);
  }




}
