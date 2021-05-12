import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/past.service';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css'],
})
export class PastComponent implements OnInit {
  projects: Object[];

  hide=[];

  showDiv = {
    fall: true,
    summer: true,
  };

  constructor(private firebaseService: FirebaseService) {
    this.projects = [];
  }

  ngOnInit(): void {
    this.getPastFromDB();
  }
  getPastFromDB() {
    this.firebaseService.getPast().then((values) => {
      values.forEach((value) => {
        this.projects.push(value.toJSON());

      });
    });
  }
}
