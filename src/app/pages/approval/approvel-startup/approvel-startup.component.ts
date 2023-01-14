import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startups/startups.service';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-approvel-startup',
  templateUrl: './approvel-startup.component.html',
  styleUrls: [ './approvel-startup.component.css']
})
export class ApprovelStartupComponent implements OnInit ,OnDestroy {
  dataSource = new MatTableDataSource<Startup>([]);
  toApproveStartup:any;
  userData:any;
  loading= true;
  displayedColumns: string[] = ['name','sector', 'emailaddress', 'city','actions'];
   key:string='';
   loader=true;
   subject = new Subject();

constructor( private _startupsService: StartupsService,
   private router:Router,  private _authService:AuthService
){

}



getAllData(){

  this._startupsService.getAllRequest()
  .pipe(takeUntil(this.subject)).subscribe((result:any) =>
  {  if(result){
    this.dataSource=new MatTableDataSource(result);
    this.dataSource._updateChangeSubscription();
    setTimeout(() => {
      this.loader=false;
    }, 1000);
  }})

}

ngOnInit(): void {
      this.getAllData();

      //this.getuserInf();
  /*this.activatedRoute.queryParams.subscribe((result)=>{
    if(result['key']){
      this.key=result['key'];
      this.getById();
    }
  })*/
}
/*getuserInf(){
  this._authService.userInfo.subscribe((user)=>{
    this.userData = user;
    console.log(this.userData );

      this.getAllData();
    })

}*/

getById(){
  this._startupsService.getByIdRequest(this.key).pipe(takeUntil(this.subject))
  .subscribe((startup:any)=>{
    if(startup){
      this.toApproveStartup=startup;
      //this.loading=false;
    }

    })
  }
  onApprovalClicked(key:any){
    this._startupsService.getByIdRequest(key).subscribe((startup)=>{
      this.toApproveStartup=startup;
      this._startupsService.create(this.toApproveStartup).then(()=>{
        this._startupsService.deleteRequest(key)})
    })



        }


       /*onApprovalClicked(key:any){
          this._startupsService.getByIdReguest(key).subscribe((startup)=>{
            this.toApproveStartup=startup
            this._startupsService.create(this.toApproveStartup).then(()=>{
              this._startupsService.deleteRequest(key)
            })

          })



              }*/
  onDeletClicked(row:Startup){
    this._startupsService.deleteRequest(row.key).then(()=>{
      window.alert('Deleted sucsesfulll')
    });
    }

    ngOnDestroy(): void {
      this.subject.next(true);
      this.subject.complete();
    }



}






