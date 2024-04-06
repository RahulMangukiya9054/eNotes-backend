import { Router } from 'express'
import { listAllNote } from '../../Services/notes'
import { decodeJwtToken } from '../../middleware/jwtToken'

const app = Router()

/**
 * @swagger
 * /api/note/list:
 *  get:
 *      tags: ["Notes"]
 *      summary: List all Note.
 *      description: api used to list all note.
 *      responses:
 *          "200":
 *              description: success
 *          "400":
 *              description: fail
 *      security:
 *          - bearerAuth: []
 */

app.get("/list", decodeJwtToken, listAllNote)

export default app