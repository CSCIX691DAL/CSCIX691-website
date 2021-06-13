import { Component, OnInit } from '@angular/core';
import Announcement from '../announcement/announcement.model';
import { AnnouncementService } from '../service/announcement.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
  }
  getAnnouncement(): Announcement[]{
    return this.announcementService.getAnnouncements().reverse();
  }
}
