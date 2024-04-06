import { Router } from 'express'
import { editNote } from '../../Services/notes'
import { decodeJwtToken } from '../../middleware/jwtToken'
import { joiValidation } from "../../middleware/joiValidation"
import Joi from "joi"


const app = Router()

/**
 * @swagger
 * /api/note/update/{id}:
 *  patch:
 *      tags: ["Notes"]
 *      summary: Update Note.
 *      description: api used to update note.
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            type: string
 *          - in: body
 *            name: lead
 *            description: Update Note.
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

app.patch("/update/:id", decodeJwtToken, joiValidation(validationSchema), editNote)

export default app