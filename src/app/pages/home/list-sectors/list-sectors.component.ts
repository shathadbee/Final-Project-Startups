import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
@Component({
  selector: 'app-list-sectors',
  templateUrl: './list-sectors.component.html',
  styleUrls: ['./list-sectors.component.css']
})
export class ListSectorsComponent  implements OnInit , OnDestroy {
  subscription: Subscription = new Subscription();
  subject = new Subject();
  dataArray:any;
  constructor(
   private _sectorsService:SectorsService){

  }
  ngOnInit(): void {
   this.getAllSectors()
  }
  getAllSectors(){
    this.subscription.add(
      this._sectorsService.getAll().pipe(takeUntil(this.subject)).subscribe((result: any) => {
        if (result) {
          this.dataArray = result;
         }
        })
      );
  }


  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }

}
