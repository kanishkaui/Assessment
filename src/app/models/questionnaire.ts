import { FormControl } from '@angular/forms'

interface Item {
    linkId: string;
    text: string;
    type: 'group' | 'boolean' | 'string' | 'date';
    answer?: string | boolean;
    item?: Item[];
}

interface FormObj {
    label: string
    type: 'group' | 'boolean' | 'string' | 'date';
    fieldX: string
    linkId: string
    validation: {
        required?: boolean;
    }
}


export class QuestionanaireModel {
    resourceType: string = '';
    id: string = '';
    url: string = '';
    status: string = '';
    subjectType: string[] = [];
    date: string = '';
    item: Item[];

    constructor(quesData: any) {
        this.resourceType = quesData.resourceType;
        this.id = quesData.id;
        this.url = quesData.url;
        this.status = quesData.status;
        this.subjectType = quesData.subjectType;
        this.date = quesData.date;
        this.item = quesData.item;
    }

    public static createQuestionnaireFromJSON(data: any): QuestionanaireModel {
        return new QuestionanaireModel(data);
    }

    public static creatBlankQuestionnaire() {
        return new QuestionanaireModel({
            "resourceType": "",
            "id": "",
            "url": "",
            "status": "",
            "subjectType": [],
            "date": new Date().toJSON().substring(0, 10),
            "item": []
        });
    }

    public createFormDataObject() {
        let controls: any = {}
        let formFieldColl: any = [];

        for (let eachItem of this.item) {
            let obj: FormObj = {
                label: eachItem.text,
                type: eachItem.type,
                fieldX: eachItem.linkId,
                linkId: eachItem.linkId,
                validation: {}
            }

            formFieldColl.push(obj)

            if (eachItem.item) {
                for (let nextItemOfEachItem of eachItem.item) {
                    let nextObj: FormObj = {
                        label: nextItemOfEachItem.text,
                        type: nextItemOfEachItem.type,
                        fieldX: nextItemOfEachItem.linkId,
                        linkId: nextItemOfEachItem.linkId,
                        validation: { required: true }
                    }
                    controls[nextItemOfEachItem.linkId] = new FormControl('')
                    formFieldColl.push(nextObj)
                }
            }

            if (eachItem.type != 'group') {
                controls[eachItem.linkId] = new FormControl('')
            }
        }
        return {
            controls,
            formFieldColl
        }
    }


    public addAnswers(dynamicForm: any) {
        for (let i = 0; i < this.item.length; i++) {
            if (this.item[i].item == undefined) {

                this.item[i].answer = dynamicForm.value[this.item[i].linkId]

            } else if (this.item[i].item) {
                for (let j = 0; j < (this.item[i].item as Item[]).length; j++) {

                    // @ts-ignore
                    this.item[i].item[j].answer = dynamicForm.value[this.item[i].item[j].linkId]

                }
            }
        }

    }
}