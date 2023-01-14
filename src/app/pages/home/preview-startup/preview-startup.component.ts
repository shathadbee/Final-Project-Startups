
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
  dataArray = new MatTableDataSource<Startup>([]);
  hidePageSize = true;
  subscription: Subscription = new Subscription();
  obs!: Observable<any>;


  constructor(
    private _startupsService: StartupsService,

    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllStartups();
  }




  getAllStartups() {
    this.subscription.add(
      this._startupsService.getAll().subscribe((result: any) => {
        if (result) {
          this.dataArray = new MatTableDataSource(result);
          this.dataArray._updateChangeSubscription();
          this.obs = this.dataArray.connect();
          setTimeout(() => this.dataArray.paginator = this.paginator,1000)
        }
      })
    );
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

}


