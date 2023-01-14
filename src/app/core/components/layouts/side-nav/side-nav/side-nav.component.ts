import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import { delay } from 'rxjs';
import { SideNavService } from 'src/app/core/services/side-nav/side-nav.service';
import { NavMenuDto } from 'src/app/core/dto/nav-menu';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements  OnInit ,AfterViewInit{
@ViewChild(MatSidenav) sidenav!:MatSidenav;
navMune:NavMenuDto;
userData:any;




loader=true;
constructor( private breakpoint :BreakpointObserver,
  private _sideNavService:SideNavService ,private _authService:AuthService) {
  this.navMune=this._sideNavService.getNavMenu();
}
  ngAfterViewInit(): void {
    this.breakpoint.observe(['(max-width:700px)']).pipe(delay(1))
    .subscribe((value:BreakpointState)=>
    {
      if(value.matches){
        this.sidenav.mode="over";
        this.sidenav.close();

    }else{
      this.sidenav.mode='side';
      this.sidenav.close();
    }

  })
}
  ngOnInit(): void {
this._authService.userInfo.subscribe((user)=>{
this.userData=user;
console.log(this.userData);
if(this.userData.role){
  setTimeout(() => {
    this.loader=false;
  }, 1000);
}

})
  }



  onLoggedoutClicked(){
    this._authService.logout();
  }









}




