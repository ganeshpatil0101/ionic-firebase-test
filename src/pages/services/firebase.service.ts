import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from "rxjs/Observable"
@Injectable()
export class FirebaseService {
    
  private snapshotChangesSubscription: any;
  private snapshotChangesSubautho: any;
  constructor(public afs: AngularFirestore){  }

  getDocs(){
      //let currentUser = firebase.auth().currentUser;
      return new Observable((observer) => {
      this.snapshotChangesSubscription = this.afs.collection('product', ref => ref.orderBy('name', 'desc')).snapshotChanges()
      .subscribe(snapshots => {
            let data = snapshots.map(action => {
              const data = action.payload.doc.data() as any;
              const id = action.payload.doc.id;
              return { id, ...data };
            });
            observer.next(data);
      });
    });
  }
  getDocsToApprove() {
    return new Observable((observer) => {
      this.snapshotChangesSubautho = this.afs.collection('autho').snapshotChanges()
      .subscribe(snapshots => {
            let data = snapshots.map(action => {
              const data = action.payload.doc.data() as any;
              const id = action.payload.doc.id;
              return { id, ...data };
            });
            observer.next(data);
      });
    });
  }
  getNewAddedRecord() {
    return new Observable((observer) => {
      this.afs.collection('autho').stateChanges([ 'added' ])
        .subscribe(snap => {
            let data = snap.map(a => {
              const data = a.payload.doc.data() as any;
              const id = a.payload.doc.id;
              const type = a.type;
              return { id, type, ...data };
            });
            observer.next(data);
        });
    });
  }
  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    // debugger;
    if(this.snapshotChangesSubscription) {
      this.snapshotChangesSubscription.unsubscribe();
    }
    if(this.snapshotChangesSubautho) {
      this.snapshotChangesSubautho.unsubscribe();
    }
  }

  updateTask(taskKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
/*
  deleteTask(taskKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createTask(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').add({
        title: value.title,
        description: value.description,
        image: value.image
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
          .then(res => resolve(res))
        }, err => {
          reject(err);
        })
      })
    })
  }

*/

}