import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startups/startups.service';

@Component({
  selector: 'app-startup-details',
  templateUrl: './startup-details.component.html',
  styleUrls: ['./startup-details.component.css']
})
export class StartupDetailsComponent implements OnInit,OnDestroy {
  subject = new Subject();
  loader=true;
  startup:Startup = {
    name: '',
    sectors:[],
    websiteUrl: '',
    emailAddress: '',
  };

    loading=true;
   key:string='';
   constructor(private  activatedRoute:ActivatedRoute ,
    private  _startupsService:StartupsService ,         ){ }



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



         ngOnDestroy(): void {
          this.subject.next(true);
          this.subject.complete();
        }

    }






















