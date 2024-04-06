import bcrypt from 'bcryptjs'

//========== Encrypt Password ==========//
export const encryptPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

//========== Encrypt Password ==========//
export const decryptPassword = async (password, oldPassword) => {
    const mathPassword = await bcrypt.compare(password, oldPassword)
    return mathPassword;
}