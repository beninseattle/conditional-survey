import { describe, expect, test } from 'vitest'
import { parseSurveyJson, type SurveyJson } from '../survey'
import surveyJson from '@/assets/surveyData.json'
import malformedSurveyData from './malformedSurveyData.json'

describe('Malformed survey data should', () => {
  test('throw an error with no survey data', () => {
    // @ts-ignore: Intentional undefined argument for testing
    expect(() => parseSurveyJson()).toThrowError()
    expect(() => parseSurveyJson([])).toThrowError()
    expect(() => parseSurveyJson(malformedSurveyData as unknown as SurveyJson)).toThrowError()
  })
  test('throw an error with malformed survey data', () => {
    expect(() => parseSurveyJson(malformedSurveyData as unknown as SurveyJson)).toThrowError()
  })
})

describe('Parsed survey should', () => {
  const survey = parseSurveyJson(surveyJson as unknown as SurveyJson)

  test('have the correct number of questions', () => {
    expect(survey.questions.length).toBe(15)
  })

  test('have the correct question properties', () => {
    expect(survey.questions[0]).toHaveProperty('question_id')
    expect(survey.questions[0]).toHaveProperty('question_details')
    expect(survey.questions[0]).toHaveProperty('page')
    expect(survey.questions[0]).toHaveProperty('type')
  })

  test('have the correct number of dependencies', () => {
    expect(survey.dependencies.length).toBe(10)
  })

  test('have the correct dependency properties', () => {
    expect(survey.dependencies[0]).toHaveProperty('parent_question_id')
    expect(survey.dependencies[0]).toHaveProperty('child_question_id')
    expect(survey.dependencies[0]).toHaveProperty('value')
  })
})
