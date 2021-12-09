import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { Movie, Movies } from "../models";

@Injectable()
export class MovieService {
  readonly baseUrl = environment.starWarsApi.baseUrl;

  constructor(protected http: HttpClient) {}

  list(page: string | null = null): Observable<Movies> {
    let url = `${this.baseUrl}/films`;

    if (page) {
      url = page;
    }

    return this.http.get<Movies>(url);
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/films/${id}`);
  }
}