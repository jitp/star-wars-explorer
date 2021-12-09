import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Planet, Planets } from '../models';

@Injectable()
export class PlanetService {
  readonly baseUrl = environment.starWarsApi.baseUrl;

  constructor(protected http: HttpClient) {}

  list(page: string | null = null): Observable<Planets> {
    let url = `${this.baseUrl}/planets`;

    if (page) {
      url = page;
    }

    return this.http.get<Planets>(url);
  }

  getPlanet(id: string): Observable<Planet> {
    return this.http.get<Planet>(`${this.baseUrl}/planets/${id}`);
  }
}
