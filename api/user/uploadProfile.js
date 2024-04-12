import { Router } from 'express';
import { profileUpload } from '../../middleware/profileUpload';
import { addProfile } from '../../Services/user'
import { decodeJwtToken } from '../../middleware/jwtToken'

const app = Router()

/**
* @swagger
* /api/user/uploadProfile:
*  post:
*   tags: ["User"]
*   summary: upload user profile.
*   description: api used for upload user profile.
*   consumes:
*     - multipart/form-data
*   parameters:
*      - in: formData
*        name: profileImage
*        type: file
*        description: The image file to upload.
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: [] 
*/

app.post("/uploadProfile", decodeJwtToken, profileUpload, addProfile)

export default app