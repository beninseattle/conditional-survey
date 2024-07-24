type SurveyJson = SurveyJsonQuestion[];
type SurveyQuestionID = string;
interface SurveyJsonQuestion {
  question_id: SurveyQuestionID;
  question_details: string;
  question_dependencies?: { [value: string]: SurveyQuestionID };
  answer: string;
  type: 'yes_no' | 'text';
}

type Survey = SurveyQuestion[];
interface SurveyQuestion {
  question_id: SurveyQuestionID;
}

export const parseSurveyJson = (json: SurveyJson) => {
  if (!json || !json.length) {
    throw new Error('No survey data found')
  }

  const data: Survey = []
  json.forEach((question) => {
    data.push({ question_id: question.question_id })
  })

  return data
}
