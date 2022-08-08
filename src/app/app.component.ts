import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IpService } from './services/ip.service';
import { FormsModule } from '@angular/forms';
import { isIP } from 'is-ip';
import { MapComponent } from './components/map/map.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles.scss', './app.component.scss']
})


export class AppComponent implements OnInit {


  ipData?: any;
  @Output() regionData?: any;
  @ViewChild(MapComponent) map!: MapComponent;


  searchFormInput?: any = '';

  constructor(private ipService: IpService) { }




  ipSub?: Subscription;
  ngOnInit(): void {
     this.ipSub = this.ipService.getClientIp().subscribe(
       res=>{
        this.ipData = res;
 
        this.searchFormInput = this.ipData.ip;
 
        this.ipService.getClientRegion(this.ipData.ip).subscribe(
         resp=>{
           console.log(resp);
           this.regionData = resp;
         }
        )
       }
     )
  }


  searchIP(event: Event): void {

    if (isIP(this.searchFormInput)) {
      this.ipService.searchCustomIp(this.searchFormInput).subscribe(
        res => {
          this.regionData = res;
          console.log(res);
          this.map.resetMap();
          this.map.refreshLocation(this.regionData);
          this.map.addLocation(this.regionData);
        }
      )

    } else {
      this.ipService.searchCustomDomain(this.searchFormInput).subscribe(
        res => {
          this.regionData = res;
          console.log(res);
          this.map.resetMap();
          this.map.refreshLocation(this.regionData);
          this.map.addLocation(this.regionData);
        }
      )
    }

  }

}
