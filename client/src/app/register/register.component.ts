import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private accountService: AccountService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  submit() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        this.cancel();
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
