import { Router } from 'express'
import { getUser } from '../../Services/user'
import { decodeJwtToken } from '../../middleware/jwtToken'

const app = Router()

/**
 * @swagger
 * /api/user/getuser:
 *  get:
 *      tags: ["User"]
 *      summary: Get User.
 *      description: api used to get user.
 *      responses:
 *          "200":
 *              description: success
 *          "400":
 *              description: fail
 *      security:
 *          - bearerAuth: []
 */

app.get("/getuser", decodeJwtToken, getUser)

export default app