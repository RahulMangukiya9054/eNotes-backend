import { Router } from 'express'
import { addNote } from '../../Services/notes'
import { decodeJwtToken } from '../../middleware/jwtToken'
import { joiValidation } from "../../middleware/joiValidation"
import Joi from "joi"


const app = Router()

/**
 * @swagger
 * /api/note/add:
 *  post:
 *      tags: ["Notes"]
 *      summary: Add Note.
 *      description: api used to add note.
 *      parameters:
 *          - in: body
 *            name: lead
 *            description: Add Note.
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  tag:
 *                      type: string
 *      responses:
 *          "200":
 *              description: success
 *          "400":
 *              description: fail
 *      security:
 *          - bearerAuth: []
 */

const validationSchema = Joi.object({
    title: Joi.string().required().min(3),
    description: Joi.string().required().min(5),
    tag: Joi.string().required().min(3)
})

app.post("/add", decodeJwtToken, joiValidation(validationSchema), addNote)

export default app