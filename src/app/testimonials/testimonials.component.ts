import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  testimonials: Object[];

  constructor(private firebaseService: FirebaseService) {
    this.testimonials = [];
  }

  ngOnInit(): void {
    this.getTestimonialsFromDatabase();
  }

  getStars(testinmonial: any): any {
    const numStars = testinmonial.rating;
    const starArray = [];
    for (let i = 0; i < numStars; i++) {
      starArray.push('star');
    }
    return starArray;
  }

  getTestimonialsFromDatabase() {
    this.firebaseService.getTestimonials().then(values => {
      values.forEach(value => {
        this.testimonials.push(value.toJSON());
      })
    });
  }

}
