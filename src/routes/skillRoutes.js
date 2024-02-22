import express from 'express'
// import { getSkills } from '../../services/skills/skills.service.js'

const skillsRouter = express.Router()

skillsRouter.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// define each route here
// skillsRouter.get('/', getSkills)

export default skillsRouter
