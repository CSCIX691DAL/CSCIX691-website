import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/testimonial.service';

@Component({
  selector: 'app-testimonialsPage',
  templateUrl: './testimonialsPage.component.html',
  styleUrls: ['./testimonialsPage.component.css']
})
export class TestimonialsPageComponent implements OnInit {
  testimonials: Object[];

  constructor(private firebaseService: FirebaseService) {
    this.testimonials = [];
  }

  ngOnInit(): void {
    this.getTestimonialsFromDatabase();
  }

  getStars(testimonial: any): any {
    const numStars = testimonial.rating;
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
