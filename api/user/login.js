import { Router } from "express"
import { loginUser } from "../../Services/user"
import { joiValidation } from "../../middleware/joiValidation"
import Joi from "joi"

const app = Router()

/**
 * @swagger
 * /api/user/login:
 *  post:
 *      tags: ["User"]
 *      summary: Login User.
 *      description: api used for user login.
 *      parameters:
 *          - in: body
 *            name: lead
 *            description: Login User.
 *            schema:
 *              type: object
 *              properties:
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
    email: Joi.string().required().email({ tlds: { allow: ["com", "net"] } }),
    password: Joi.string().required()
})

app.post("/login", joiValidation(validationSchema), loginUser)

export default app