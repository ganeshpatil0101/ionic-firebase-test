import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseService} from '../services/firebase.service';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase:FirebaseService) {
    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
    this.items = [];
  }
  ionViewWillEnter(){
    
    this.firebase.getDocs().subscribe((res:any[])=>{
      this.items = [];
      for (let i = 0; i < res.length; i++) {
        this.items.push({
          title: res[i].name,
          note: res[i].name,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
      }   
    })
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.selectedItem = item;
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
  }
}
