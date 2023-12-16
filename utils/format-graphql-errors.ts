type UserError = {
  readonly field: readonly string[] | null
  readonly message: string
}

export default function formatGraphQLErrors(errors: readonly UserError[]) {
  return errors.reduce<{errors: {[key: string]: string}; messages: string[]}>(
    (prev, error) => {
      if (error.field) {
        prev.errors[error.field.join(`.`)] = error.message
      } else {
        prev.messages.push(error.message)
      }

      return prev
    },
    {
      errors: {},
      messages: [],
    }
  )
}
