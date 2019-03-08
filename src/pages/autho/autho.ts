import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseService} from '../services/firebase.service';
@Component({
  selector: 'page-autho',
  templateUrl: 'autho.html'
})
export class AuthoPage {
  selectedItem: any;
  items: Array<{title: string, approved: boolean, date: string}>;
  oldLen:number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase:FirebaseService) {
    this.items = [];
    this.selectedItem = {'approved' : false};
    this.oldLen = 0;
  }
  ionViewWillEnter(){
    
    this.firebase.getDocsToApprove().subscribe((res:any[])=>{
       this.items = res;
    //   if(this.oldLen === 0) {
    //     this.oldLen = res.length;  
    //   } else {
    //     this.checkNewEnteryAdded(this.oldLen, res.length, this.items);
    //   }
     });
     this.firebase.getNewAddedRecord().subscribe(res=>{
       console.log("new added record ", res);
     })
  }
  // checkNewEnteryAdded(oldLen, newLen, data){
  //   if(oldLen < newLen) {
  //     console.log("New Recoed Added ", data[data.length - 1]);
  //   }
  // }
  itemTapped(event, item) {
    this.selectedItem = item;
  }
}
