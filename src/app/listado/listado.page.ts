import { Component, OnInit,  } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  items: any;
  items2;
  token;

  constructor(private router : Router,
    private route: ActivatedRoute,
    private dataServ: AuthService) { 

      var variable = this.route
      .queryParams
      .subscribe(params => {
        this.token = params['token'];
      });
    }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadListado();
  }

  goDetalle(id){
    this.router.navigate(['/detalle'],{ queryParams: { token: this.token, id_product: id } });
  }

  loadListado(){
    this.items = this.dataServ.verListado(this.token)
    .subscribe(data => {
      this.items2= data[0].message;
    }, error => { 
      console.log('error');
    });

  }

}
