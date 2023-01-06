import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sectors } from 'src/app/core/interfaces/sectors.interfaace';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';

@Component({
  selector: 'app-sector-details',
  templateUrl: './sector-details.component.html',
  styleUrls: ['./sector-details.component.css']
})
export class SectorDetailsComponent implements OnInit {

sector:Sectors= {
  name:'',
  logo:'',
  color:'',
  sectors:'',
  categoryName:'',
}

  loading=true;
  key:string='';
  constructor(private  activatedRoute:ActivatedRoute ,
    private _sectorsService:SectorsService,    ){ }





  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((result)=>{
      if(result['key']){
        this.key=result['key'];
        this.getById();
      }
    })
  }
  getById(){
    this._sectorsService.getById(this.key).subscribe((result:any)=>{
      if(result){
        this.sector=result;
        this.loading=false;
      }

      })

    }
}
