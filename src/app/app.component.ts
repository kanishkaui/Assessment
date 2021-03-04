import { Component, OnInit } from '@angular/core';
import { DataTransferService } from './data-transfer.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'playgroundCodeReactive';
  constructor(private service: DataTransferService, private fb: FormBuilder) {

  }



  ngOnInit() {
  }


}
