const express =     require('express')
const users =   require('../controllers')
const verifyToken = require('../auth').verifyToken

const usersRouter = new express.Router()

usersRouter.route('/').get(users.index)

usersRouter.route('/register').post(users.create)

usersRouter.post('/login', users.authenticate)

usersRouter.use(verifyToken)

usersRouter.route('/:id').get(users.show)

usersRouter.route('/:id').patch(users.update)

usersRouter.route('/:id').delete(users.destroy)

module.exports = usersRouter