import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../service/clientdash.service';

@Component({
  selector: 'app-client-dash',
  templateUrl: './client-dash.component.html',
  styleUrls: ['./client-dash.component.css']
})
export class ClientDashComponent implements OnInit {
  RFPs: Object[];

  constructor(private firebaseService: FirebaseService) {
    this.RFPs = [];
  }
  public isCollapsed1 = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  public isCollapsed4 = true;

  ngOnInit(): void {
    if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "client")) {
      window.location.href = "/";
    }
    this.getRFPsFromDatabase();
  }

  getRFPsFromDatabase() {
    this.firebaseService.getRFPs().then(values => {
      values.forEach(value => {
        this.RFPs.push(value.toJSON());
      })
    });
  }



}
