import express from 'express'
import {
    getAllUsers,
    getUser,
    // updateUser,
} from "../util/userUtil.js"

const userRouter = express.Router()
// define each route here
userRouter.get('/', getAllUsers)

userRouter.get('/:userID', getUser)
// userRouter.put('/:userID', updateUser)

export default userRouter
