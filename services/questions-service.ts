import axios from 'axios'
import { QuestionType } from '../types/QuestionType'

/**
 * Converts any string to kebab-case
 * @param {string | undefined} str question name
 * @returns {string} formatted in kebab-case
 */
const toKebabCase = (str: string | undefined): string => {
  if (!str) return ""
  return ( 
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
      .map(x => x.toLowerCase()).join('-')
  )
}
    
/**
 * Retrieves all questions
 * @returns list of question objects
 */
export const getAllQuestions = async () => {
  const res = await axios.get('/api/v1/questions')
  const questions = res.data
  const kebabCaseQuestions = questions.map((question: QuestionType) => {
    return {
      ...question,
      name: toKebabCase(question.name)
    }
  })
  return kebabCaseQuestions
}

/**
 * Retrieves question by name
 * @param name question name
 * @returns {Promise<QuestionType>} Question object
 */
export const getQuestionByName = async (name: string | undefined) : Promise<QuestionType> => {
  const kebabName = toKebabCase(name)
  console.log("question -- ", kebabName)
  const question = await fetch(`/api/v1/questions/${kebabName}`)
  console.log("question", question)
  return question.json()
}