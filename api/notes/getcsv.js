import { Router } from 'express'
import { getNotsTextFile } from '../../Services/notes'
import { decodeJwtToken } from '../../middleware/jwtToken'

const app = Router()

/**
* @swagger
* /api/note/getTextFileOfNotes:
*  get:
*   tags: ["Notes"]
*   summary: Get Text file of all Notes.
*   description: API used to get a text file of notes.
*   produces:
*     - text/csv
*   responses:
*    "200":
*     description: Success
*    "400":
*     description: Fail
*   security:
*      - bearerAuth: [] 
*/

app.get("/getTextFileOfNotes", decodeJwtToken, getNotsTextFile)

export default app