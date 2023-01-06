import { Component, OnChanges, OnDestroy, OnInit ,SimpleChanges,ViewChild} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sectors } from 'src/app/core/interfaces/sectors.interfaace';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent  implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns :String[] =['name','color','sectors','categoryName','actions'];
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
  }


  getuserInf(){
    this._authService.userInfo.subscribe((user)=>{
      this.userData = user;
      console.log(this.userData );

        this.getAllData();
      })

  }


getAllData(){
  this._sectorsService.getAll().subscribe((result:any)=>{
    if(result){
    this.dataSource =new MatTableDataSource(result);
    console.log(result);
    this.dataSource.paginator =this.paginator;
    this.dataSource._updateChangeSubscription();
    this.loading=false;
  }
  })
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
}

onAddClicked(){
   this.router.navigate(['/sectors/add-sectors']);
}







}
