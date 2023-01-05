import { Schema, model, models } from "mongoose"
import { QuestionType } from '../types/QuestionType'

/**
 * Defines schema for questions
 */
const questionSchema: Schema<QuestionType> = new Schema({
  _id: {type: String, required: true},
  name: {type: String, required: true},
  description: {
    description_text: {type: String, required: true},
    description_img_source: {type: Schema.Types.Mixed, required: true},
  },
  examples: [{
    example_text: {type: String, required: true},
    example_img_source: {type: Schema.Types.Mixed, required: true}
  }],
  constraint: {type: Schema.Types.Mixed, required: true},
  code_snippets: [{
    lang: {type: String},
    langSlug: {type: String},
    code: {type: String}
  }]
}, { collection: "questions" })

const QuestionModel = models.Question || model<QuestionType>('Question', questionSchema)
export default QuestionModel