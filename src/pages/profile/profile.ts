import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  cliente: ClienteDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localuser = this.storage.getlocaluser();
    if (localuser && localuser.email) {
      this.clienteService.findByEmail(localuser.email)
        .subscribe(response => {
          this.cliente = response;
          //buscar imagem
          this.getImageIfExists();
        },
          error => { });
    }
  }
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.buketBaseUrl}/cp${this.cliente.id}.jpg`;
      }

      )
  }

}
