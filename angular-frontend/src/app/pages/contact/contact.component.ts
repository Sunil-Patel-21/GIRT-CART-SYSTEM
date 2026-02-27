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
  
  isLoading = false;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.isLoading = true;
      this.http.post('http://localhost:4000/api/contact/send', this.formData)
        .subscribe({
          next: (response: any) => {
            this.isLoading = false;
            if (response.success) {
              this.toastr.success('Thank you for contacting us! We will get back to you soon.', 'Message Sent');
              this.formData = { name: '', email: '', phone: '', message: '' };
            } else {
              this.toastr.error(response.message, 'Error');
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error(error);
            this.toastr.error('Failed to send message. Please try again.', 'Error');
          }
        });
    } else {
      this.toastr.error('Please fill all required fields', 'Error');
    }
  }
}
