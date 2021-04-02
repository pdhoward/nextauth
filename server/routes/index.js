const express =     require('express')
const users =   require('../controllers')
const verifyToken = require('../auth').verifyToken
const verifyAccess = require('../auth').verifyAccess

const usersRouter = new express.Router()

//////////////test routes//////////////////
usersRouter.route('/generate').post(users.generate)  // gen a token
usersRouter.route('/show').post(users.show) // show a joke

//////////////main routes for app///////////////

usersRouter.route('/').get(users.index)

usersRouter.route('/register').post(users.create)

usersRouter.post('/login', users.authenticate)

usersRouter.post('/logout', users.logout)

usersRouter.post('/verify', verifyAccess)

usersRouter.use(verifyToken)

usersRouter.route('/:id').get(users.show)

usersRouter.route('/:id').patch(users.update)

usersRouter.route('/:id').delete(users.destroy)

module.exports = usersRouter