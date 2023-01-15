
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-preview-startup',
  templateUrl: './preview-startup.component.html',
  styleUrls: ['./preview-startup.component.css']
})
export class PreviewStartupComponent  implements OnInit ,OnDestroy{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataArray =new MatTableDataSource<Startup>([]);

  hidePageSize = true;
  subscription: Subscription = new Subscription();
  obs!: Observable<any>;
searchText: any;
listSectors: any[] = [];
filterdData:any[]=[];
  value: any;
  constructor(
    private _startupsService: StartupsService,
    private _sectorsService: SectorsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
startup:Startup = {
  name: '',
  sectors:[],
  websiteUrl: '',
  emailAddress: '',
};

  ngOnInit(): void {
    this.getAllStartups();
    this.getAllSectors();
  }




  getAllStartups() {
    this.subscription.add(
      this._startupsService.getAll().subscribe((result: any) =>{
        if (result) {
          this.dataArray = new MatTableDataSource(result);
          this.dataArray._updateChangeSubscription();
          this.obs = this.dataArray.connect();
          setTimeout(() => this.dataArray.paginator = this.paginator,1000)
        }
      })
    );
  }


  getAllSectors() {
    this._sectorsService.getAll().subscribe((result) => {
      if (result) {
        this.listSectors = result;
      }
    })
  ;
}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dataArray.disconnect();

  }


  onClicked(item : Startup){
    this.router.navigate(['/home/details-startup'],{
      queryParams:{
        key:item.key
      }})
  }

  filterSector(event:any){
    this._startupsService.getAll().subscribe((startups)=>{
      console.log(startups)
this.filterdData=[];
if (event.value ==="all"){
  this.dataArray = new MatTableDataSource(startups);
}else{
  this.filterdData= startups.filter((startups:any)  =>
  Object.values(startups.sectors[0]).includes(event.value)
  );
  this.dataArray=new MatTableDataSource(this.filterdData)
}
}
  )}

}
