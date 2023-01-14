import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startups/startups.service';

@Component({
  selector: 'app-details-startup',
  templateUrl: './details-startup.component.html',
  styleUrls: ['./details-startup.component.css']
})
export class DetailsStartupComponent implements OnInit,OnDestroy {
  subject = new Subject();
  loading=true;
  key:string='';
  loader=true;
constructor(private  activatedRoute:ActivatedRoute ,
  private  _startupsService:StartupsService ,private router:Router){}

startup:Startup = {
  name: '',
  sectors:[],
  websiteUrl: '',
  emailAddress: '',
};


ngOnInit(): void {
  this.activatedRoute.queryParams.pipe(takeUntil(this.subject)).subscribe((result)=>{
    if(result['key']){
      this.key=result['key'];
      this.getById();
    }
  })
}



  getById(){
  this._startupsService.getById(this.key).pipe(takeUntil(this.subject)).subscribe((result:any)=>{
 if(result){
 this.startup=result;
 setTimeout(() => {
  this.loader=false;
}, 1000);
      }

      })

    }
    onClicked(){
      this.router.navigate(['/home']);
    }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }
}
