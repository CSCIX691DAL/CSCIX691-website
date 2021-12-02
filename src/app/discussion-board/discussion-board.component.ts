import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../service/discussion-users.service';
import Discussion from './discussion.model';
import { UserService } from './../service/user.service';


@Component({
  selector: 'app-discussion-board',
  templateUrl: './discussion-board.component.html',
  styleUrls: ['./discussion-board.component.css']
})
export class DiscussionBoardComponent implements OnInit {


  constructor(private discussion: DiscussionService) {
  }

  ngOnInit(): void {

  }

CreateDiscussion() {

    let newDiscussion = new Discussion();
    newDiscussion.user_designation = (<HTMLInputElement>document.getElementById("discussionTitle")).value;
    newDiscussion.discussion_text = (<HTMLInputElement>document.getElementById("discussionDesc")).value;
    newDiscussion.user_name = localStorage.getItem("name");
    newDiscussion.company_name = localStorage.getItem("org");

    if(newDiscussion.user_designation == "" ||newDiscussion.discussion_text  == ""){
      window.alert("Please fill out all sections");
    }
    else{
      this.discussion.createDiscussion(newDiscussion);

      window.alert("Your discussion has been created");
    }

  }

}
