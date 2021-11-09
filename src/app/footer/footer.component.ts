import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ContactService} from '../service/contact.service';
import Contact from '../footer/contact.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  openModal = false;
  closeResult: string;

  constructor(private data: DataService, private contact: ContactService, private modalService: NgbModal) { }

  open(content) {
    this.openModal = !this.openModal;
    this.data.openCloseModal(this.openModal);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  ngOnInit(): void {
    this.data.currentModalState.subscribe(openModal => this.openModal = openModal);
  }

  toggleEditContact(): void{
    let editButton = (document.getElementById("editButtonFooter"));
    let viewButton = (document.getElementById("saveButtonFooter"));
    let newEmail = (document.getElementById("newEmail"));
    let newPhone = (document.getElementById("newPhone"));
    let currentEmail = (document.getElementById("currentEmail"));
    let currentPhone = (document.getElementById("currentPhone"));
    if (viewButton.style.display == 'none' && localStorage.getItem("userType") === "admin"){
      viewButton.style.display = 'block';
      editButton.style.display = 'none';
      newEmail.style.display = 'block';
      currentEmail.style.display = 'none';
      newPhone.style.display = 'block';
      currentPhone.style.display = 'none';
    }else {
      viewButton.style.display = 'none';
      editButton.style.display = 'block';
      newEmail.style.display = 'none';
      currentEmail.style.display = 'block';
      newPhone.style.display = 'none';
      currentPhone.style.display = 'block';
    }
  }

checkingAdmin(){
  let editButton = (document.getElementById("editButtonFooter"));
  if (localStorage.getItem("userType") === "admin"){
    editButton.style.display = 'block';
  }
  else{
    editButton.style.display = 'none';
  }
}

getContact(): Contact[]{
  let newContact = this.contact.getContacts();
  return newContact;
}

updateContact(){

  let newContact = this.contact.getContacts();

  let email = (<HTMLInputElement>document.getElementById("newEmail")).value;

  let phone = (<HTMLInputElement>document.getElementById("newPhone")).value;
  
  this.contact.updateContact(newContact[0], {Email: email, Phone: phone})
}

}
