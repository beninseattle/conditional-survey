export type SurveyJson = SurveyJsonQuestion[]
export type SurveyQuestionID = string
export type SurveyQuestionType = 'yes_no' | 'text'
export interface SurveyJsonQuestion {
  question_id: SurveyQuestionID
  question_details: string
  question_dependencies?: { [value: string]: SurveyQuestionID }
  answer: string
  type: SurveyQuestionType
}

export type Survey = SurveyQuestion[]
export interface SurveyQuestion {
  question_id: SurveyQuestionID
  question_details: string
  type: SurveyQuestionType
}

export const parseSurveyJson = (json: SurveyJson) => {
  if (!json || !json.length) {
    throw new Error('No survey data found')
  }

  const data: Survey = []
  const questionIds: SurveyQuestionID[] = []
  json.forEach((question) => {
    // Make sure question data is present and correct
    if (
      !question.question_id ||
      !question.question_id.length ||
      !question.question_details ||
      !question.question_details.length ||
      !question.type ||
      !question.type.length ||
      questionIds.includes(question.question_id)
    ) {
      throw new Error('Survey data malformed')
    }

    data.push({
      question_id: question.question_id,
      question_details: question.question_details,
      type: question.type
    })
    questionIds.push(question.question_id)
  })

  return data
}
