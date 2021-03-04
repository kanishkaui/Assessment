import { Component, Input, OnInit } from '@angular/core';
import { QuestionanaireModel } from '../models/questionnaire';

@Component({
  selector: 'app-answer',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent {

  @Input() formData: QuestionanaireModel = QuestionanaireModel.creatBlankQuestionnaire();
  dateFl = new Date().toJSON().substring(0, 10);

}

