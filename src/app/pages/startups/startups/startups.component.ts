import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-startups',
  templateUrl: './startups.component.html',
  styleUrls: ['./startups.component.css']
})
export class StartupsComponent  implements OnInit , OnDestroy {
  userData:any;
  displayedColumns: string[] = ['name', 'sector', 'emailaddress', 'city'];
  dataSource = new MatTableDataSource<Startup>([]);
  loading= true;
  subscription: Subscription= new Subscription();

constructor( private _startupsService:StartupsService, private router:Router,private _authService:AuthService ){}

@ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
ngOnInit(): void {
  this.subscription.add(
    this._authService.userInfo.subscribe((user)=>{
      this.userData=user;
      console.log(this.userData);
      if(this.userData.role){
        if(this.userData.role ==='admin'){
          this.displayedColumns.push('actions')
        }
        this.getAllData();
      }

      })
  );


}
getAllData(){
  this.subscription.add(
    this._startupsService.getAll().subscribe((result:any)=>

    {  if(result){
      this.dataSource=new MatTableDataSource(result);
      this.dataSource.paginator=this.paginator;
      this.dataSource._updateChangeSubscription();
      this.loading=false;
    }
  }),
  );

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


ngOnDestroy(): void {
  this.subscription.unsubscribe();


   }

}
