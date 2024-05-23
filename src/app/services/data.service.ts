import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MedicalCases } from '../models/med-case';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  public getEtudesDeCas(): Observable<MedicalCases> {
    return this.http.get<MedicalCases>('/assets/med-cas.json');
  }
} 