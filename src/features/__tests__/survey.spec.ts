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

describe('Parsed survey data should', () => {
  const surveyData = parseSurveyJson(surveyJson as unknown as SurveyJson)

  test('have the correct number of questions', () => {
    expect(surveyData.length).toBe(13)
  })

  test('have the correct properties', () => {
    expect(surveyData[0]).toHaveProperty('question_id')
    expect(surveyData[0]).toHaveProperty('type')
    expect(surveyData[0]).toHaveProperty('question_details')
  })
})
