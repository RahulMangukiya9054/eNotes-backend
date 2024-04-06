import { Router } from 'express'
import { deleteNote } from '../../Services/notes'
import { decodeJwtToken } from '../../middleware/jwtToken'

const app = Router()

/**
 * @swagger
 * /api/note/delete/{id}:
 *  delete:
 *      tags: ["Notes"]
 *      summary: Delete Note.
 *      description: api used to delete note.
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            type: string
 *      responses:
 *          "200":
 *              description: success
 *          "400":
 *              description: fail
 *      security:
 *          - bearerAuth: []
 */

app.delete("/delete/:id", decodeJwtToken, deleteNote)

export default app