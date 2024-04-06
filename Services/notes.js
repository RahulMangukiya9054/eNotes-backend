import { notesModel } from "../Model/index";

//*************** addNote ***************/
export const addNote = async (req, res) => {
    try {
        let data = req.body
        data.mainUserId = req.user.userId

        let result = await notesModel(data).save();
        if (result) {
            res.status(200).json({
                type: "Success",
                data: result
            })
        }
        else {
            res.status(400).json({
                type: "Error",
                message: "Error adding the Note!"
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

//*************** editNote ***************/
export const editNote = async (req, res) => {
    try {
        let where = {
            _id: req.params.id,
            mainUserId: req.user.userId,
            isDeleted: false
        }

        let updateData = {
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
        }

        let result = await notesModel.findOneAndUpdate(
            where,
            updateData,
            { new: true }
        );
        // console.log('result====>', result)
        if (result) {
            res.status(200).json({
                type: "Success",
                data: result
            })
        }
        else {
            res.status(400).json({
                type: "Error",
                message: "Error updating a Note!"
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

//*************** listAllNote ***************/
export const listAllNote = async (req, res) => {
    try {
        let where = {
            mainUserId: req.user.userId,
            isDeleted: false
        }

        let result = await notesModel.find(
            where,
            {
                title: 1,
                description: 1,
                tag: 1
            }
        )
        if (result) {
            if (result.length > 0) {
                res.status(200).json({
                    type: "Success",
                    data: result
                })
            }
            else{
                res.status(200).json({
                    type: "Success",
                    data: [],
                    message: "Notes note found!"
                })
            }
        }
        else {
            res.status(400).json({
                type: "Error",
                message: "Error updating a Note!"
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
//*************** deleteNote ***************/
export const deleteNote = async (req, res) => {
    try {
        let where = {
            _id: req.params.id,
            mainUserId: req.user.userId,
            isDeleted: false
        }

        let result = await notesModel.findOneAndUpdate(
            where,
            { isDeleted: true },
            { new: true }
        );

        if (result.isDeleted) {
            res.status(200).json({
                type: "Success",
                message: "Note is successfully Deleted!"
            })
        }
        else {
            res.status(400).json({
                type: "Error",
                message: "Error deleting a Note!"
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