import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credencias.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO ={
    email : "",
    senha :""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }


  login() {
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage') // *laze loadind navegando pelo nome da pagina (string) 

  }
}