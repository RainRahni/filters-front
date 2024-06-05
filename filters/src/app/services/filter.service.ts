import { Filter } from "../models/Filter";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn:'root'
})
export class FilterService {
  private apiServerUrl = environment.apiBaserUrl;
  constructor(private http: HttpClient) { }
  public getCreatedFilters(): Observable<Filter[]> {
    return this.http.get<Filter[]>(`${this.apiServerUrl}/filter`);
  }
}
