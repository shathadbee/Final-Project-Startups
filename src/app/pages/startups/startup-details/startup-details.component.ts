import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startups/startups.service';

@Component({
  selector: 'app-startup-details',
  templateUrl: './startup-details.component.html',
  styleUrls: ['./startup-details.component.css']
})
export class StartupDetailsComponent implements OnInit {

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
    this.activatedRoute.queryParams.subscribe((result)=>{
      if(result['key']){
        this.key=result['key'];
        this.getById();
      }
    })
  }



    getById(){
      this._startupsService.getById(this.key).subscribe((result:any)=>{
        if(result){
          this.startup=result;
          this.loading=false;
        }

        })

      }






    }






















