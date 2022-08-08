import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map: any;

  @Input() coordinates?: any;


  
  constructor() { }

  private initMap(): void {

    this.map = L.map('map', {
      center: [this.coordinates?.location.lat, this.coordinates?.location.lng],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      minZoom: 12,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  resetMap():void{

    this.map.off();
    this.map.remove();
  }


  refreshLocation(newCoordinates: any){
    this.map = L.map('map', {
      center: [newCoordinates.location.lat, newCoordinates.location.lng],
      zoom: 3
    });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      minZoom: 12,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  


  ngOnInit(): void {
    this.initMap();
    this.addLocation(this.coordinates);
  }



  addLocation(coordinates: any): void{
    let PinIcon: any = L.Icon.extend({
      options: {
        iconSize: [38, 45],
        iconAnchor: [19, 45],
        popupAnchor: [99, 250]
      }
    });

   const blackIcon = new PinIcon(
      {
        
          iconUrl: 'assets/images/icon-location.svg',
          className: 'icon-location'
      })


    const marker = L.marker([coordinates?.location.lat, coordinates?.location.lng],{
      icon: blackIcon
    }).addTo(this.map);
 
  }
 

}
