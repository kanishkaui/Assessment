import { Component, OnInit } from '@angular/core'
import { DataTransferService } from '../data-transfer.service'
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { QuestionanaireModel } from '../models/questionnaire';

@Component({
  selector: 'app-question',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  title = 'playgroundCodeReactive'
  constructor(private service: DataTransferService, private fb: FormBuilder) { }

  questionnaire: QuestionanaireModel = QuestionanaireModel.creatBlankQuestionnaire();
  formFieldColl: any[] = []
  dynamicForm?: any
  flag = false
  qDate: string = new Date().toJSON().substring(0, 10)


  ngOnInit() {
    this.service.loadQuestionData().subscribe(response => {

      this.questionnaire = QuestionanaireModel.createQuestionnaireFromJSON(response);

      const { controls, formFieldColl } = this.questionnaire.createFormDataObject();

      this.dynamicForm = new FormGroup(controls)
      this.formFieldColl = formFieldColl
    })
  }

  submitParent() {

    this.questionnaire.addAnswers(this.dynamicForm)
    this.flag = true
  }
}
