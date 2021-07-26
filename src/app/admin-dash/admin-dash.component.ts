import { TeamService } from './../service/team.service';
import { UserService } from './../service/user.service';
import { ProjectService } from './../service/project.service';
import {Component, OnInit} from '@angular/core';
import {RfpService} from '../service/rfp.service';
import {AnnouncementService} from '../service/announcement.service';
import Announcement from "../announcement/announcement.model"
import {AuthService} from '../service/auth.service';
import {NgxCsvParser} from 'ngx-csv-parser';
import {NgxCSVParserError} from 'ngx-csv-parser';
import { User } from '../user/user.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import RFP from '../rfp/rfp.model';
import Project from '../projects/project.model';
import Team from '../team/team.model';
import { Student } from '../user/student.model';
import DueDates from '../dueDates/dueDates.model';
import { dueDateService } from '../service/duedate.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  showConfirm: boolean = false;
  studentRecords: any[] = [];
  rfpSubmissionForm: File;


  constructor(private userService: UserService,
              private authService: AuthService,
              private ngxCsvParser: NgxCsvParser,
              private rfpService: RfpService,
              private projectService: ProjectService,
              private teamService: TeamService,
              private announcementService: AnnouncementService,
              private dueDateService: dueDateService,
              private db: AngularFireDatabase) {

  }

  feedbackTeamSelect: string = '';

  ngOnInit(): void {
    if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "admin")) {
      window.location.href = "/";
    }

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  // returns a list of pending RFPs
  getPendingRFPs(): RFP[] {
    return this.rfpService.getRFPs().filter((rfp, index, array) => {
      return rfp.status == 'Pending';
    });
  }

  // returns a list of rejected RFPs
  getRejectedRFPs(): RFP[] {
    return this.rfpService.getRFPs().filter((rfp, index, array) => {
      return rfp.status == 'Rejected';
    });
  }

  // Returns a list of projects with status 'Active'
  getActiveProjects(): Project[] {
    return this.projectService.getProjects().filter((project, index, array) => {
      return project.status == 'Active';
    })
  }

  // Returns a list of projects with status 'Archived'
  getArchivedProjects(): Project[] {
    return this.projectService.getProjects().filter((project, index, array) => {
      return project.status == 'Archived';
    })
  }

  // Sets a project's status to 'Archived'
  archiveProject(project: Project) {
    this.projectService.updateProject(project, { status: 'Archived' });
  }

  // Sets an archived project's status to 'Active'
  unarchiveProject(project: Project) {
    this.projectService.updateProject(project, { status: 'Active' });
  }

  deleteMember(user: User): void { 
    // remove user from team, if applicable
    if (this.userService.isStudent(user)) {
      let student = <Student>user;
      this.teamService.removeStudentFromTeam(this.teamService.getTeamByKey(student.team), student);
    }
    // delete user from database
    this.userService.deleteUser(user);
  }

  showConfirmButton() {
    this.showConfirm = !this.showConfirm;
  }

  public onStudentCSVUpload(files: FileList) {
    this.studentRecords = [];
    console.log(files);
    if (files && files.length > 0) {
      this.ngxCsvParser.parse(files[0], {header: true, delimiter: ','})
        .pipe().subscribe((result: Array<any>) => {
        console.log('Result', result);
        this.studentRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
    }
  }

  async batchCreateStudents() {
    try {
      for (let student of this.studentRecords) {
        // generate a random password
        let randomPassword = Math.random().toString(36)
        // TODO: Add users to Team specified in CSV file once teams are implemented
        await this.authService.signupStudent(student['Email'], randomPassword, student['First Name'], student['Last Name'], student['OrgDefindID'], student['Team Leaders'].toLowerCase() == 'true');
        
        // if a project team name was specified
        if (student['Project Team']) {
          // attempt to get the team from the database
          let team = this.teamService.getTeamByName(student['Project Team']);
          // if the team does not exist
          if (!team) {
            // create the team
            team = new Team();
            team.name = student['Project Team'];
            team.members = [];
            // add the team to the database
            this.teamService.addTeam(team);
            team = null;
            // get the team from the database
            team = this.teamService.getTeamByName(student['Project Team']);
          }

          // get the newly created student from the database
          let newStudent = this.userService.getStudentByID(student['OrgDefindID']);
          // add the student to the team
          this.teamService.addStudentToTeam(team, newStudent);
        }
        // send password reset email to student
        this.authService.resetPassword(student['Email'])
        console.log(student);
      }
      alert('Students created successfully.');
    } catch(exception: any) {
      alert('An error occurred. Failed to create students.');
    } finally {
      this.studentRecords = [];
      this.showConfirm = false;
      this.ngOnInit();
    }
  }

  // Gets the uploaded RFP submission form
  onRFPSubmissionFormUpload(event) {
    this.rfpSubmissionForm = event.target.files[0];
  }

  // Saves the uploaded RFP submission form to the database
  uploadRFPSubmissionForm() {
    // read JSON file
    let fileReader = new FileReader();
    fileReader.readAsText(this.rfpSubmissionForm, "UTF-8");

    // write form to database
    fileReader.onload = (() => {
      try {
        // attempt to parse JSON file
        let form = JSON.parse(<string>fileReader.result);
        // upload form to the database
        this.rfpService.uploadSubmissionForm(form);

        alert("RFP submission form uploaded successively.");
      } catch (exception) {
        // if an error occurs, log it and alert the user
        console.log(exception);
        alert(exception);
      }
    });
    
    // if an error occurs, log it and alert the user
    fileReader.onerror = ((error) => {
      console.log(error);
      alert(error);
    });
  }

  generatePDF(rfp: RFP): void {
    const docDefinition = this.rfpService.getDocumentDefinition(rfp);
    pdfMake.createPdf(docDefinition).open();
  }

  // Set an RFP's status to approved and make it a project
  approveRFP(rfp: RFP): void {
    let t = new Team();
    //set team title to the rfp title
    t.name = rfp.projectTitle;
    //adding team to team database
    this.teamService.addTeam(t);
    // approve RFP
    this.rfpService.updateRFP(rfp, {status: 'Approved'});
    // create project out of RFP
    this.projectService.createProject(rfp);
  }

  // Set an RFP's status to rejected
  rejectRFP(rfp: RFP): void {
    this.rfpService.updateRFP(rfp, {status: 'Rejected'});
  }

  // Delete an RFP from the database
  deleteRFP(rfp: RFP): void {
    this.rfpService.deleteRFP(rfp);
  }

  toggleEditLinkTextbox(index: number): void {
    let editSection = <HTMLElement>document.getElementsByClassName("editLink").item(index);
    let viewSection = <HTMLElement>document.getElementsByClassName("viewLink").item(index);

    // if the edit section is hidden
    if (editSection.style.display == 'none') {
      // show the edit section
      editSection.style.display = 'block';
      // hide the link
      viewSection.style.display = 'none';
    } else {
      // hide the edit section
      editSection.style.display = 'none';
      // show the link
      viewSection.style.display = 'block';
      // reset the textbox's value
      (<HTMLInputElement>document.getElementsByClassName("editLinkTextbox").item(index)).value = '';
    }
  }

  editAzureLink(index: number, project: Project): void {
    // get new link from textbox
    let newLink = (<HTMLInputElement>document.getElementsByClassName("editLinkTextbox").item(index)).value;

    if (newLink != '') {
      // update the project
      this.projectService.updateProject(project, {azureLink: newLink});
    }

    // hide the edit section
    this.toggleEditLinkTextbox(index);
  }
  makeTeam(dueDates: Object){
    this.db.database.ref('DueDates').push(dueDates);
  }
  
  dueDates(){
  let dueDate = new DueDates;
  dueDate.title = (<HTMLInputElement>document.getElementById("duedatetitle")).value;
  dueDate.date = (<HTMLInputElement>document.getElementById("duedate")).value;

      if(dueDate.title == "" || dueDate.date == ""){
        window.alert("Please fill out all required sections for Due Dates");
      }
      else{
        this.makeTeam(dueDate);
      }
  }

  CreateAnnouncement() {

    let newAnnouncement = new Announcement();
    newAnnouncement.title = (<HTMLInputElement>document.getElementById("announcementTitle")).value;
    newAnnouncement.desc = (<HTMLInputElement>document.getElementById("announcementDesc")).value;
    newAnnouncement.date = Date();
    newAnnouncement.user = localStorage.getItem("name");

    if(newAnnouncement.title == "" || newAnnouncement.desc == ""){
      window.alert("Please fill out all sections");
    }
    else{
      this.announcementService.createAnnouncement(newAnnouncement);

      let users = this.userService.getUsers();

      /*The following code is commented out to avoid sending emails to test accounts. Uncomment when app is in production
      for(let x = 0; x < users.length; x++){
        if(users[x].emailList){
          this.announcementService.sendEmail(users[x].email, users[x].fName, newAnnouncement.title, newAnnouncement.desc).subscribe((response) => {
            console.log('Response from API is ', response);
          }, (error) => {
            console.log('Error is ', error);
          })
        }
      }*/

      window.alert("Your announcement has been created");
    }
  
  }

  getDueDates(): DueDates[] {
    return this.dueDateService.getdueDates();
  }

  getTeams(){
    return this.teamService.getTeamsInArray();
  }

  getTeamFeedback(event: any){
    this.feedbackTeamSelect = event;
  }

  GetfeedbackBasedOnTeam(){
    
    if(this.feedbackTeamSelect == ''){
      return null;
    }
    else if(this.feedbackTeamSelect == 'all'){
      return this.teamService.getAllFeedback();
    }
    else{
      return this.teamService.getFeedbackByTeamKey(this.feedbackTeamSelect);
    }
  }

}
