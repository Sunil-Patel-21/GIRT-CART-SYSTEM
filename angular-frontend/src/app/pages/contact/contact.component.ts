import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      console.log('Contact form submitted:', this.formData);
      this.toastr.success('Thank you for contacting us! We will get back to you soon.', 'Message Sent');
      this.formData = { name: '', email: '', phone: '', message: '' };
    } else {
      this.toastr.error('Please fill all required fields', 'Error');
    }
  }
}
