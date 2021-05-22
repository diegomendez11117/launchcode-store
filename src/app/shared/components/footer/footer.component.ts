import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailInput: FormControl;

  constructor() { 
    this.emailInput = new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      Validators.email
    ]);
    this.emailInput.valueChanges
    .subscribe(value => {})
   }

  ngOnInit() {
  }


  registerMail() {
    if (this.emailInput.invalid) {
      alert("Please the email is incorrect");
    }
  }

}
