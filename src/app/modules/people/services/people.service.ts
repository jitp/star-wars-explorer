import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { People } from '@modules/people/models/people.model';
import { environment } from '@env/environment';
import { Person } from '../models';

@Injectable()
export class PeopleService {
  readonly baseUrl = environment.starWarsApi.baseUrl;

  constructor(protected http: HttpClient) {}

  list(page: string | null = null): Observable<People> {
    let url = `${this.baseUrl}/people`;

    if (page) {
      url = page;
    }

    return this.http.get<People>(url);
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.baseUrl}/people/${id}`);
  }
}
