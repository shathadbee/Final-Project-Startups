import { Component, OnDestroy, OnInit ,ViewChild} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sectors } from 'src/app/core/interfaces/sectors.interfaace';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent  implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
@ViewChild(MatPaginator) paginator!: MatPaginator;
loader=true;
//,'categoryName'
  displayedColumns :String[] =['name','color','sectors','actions'];
  dataSource = new MatTableDataSource<Sectors>([]);
  loading=true;
  userData:any;
  constructor(
  private router:Router,
  private _sectorsService:SectorsService,
  private _authService:AuthService
  ){}



  ngOnInit(): void {

    this.getuserInf()
    setTimeout(() => {
      this.loader=false;
    }, 1000);
  }


  getuserInf(){

    this._authService.userInfo.subscribe((user)=>{
      this.userData = user;
      console.log(this.userData );

        this.getAllData();
      })

  }


getAllData(){
  this.subscription.add(
  this._sectorsService.getAll().subscribe((result:any)=>{
    if(result){
    this.dataSource =new MatTableDataSource(result);
    console.log(result);
    setTimeout(()=> this.dataSource.paginator = this.paginator,1000)
    this.dataSource._updateChangeSubscription();

  }

  }) )
}
onRowClicked(row : Sectors){
  this.router.navigate(['/sectors/details-sector'],{
    queryParams:{
      key:row.key
    }})
}


onEditClicked(row :Sectors ){
  this.router.navigate(['/sectors/update-sector'],{
  queryParams:{
    key:row.key
  }})
}

onDeletClicked(row:Sectors){
this._sectorsService.delete(row.key).then(()=>{
  window.alert('Deleted sucsesfulll')
});
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if(this.dataSource.paginator){
    this.dataSource.paginator.firstPage();
  }
}

onAddClicked(){
   this.router.navigate(['/sectors/add-sectors']);
}


ngOnDestroy(): void {
  this.subscription.unsubscribe();
  this.dataSource.disconnect();
}
}
