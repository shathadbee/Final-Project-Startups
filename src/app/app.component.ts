import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';
import { LoaderService } from './core/services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn$!:Observable<boolean>
constructor(private _authService:AuthService ,private http: HttpClient,    public loader:LoaderService) {}
//loader=true;
  ngOnInit(): void {
    this.isLoggedIn$= this._authService.isLoggedIn$;

    /*setTimeout(() => {
      this.loader=false;
    }, 1000);*/
  }









}
