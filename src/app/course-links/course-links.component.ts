import { Component, OnInit } from '@angular/core';
import CourseLinks from '../course-links/course-links.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { CourseLinksService } from '../service/course_links.service';

@Component({
  selector: 'app-course-links',
  templateUrl: './course-links.component.html',
  styleUrls: ['./course-links.component.css']
})
export class CourseLinksComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private CourseLinksService: CourseLinksService) { }

  ngOnInit(): void {
  }
  
  getCourselinks(): CourseLinks[]{
    return this.CourseLinksService.getCourse_Links();
  }

  toggleAdminView(index: number): void{
    let editButton = <HTMLElement>document.getElementsByClassName("courseLinksEditButton").item(index);
    let saveButton = (document.getElementById("courseLinksAddButton"));

    if (localStorage.getItem("userType") === "admin"){
      editButton.style.display = 'block';
      saveButton.style.display = 'block';
    }
    else{
      editButton.style.display = 'none';
      saveButton.style.display = 'none';
    }
  }

  toggleEditCourseLinks(index: number): void{
    
    let editButton = <HTMLElement>document.getElementsByClassName("courseLinksEditButton").item(index);
    let viewButton = <HTMLElement>document.getElementsByClassName("courseLinksSaveButton").item(index);
    let newTitle = <HTMLElement>document.getElementsByClassName("newTitle").item(index);
    let newLink = <HTMLElement>document.getElementsByClassName("newLink").item(index);
    let oldTitle = <HTMLElement>document.getElementsByClassName("oldTitle").item(index);
    let oldLink = <HTMLElement>document.getElementsByClassName("oldLink").item(index);

    if (viewButton.style.display == 'none' && localStorage.getItem("userType") === "admin"){
      viewButton.style.display = 'block';
      editButton.style.display = 'none';
      newTitle.style.display = 'block';
      oldTitle.style.display = 'none';
      newLink.style.display = 'block';
      oldLink.style.display = 'none';
    }else{
      viewButton.style.display = 'none';
      editButton.style.display = 'block';
      newTitle.style.display = 'none';
      oldTitle.style.display = 'block';
      newLink.style.display = 'none';
      oldLink.style.display = 'block';
    }
  }

  toggleform(){
    let formButton = (document.getElementById("courseLinksForm"));

    if(formButton.style.display == 'none'){
      formButton.style.display = 'block';
    }else{
      formButton.style.display = 'none';
    }
  }

  updateCourseLinks(index: number, CourseLinks: CourseLinks){
  
    let title = (<HTMLInputElement>document.getElementsByClassName("newTitle").item(index)).value;

    let link = (<HTMLInputElement>document.getElementsByClassName("newLink").item(index)).value;

    if (link != '' && title != '') {
    this.CourseLinksService.updateCourseLinks(CourseLinks, {title: title, link: link})
    }
  }

  addCourseLinks(){
    let CourseLink = new CourseLinks;

    CourseLink.title = (<HTMLInputElement>document.getElementById("formTitle")).value;
    CourseLink.link = (<HTMLInputElement>document.getElementById("formLink")).value;



    if(CourseLink.title != '' && CourseLink.link != ''){
      this.CourseLinksService.createCourseLinks(CourseLink);
    }

    console.log(CourseLink.link);
  }

  deleteCourseLinks(CourseLinks: CourseLinks){
    this.CourseLinksService.deleteCourseLinks(CourseLinks);
  }
}