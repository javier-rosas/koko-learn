// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectMongo } from '../../../../utils/mongooseConnect'
import Question from '../../../../models/QuestionModel'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    await connectMongo()
    const questions = await Question.find()
    res.status(200).json(questions)
  } catch (e) {
    res.json({e})
  }
}
