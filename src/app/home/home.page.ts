import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NavController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  picture;
  name;
  email;
  mostrar_exit:boolean=false;mostrar_login:boolean =true;token;

  constructor( 
    private afAuth: AngularFireAuth,  
    private router : Router,
    private dataServ: AuthService,
  ) {}

  async loginGoogle() {
    const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = res.user;
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
    this.token=user.refreshToken;
    if(this.email!=null&&this.email!=null&&this.email!=''){
      this.mostrar_exit=true;
      this.mostrar_login=false;
      this.loginApiLocal(this.token);
    }
  
    
 }

 ngOnInit() {
  this.picture='';
  this.name='';
  this.email='';
}

 logout(){
  this.afAuth.signOut().then(() => {
    this.router.navigate(['/home']);   
      this.ngOnInit();
      this.mostrar_exit=false;   
      this.mostrar_login=true; 
  }
  );
  }


  verListado(){
    this.router.navigate(['/listado'],{ queryParams: { token: this.token } });
  }

  loginApiLocal(token){
    var token_reg ={
      "token": token
    }
    this.dataServ.loginApiLocal(token_reg).subscribe(data => {
      setTimeout(() => {
   
    }, 3000);
      }, error => {
        console.log(error);
      });
  }


}
