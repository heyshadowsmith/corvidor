module.exports = {
  name: 'Greeting',
  description: 'Greeting will return a boring or custom greeting depending on the query parameters used.',
  method: 'GET',
  path: '/',
  queries: [
    {
      name: 'name',
      description: 'By providing a name, the greeting will be customized.',
      example: '?name=Corvidor'
    }
  ],
  logic(req) {
    if (req.query.name) {
      return {
        code: 200,
        data: `Hello, ${req.query.name}`
      }
    }

    return {
      code: 200,
      data: 'Hello world'
    }
  }
}