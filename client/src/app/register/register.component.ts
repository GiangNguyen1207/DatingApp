import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  submit() {
    this.accountService.register(this.model).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
    this.cancel();
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
