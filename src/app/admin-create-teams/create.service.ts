import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreateTeam {

  constructor(private db: AngularFireDatabase) {}

  makeTeam(Group: Object){
    this.db.database.ref('Groups/').push(Group);
  }

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    desc: new FormControl('')
  })

}