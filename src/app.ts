import fastify from 'fastify'
import multipart from '@fastify/multipart'
import { ZodError } from 'zod'

import { env } from './infra/env'
import { routes } from './infra/controllers/routes'

export const app = fastify({
  logger: {
    level: 'error',
  },
})

app.register(multipart)
app.register(routes, { prefix: '/api' })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: set Sentry/DataDog...
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})

export const startServer = async () => {
  try {
    await app.listen({ port: env.PORT })
    console.log(`Server up and running on port ${env.PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
