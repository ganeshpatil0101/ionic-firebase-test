import { NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { ListPage } from '../../pages/list/list';
import { LoginPage } from '../../pages/login/login';
import {AuthService} from '../services/auth.service';
import {DashPage} from '../../pages/dash/dash';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  homePage: any = DashPage;

  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, private authService: AuthService) {
    this.pages = [
      { title: 'Dash', component: DashPage },
      { title: 'List', component: ListPage }
    ];
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout(){
    this.authService.doLogout()
    .then(res => {
      this.navCtrl.push(LoginPage);
    }).catch((err)=>{
      console.error(err);
    })
  }
}
