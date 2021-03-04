import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor(private http: HttpClient) { }

  loadQuestionData() {
    return this.http.get('../assets/questionnaire.json');
  }
}
