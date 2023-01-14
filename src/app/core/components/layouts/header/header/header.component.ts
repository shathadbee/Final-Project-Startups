import { Component, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {
  menu_icon_variable:boolean=false;
  fixedNavBar: boolean = false;

  menuVariable:boolean=false;
  constructor(private router:Router){
  }

  ngOnInit(){

  }
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 30) {
      this.fixedNavBar = true;
    } else {
      this.fixedNavBar = false;
    }
  }

  open_closeMenu(){
   this.menuVariable =! this.menuVariable;
   this.menu_icon_variable =! this.menu_icon_variable;
  }

}
