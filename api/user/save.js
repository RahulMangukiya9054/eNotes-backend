import { Router } from "express"
import { addUser } from "../../Services/user"
import { joiValidation } from "../../middleware/joiValidation"
import Joi from "joi"

const app = Router()

/**
 * @swagger
 * /api/user/add:
 *  post:
 *      tags: ["User"]
 *      summary: Add User.
 *      description: api used to add user.
 *      parameters:
 *          - in: body
 *            name: lead
 *            description: Add User.
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          "200":
 *              description: success
 *          "400":
 *              description: fail
 */

const validationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email({ tlds: { allow: ["com", "net"] } }),
    password: Joi.string().required()
})

app.post("/add", joiValidation(validationSchema), addUser)

export default app