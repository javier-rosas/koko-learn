import { Schema, model, models } from "mongoose"
import { TestType } from '../types/TestType'

/**
 * Defines schema for tests
 */
const testSchema: Schema<TestType> = new Schema({
  _id: {type: String, required: true},
  kebabCaseName: {type: String, required: true},
  pythonTests: {type: String, required: true},
  javascriptTests: {type: String, required: true},
  pythonDataStructures: {type: String, required: true},
  javascriptDataStructures: {type: String, required: true},
}, { collection: "tests" })

const TestModel = models.Test || model<TestType>('Test', testSchema)
export default TestModel