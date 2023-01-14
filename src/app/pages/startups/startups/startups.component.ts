import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import *as _ from 'lodash';
import { values } from 'lodash';

@Component({
  selector: 'app-startups',
  templateUrl: './startups.component.html',
  styleUrls: ['./startups.component.css']
})
export class StartupsComponent  implements OnInit , OnDestroy {
  userData:any;
 //, 'emailaddress'
  displayedColumns: string[] = ['name', 'sector' , 'emailaddress', 'city'];
  dataSource = new MatTableDataSource<Startup>([]);

  loader=true;
  subject = new Subject();
  listSectors: any[] = [];
  filterdData:any[]=[];

 // subscription: Subscription= new Subscription();

constructor(  private _sectorsService: SectorsService,
   private _startupsService:StartupsService,
    private router:Router
    ,private _authService:AuthService ){



}

@ViewChild(MatPaginator) paginator!: MatPaginator;



ngOnInit(): void {
    this._authService.userInfo.subscribe((user)=>{

      this.displayedColumns= ['name' , 'emailaddress','sector', 'city'];
      this.userData=user;
      console.log(this.userData);
      if(this.userData.role){
        if(this.userData.role ==='admin'){
          this.displayedColumns.push('actions')
        }        this.getAllData();
        setTimeout(() => {
          this.loader=false;
        }, 1000);
      }

      })
     this.getAllSectors()
}


getAllData(){
    this._startupsService.getAll().pipe(takeUntil(this.subject)).subscribe((result:any)=>

    {
       if(result){
      this.dataSource=new MatTableDataSource(result);
      setTimeout(()=> this.dataSource.paginator = this.paginator,1000)
      this.dataSource._updateChangeSubscription();

    }

  })
}

applyFilter($event:any){
const filterValue=($event.target as HTMLInputElement).value;
this.dataSource.filter=filterValue.trim().toLowerCase();

if(this.dataSource.paginator){
  this.dataSource.paginator.firstPage();
}
  }


onAddClicked(){
  this.router.navigate(['/startups/add-startup']);
}
onEditClicked(row : Startup){
  this.router.navigate(['/startups/update-startup'],{
  queryParams:{
    key:row.key
  }})
}

onDeletClicked(row:Startup){
this._startupsService.delete(row.key).then(()=>{
  window.alert('Deleted sucsesfulll')
});
}

onRowClicked(row : Startup){
  this.router.navigate(['/startups/details-startup'],{
    queryParams:{
      key:row.key
    }})
}



onRequestAddStartup(){
  this.router.navigate(['/startups/request-startup'] );
}


  getAllSectors() {
      this._sectorsService.getAll().pipe(takeUntil(this.subject)).subscribe((result) => {
        if (result) {
          this.listSectors = result;
        }
      })
    ;
  }


  filterSector(event:any){

    this._startupsService.getAll().subscribe((startups)=>{

this.filterdData=[];
if (event.value ==="all"){
  this.dataSource = new MatTableDataSource(startups);
}else{
  this.filterdData= startups.filter((startups:any)  =>
  Object.values(startups.sectors[0]).includes(event.value)
  );
  this.dataSource=new MatTableDataSource(this.filterdData)
}
    })


  }




ngOnDestroy(): void {
  this.subject.next(true);
  this.subject.complete();

   }

}
