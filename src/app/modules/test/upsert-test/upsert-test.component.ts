import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TestService} from '../../../service/test.service';
import {Question, QuestionAnswer} from '../../../models/test';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upsert-test',
  templateUrl: './upsert-test.component.html',
  styleUrls: ['./upsert-test.component.scss']
})
export class UpsertTestComponent implements OnInit {

  myControl = new FormControl();
  testId: number;
  isAddMode: boolean;
  testForm!: FormGroup;
  questionTotal = 0;
  answerTotal = [];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private cdr: ChangeDetectorRef
  ) {
    this.testId = this.activatedRoute.snapshot.params.id;
    this.isAddMode = !this.testId;
    this.testForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      questions_attributes: this.formBuilder.array([]),
    });
  }



  ngOnInit(): void {
    if (!this.isAddMode) {
      this.testService.getById(this.testId).subscribe((res) => {
        if (res.test.questions?.length) {
          for (const question of res.test.questions) {
            this.addQuestion(question);
          }
        }
        this.testForm.patchValue(res.test);
        this.questionTotal = res.test.questions.length;
      });
    } else {
      this.addQuestion();
    }
  }

  get f(): any { return this.testForm.controls; }

  get questionFormArray(): FormArray {
    return this.f.questions_attributes as FormArray;
  }

  answerForm(question: AbstractControl): FormArray {
    return (question as FormGroup).controls.question_answers_attributes as FormArray;
  }

  addQuestion(question?: Question): void {
    const fg = this.formBuilder.group({
      id: question ? question.id : undefined,
      name: [question ? question.name : '', Validators.compose([Validators.required])],
      description: [question ? question.description : '', Validators.compose([Validators.required])],
      question_answers_attributes: this.formBuilder.array([]),
      _destroy: undefined
    });
    this.questionFormArray.push(fg);
    const index = this.questionFormArray.length - 1;
    if (question) {
      question.question_answers.forEach((child) => {
        this.addAnswer(index, child);
      });
    } else {
      this.addAnswer(index);
    }
    this.questionTotal += 1;
  }

  addAnswer(questionIndex: number, answer?: QuestionAnswer): void {
    const fg = this.formBuilder.group({
      id: answer ? answer.id : undefined,
      content: [answer ? answer.content : '', Validators.compose([Validators.required])],
      is_correct: answer ? answer.is_correct === true : false,
      _destroy: undefined,
    });
    ((this.questionFormArray.controls[questionIndex] as FormGroup).controls.question_answers_attributes as FormArray).push(fg);
    this.cdr.markForCheck();
  }

  deleteAnswer(questionIndex: number, answerIndex: number): void {
    // ((this.questionFormArray.controls[questionIndex] as FormGroup).
    // controls.question_answers_attributes as FormArray).removeAt(answerIndex);
    const answerValue = ((this.questionFormArray.controls[questionIndex] as FormGroup).controls.question_answers_attributes as FormArray);
    console.log(answerValue.controls[answerIndex].value.id);
    if (answerValue.controls[answerIndex].value.id) {
      answerValue.controls[answerIndex].get('_destroy').setValue('1');
    } else {
      answerValue.removeAt(answerIndex);
    }
  }

  deleteQuestion(questionIndex: number): void {
    // this.questionFormArray.removeAt(questionIndex);
    this.questionFormArray.controls[questionIndex].get('_destroy').setValue('1');
    this.questionTotal -= 1;
  }

  onSubmit(): void {
    console.log(this.testForm.value);
    this.testForm.markAllAsTouched();
    if (this.testForm.valid) {
      const request$ = this.isAddMode ? this.testService.create(this.testForm.value) :
        this.testService.update(this.testId, this.testForm.value);
      request$.subscribe({
        next: () => {
          this.router.navigate(['/tests']);
        },
        error: (res) => Swal.fire({
          title: 'Error!',
          html: res,
          icon: 'error'
        })
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/tests']);
  }

}
