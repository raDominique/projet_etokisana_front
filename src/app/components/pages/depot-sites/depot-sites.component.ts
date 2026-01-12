import { Component, OnInit } from '@angular/core';
import * as l from 'leaflet' ;
import { HeaderComponent } from '../../partials/header/header.component';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from 'src/app/services/site.service';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule } from '@angular/google-maps';
@Component({
  selector: 'app-depot-sites',
  standalone: true,
  imports: [
    HeaderComponent,
    MatTableModule,
    MatIconModule,
    GoogleMapsModule,
  ],
  templateUrl: './depot-sites.component.html',
  styleUrl: './depot-sites.component.css'
})
export class DepotSitesComponent implements OnInit{
  sites:any[]=[];
  latitude:number=0;
  longitude:number=0;
  displayedColumns: string[] = ['Nom du Site','Adresse', 'Latitude', 'Longitude','Action'];
  map:any;
  marker:any = null;
  prestataireId!:string;
  typeES !: string;
  productId !:string;
  position !: google.maps.LatLngLiteral;
  center : google.maps.LatLngLiteral = {
    lat:-19.0000000,lng : 48.0000000,
  };
  constructor(
    private router:Router,
    private siteService:SiteService,
    private activatedRoute:ActivatedRoute
  ){
    this.activatedRoute.params.subscribe(params =>{
      this.prestataireId = params['id'];
      this.productId = params['productId']
      this.typeES = params["typeES"];
      console.log(this.typeES);
    })
    this.siteService.getSiteByUserId(this.prestataireId).subscribe(mesSite =>{
      if (mesSite) {
        this.sites=mesSite;        
      }
    })
  }
  ngOnInit() : void{
  }

    localise(lat:any,lng:any){
      this.latitude = lat;
      this.longitude = lng;
      // if (this.marker !== null) {
      //       this.map.removeLayer(this.marker)
      //     }
      //     this.marker = l.marker([this.latitude,this.longitude]).addTo(this.map);
      //     this.map.setView([this.latitude,this.longitude],2000)
      this.position = {lat : this.latitude,lng:this.longitude}
    }
    chooseSite(siteId:string){
      if (this.typeES == "depot") {
        this.router.navigateByUrl("/depot/"+siteId+"/"+this.productId)
      }
      
    }
}
