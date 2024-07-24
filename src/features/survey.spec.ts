import { expect, test } from 'vitest'
import { parseSurveyJson } from './survey'
import { describe } from 'node:test'
import surveyJson from '@/assets/surveyData.json'

describe('Malformed survey data should', () => {
  test('throw an error with no survey data', () => {
    // @ts-ignore: Intentional undefined argument for testing
    expect(() => parseSurveyJson()).toThrowError()
    expect(() => parseSurveyJson([])).toThrowError()
  })
})

describe('Parsed survey data should', () => {
  const surveyData = parseSurveyJson(surveyJson)
  test('have the same number of questions', () => {
    expect(surveyData.length).toBe(13)
  })
})
