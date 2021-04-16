export interface QuestionAnswer {
  id: string;
  content: string;
  is_correct: boolean;
}

export interface Question {
  id: string;
  name: string;
  description: string;
  question_answers_attributes?: QuestionAnswer[];
  question_answers?: QuestionAnswer[];
}

export interface Test {
  id: string;
  name: string;
  description: string;
  questions_attributes?: Question[];
  questions?: Question[];
}
