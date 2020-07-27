import { Component, OnInit,  } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  items: any;
  token;
  id_product;producto;producto_id;producto_title;producto_price;producto_addres;producto_latitude;producto_lonitude;producto_updated_at;

  constructor(private router : Router,
    private route: ActivatedRoute,
    private dataServ: AuthService) {
    var variable = this.route
    .queryParams
    .subscribe(params => {
      this.token = params['token'];
    });

    var variable2 = this.route
    .queryParams
    .subscribe(params => {
      this.id_product = params['id_product'];
    });
   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadDetalle();
  }

  loadDetalle(){
    this.items = this.dataServ.loadDetalle(this.id_product, this.token)
    .subscribe(data => {
      this.producto=data[0].message;
      this.producto_id=data[0].message.id;
      this.producto_title=data[0].message.title;
      this.producto_price=data[0].message.price;
      this.producto_addres=data[0].message.address;
      this.producto_latitude=data[0].message.latitude;
      this.producto_lonitude=data[0].message.lonitude;
      this.producto_updated_at=data[0].message.updated_at;
    }, error => { 
      console.log('error');
    });

  }

  backListado(){
    this.router.navigate(['/listado'],{ queryParams: { token: this.token } });
  }

}
