import { userModel } from '../Model'
import { generateJwtToken } from '../middleware/jwtToken';
import { decryptPassword, encryptPassword } from '../middleware/password';

//************************* addUser *****************************/
export const addUser = async (req, res) => {
    try {
        let data = req.body;
        let userData = await userModel.findOne({ email: data.email.toLowerCase(), isDeleted: false })

        if (userData) {
            res.status(400).json({
                message: "User with this email is already exist!"
            })
        }
        else {
            let securePassword = await encryptPassword(data.password)
            data.password = securePassword;
            // console.log('data====>', data)

            let result = await userModel.create(data)
            if (result) {
                res.status(200).json({
                    type: "Success",
                    data: result
                })
            }
            else {
                res.status(400).json({
                    type: "Error",
                    message: "Error adding a User!"
                })
            }
        }

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
            type: "Error"
        })
    }
}

//************************* loginUser *****************************/
export const loginUser = async (req, res) => {

    try {
        let data = req.body;
        let userData = await userModel.findOne({ email: data.email.toLowerCase(), isDeleted: false })

        if (userData) {
            let matchPassword = await decryptPassword(data.password, userData.password)

            // console.log('matchPassword====>', matchPassword)
            if (matchPassword) {

                if (userData?.loginToken) {
                    if (userData?.loginToken?.length >= 3) {
                        let rmToken = await userModel.findOneAndUpdate(
                            { _id: userData._id },
                            {
                                $pop: { loginToken: -1 }
                            },
                            { new: true }
                        )
                    }
                }

                let jwt = await generateJwtToken({ userId: userData._id })
                if (jwt.status) {
                    let updateData = {
                        $push: {
                            loginToken: {
                                token: jwt.token
                            }
                        }
                    }

                    let data = await userModel.findOneAndUpdate(
                        { _id: userData._id },
                        updateData,
                        { new: true }
                    )

                    if (data) {
                        res.status(200).json({
                            type: "Success",
                            data: {
                                id: data._id,
                                name: data.name,
                                email: data.email,
                                authToken: data.loginToken
                            }
                        })
                    }
                    else {
                        res.status(400).json({
                            type: "Error",
                            message: "Error login a User!"
                        })
                    }
                }
                else {
                    res.status(401).json({
                        statuscode: 401,
                        data: null,
                        message: err,
                        type: "Error"
                    })
                }
            }
            else {
                res.status(401).json({ 
                    type: "Error", 
                    message: "Incorrect Email or Password!"
                })
            }
        }
        else{
            res.status(401).json({ 
                type: "Error", 
                message: "User not found!" 
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
            type: "Error"
        })
    }
}

//************************* getUser *****************************/
export const getUser = async (req, res) => {
    try {
        let result = await userModel.findOne(
            {
                _id: req.user.userId,
                isDeleted: false
            },
            {
                name: 1,
                email: 1,
                authToken: 1,
                createdAt: 1
            }
        )

        if (result) {
            res.status(200).json({
                type: "Success",
                data: result
            })
        }
        else {
            res.status(400).json({
                type: "Error",
                message: "Error fatching the User!"
            })
        }

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
            type: "Error"
        })
    }
}