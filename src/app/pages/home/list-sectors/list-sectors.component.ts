import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
@Component({
  selector: 'app-list-sectors',
  templateUrl: './list-sectors.component.html',
  styleUrls: ['./list-sectors.component.css']
})
export class ListSectorsComponent  implements OnInit , OnDestroy {
  subscription: Subscription = new Subscription();

  dataArray:any;
  constructor(
   private _sectorsService:SectorsService){

  }
  ngOnInit(): void {
   this.getAllSectors()
  }
  getAllSectors(){
    this.subscription.add(
      this._sectorsService.getAll().subscribe((result: any) => {
        if (result) {
          this.dataArray = result;
         }
        })
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
