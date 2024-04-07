import { userModel } from '../Model'
import { generateJwtToken } from '../middleware/jwtToken';
import { nodeMailer } from '../middleware/mailer';
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
                let mailInfo = {
                    mailId: data.email, // This should be dynamically set to the user's email address
                    sub: "Welcome to iNotebook – Your New Digital Notebook!",
                    txt: "Welcome to iNotebook! We're thrilled to have you on board. Start creating, editing, and managing your notes easily with our app. Need help? Reach out to our support team anytime. Thank you for choosing iNotebook!",
                    html: `
                    <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif, border: 1px solid #f0f0f0; }
                                .content { width: 90%; margin: 20px auto; }
                                h2 { color: #333; }
                                p { color: #555; line-height: 1.6; }
                                .footer { margin-top: 20px; font-size: 0.9em; text-align: center; color: #888; }
                            </style>
                        </head>
                        <body>
                            <div class="content">
                                <h2>Welcome to iNotebook, ${data.name}!</h2>
                                <p>
                                    You've just unlocked a new realm of productivity and note management with iNotebook. 
                                    Here, your ideas can flow, and your tasks stay organized effortlessly. 
                                </p>
                                <p>Here are a few things you can do to get started:</p>
                                <ul>
                                    <li>Log in to your Account.</li>
                                    <li>Create your first note by clicking on the 'Add Note' button.</li>
                                    <li>Edit and organize your notes easily.</li>
                                    <li>Access your notes from anywhere, on any device.</li>
                                </ul>
                                <p>Need help or have questions? Reach out to our support team at rahulmangukiya7990@gmail.com.</p>
                                <p>We're excited to see how iNotebook helps you capture and organize your thoughts!</p>
                                <div class="footer">
                                    Happy Notetaking, <br>
                                    The iNotebook Team <br>
                                    <a href="mailto:rahulmangukiya7990@gmail.com">Contact Support</a>
                                </div>
                            </div>
                        </body>
                    </html>
                    `
                };
                

                // console.log('mailInfo====>', mailInfo)
                nodeMailer(mailInfo)
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
                    // console.log('data====>', data)

                    if (data) {
                        let mailInfo = {
                            mailId: data.email, // dynamically set to the user's email address
                            sub: "Successful Login Notification",
                            txt: "Hi there! We noticed a new login to your iNotebook account. If this was you, you can safely ignore this email. If you don't recognize this activity, please contact our support team.",
                            html: `
                            <html>
                                <head>
                                    <style>
                                        body { font-family: Arial, sans-serif; }
                                        .content { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #f0f0f0; }
                                        h2 { color: #333; }
                                        p { color: #555; line-height: 1.6; }
                                        .footer { margin-top: 20px; font-size: 0.9em; text-align: center; color: #888; }
                                    </style>
                                </head>
                                <body>
                                    <div class="content">
                                        <h2>Successful Login Alert</h2>
                                        <p>Hi ${data.name}!</p>
                                        <p>We noticed a new login to your iNotebook account. If this was you, you can safely ignore this email. If you don't recognize this activity, please contact our support team at rahulmangukiya7990@gmail.com.</p>
                                        <p>Security is important to us, and we recommend always keeping an eye on notifications like these to ensure your account remains safe and secure.</p>
                                        <p>If you have any concerns or need assistance, don't hesitate to reach out to us.</p>
                                        <div class="footer">
                                            Stay Safe, <br>
                                            The iNotebook Team <br>
                                            <a href="mailto:rahulmangukiya7990@gmail.com">Contact Support</a>
                                        </div>
                                    </div>
                                </body>
                            </html>
                            `
                        };

                        // console.log('mailInfo====>', mailInfo)
                        nodeMailer(mailInfo)
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
        else {
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