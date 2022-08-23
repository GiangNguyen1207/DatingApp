import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/Member';
import { PageParams } from '../models/PageParams';
import { PagedResult } from '../models/Pagination';
import { User } from '../models/User';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  user: User;
  memberCache = new Map();
  pageParams: PageParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.pageParams = new PageParams(user);
    });
  }

  getParams() {
    return this.pageParams;
  }

  setParams(newParams: PageParams) {
    this.pageParams = newParams;
  }

  resetParams() {
    this.pageParams = new PageParams(this.user);
    return this.pageParams;
  }

  getMembers(pageParams: PageParams) {
    var response = this.memberCache.get(Object.values(pageParams).join('-'));
    if (response) return of(response);

    let params = this.getPaginationHeader(
      pageParams.currentPageNumber,
      pageParams.pageSize
    );

    params = params.append('minAge', pageParams.minAge.toString());
    params = params.append('maxAge', pageParams.maxAge.toString());
    params = params.append('gender', pageParams.gender);
    params = params.append('orderBy', pageParams.orderBy);

    return this.getPagedResult<Member[]>(this.baseUrl + 'users', params).pipe(
      map((response) => {
        this.memberCache.set(Object.values(pageParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, element) => arr.concat(element.items), [])
      .find((user: User) => user.username === username);
    console.log(member);
    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + `users/${username}`);
  }

  editMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + `users/set-main-photo/${photoId}`, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + `users/delete-photo/${photoId}`);
  }

  private getPaginationHeader(currentPageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('currentPageNumber', currentPageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }

  private getPagedResult<T>(url: string, params: HttpParams) {
    const pagedResult: PagedResult<T> = new PagedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response) => {
        pagedResult.items = response.body;
        const paginationHeader = response.headers.get('Pagination');
        if (paginationHeader !== null) {
          pagedResult.pagination = JSON.parse(paginationHeader);
        }

        return pagedResult;
      })
    );
  }
}
