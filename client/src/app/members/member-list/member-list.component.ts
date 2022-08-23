import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/models/Member';
import { PageParams } from 'src/app/models/PageParams';
import { Pagination } from 'src/app/models/Pagination';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: Member[];
  user: User;
  pagination: Pagination;
  pageParams: PageParams;
  genderList = [
    { value: 'male', display: 'Male' },
    { value: 'female', display: 'Female' },
  ];

  constructor(private memberService: MembersService) {
    this.pageParams = this.memberService.getParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.setParams(this.pageParams);
    this.memberService.getMembers(this.pageParams).subscribe((result) => {
      this.members = result.items;
      this.pagination = result.pagination;
    });
  }

  pageChanged(event: any) {
    this.pageParams.currentPageNumber = event.page;
    this.memberService.setParams(this.pageParams);
    this.loadMembers();
  }

  resetFilters() {
    this.pageParams = this.memberService.resetParams();
    this.loadMembers();
  }
}
