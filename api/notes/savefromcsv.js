import { Router } from 'express'
import { addFromCsv } from '../../Services/notes'
import { decodeJwtToken } from '../../middleware/jwtToken'
import { handleCsv } from '../../middleware/handleCsv'

const app = Router()

/**
* @swagger
* /api/note/addFromCsv:
*  post:
*   tags: ["Notes"]
*   summary: Save notes from a csv file.
*   description: api used for save notes from a csv file.
*   consumes:
*     - multipart/form-data
*   parameters:
*      - in: formData
*        name: csvFile
*        type: file
*        description: The csv file to upload.
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: [] 
*/

app.post("/addFromCsv", decodeJwtToken, handleCsv, addFromCsv)

export default app