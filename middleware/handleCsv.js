import multer from 'multer';
import csvtojson from 'csvtojson';

const handleMultipartData = multer({ limits: { fileSize: 1000000 * 10 } }).single("csvFile"); // ==> name ("csvFile") will be same as name specify in swaggerui configuration

export const handleCsv = async (req, res, next) => {
    handleMultipartData(req, res, async (err) => {
        if (err) {
            res.json({ msgs: err.message });
        } else {
            const fileBuffer = req.file.buffer;

            if (!fileBuffer) {
                res.status(400).json({ error: 'No file uploaded' });
            }

            // console.log('fileBuffer.toString()====>', fileBuffer.toString())

            // Convert CSV buffer to JSON
            csvtojson().fromString(fileBuffer.toString())
                .then(async (jsonArray) => {

                    let notesToAdd = [];
                    let removedNotes = [];

                    jsonArray.map((note) => {
    
                        if (note.title === "" || note.description === "" || note.tag === "") {
                            removedNotes.push(note);
                        }
                        else{
                            notesToAdd.push(note);
                        }

                    });

                    notesToAdd.map((note) => {
                        note.mainUserId = req.user.userId;
                    })

                    req.body.notes = notesToAdd;
                    // res.json(req.body);
                    // console.log('req.body====>', req.body);
                    next()
                })
                .catch((error) => {
                    res.status(500).json({ error: 'Error converting CSV to JSON' });
                });
        }
    });
};
