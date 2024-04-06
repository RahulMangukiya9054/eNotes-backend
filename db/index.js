import mongoose from "mongoose";

const databaseUrl = process.env.ATLAS_URL

console.log('DB URL: ', databaseUrl)

mongoose.connect(databaseUrl)
.then(() => {
  console.log("database connected!")
})
.catch((err) => {
    console.log('database not connected!', err)
})


export default mongoose;