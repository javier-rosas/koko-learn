export type QuestionType = {
  _id: string,
  name: string,
  description: {
    description_text: string,
    description_img_source: string | null,
  }
  examples: [{
    example_text: string,
    example_img_source: string | null
  }],
  constraint: string,
  code_snippets: [{
    lang: string,
    langSlug: string,
    code: string
  }],
  kebabCaseName: string,
}