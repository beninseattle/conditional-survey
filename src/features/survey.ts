export type SurveyJson = SurveyJsonQuestion[]
export type SurveyQuestionID = string
export type SurveyQuestionType = 'yes_no' | 'text'
export interface SurveyJsonQuestion {
  question_id: SurveyQuestionID
  question_details: string
  question_dependencies?: { [value: string]: SurveyQuestionID }
  page: number
  answer: string
  type: SurveyQuestionType
}

export interface Survey {
  questions: SurveyQuestion[]
  dependencies: {
    parent_question_id: SurveyQuestionID
    child_question_id: SurveyQuestionID
    value: string
  }[]
  answers: { question_id: string }[]
}
export interface SurveyQuestion {
  question_id: SurveyQuestionID
  page: number
  question_details: string
  type: SurveyQuestionType
}

export const parseSurveyJson = (json: SurveyJson) => {
  if (!json || !json.length) {
    throw new Error('No survey data found')
  }

  const data: Survey = {
    questions: [],
    dependencies: [],
    answers: []
  }
  // Track question IDs to make assure no duplicates are present
  const questionIds: SurveyQuestionID[] = []

  json.forEach((question) => {
    // Make sure question data is present and correct
    if (
      !question.question_id ||
      !question.question_id.length ||
      !question.question_details ||
      !question.question_details.length ||
      !question.page ||
      !question.type ||
      !question.type.length ||
      questionIds.includes(question.question_id)
    ) {
      throw new Error('Survey data malformed')
    }

    // Add survey question
    const newQuestion: SurveyQuestion = {
      question_id: question.question_id,
      question_details: question.question_details,
      page: question.page,
      type: question.type
    }
    data.questions.push(newQuestion)

    // Add any dependencies
    if (question.question_dependencies) {
      for (const dependencyValue in question.question_dependencies) {
        if (question.question_dependencies[dependencyValue]) {
          data.dependencies.push({
            parent_question_id: question.question_id,
            child_question_id: question.question_dependencies[dependencyValue],
            value: dependencyValue
          })
        }
      }
    }

    questionIds.push(question.question_id)
  })

  return data
}

export const questionsForPage = (survey: Survey, page = 1) => {
  const questions = survey.questions.reduce((prev, curr) => {
    if (curr.page === page) {
      return [...prev, curr]
    }
    return prev
  }, [] as SurveyQuestion[])

  return questions
}

// export const dependenciesForQuestion = (survey: Survey, questionId: SurveyQuestionID) => {}
