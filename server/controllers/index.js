const jwtDecode = 		require('jwt-decode')
const User = 	  		require('../models/User.js')
const signToken = 		require('../auth').signToken
const signSimpleToken = require('../auth').signSimpleToken
const {jokes} = 		require('../data/jokes.js')

module.exports = {
	// list all users
	index: (req, res) => {
		User.find({}, (err, users) => {
			res.json(users)
		})
	},
	// a simple utility which returns a jwt - intended to be used
	// with postman for testing
	generate: (req, res) => {
		const {name, email, password} = req.body
		let token = signSimpleToken({name, email, password})
		res.send(token)
	},

	// you'll note in the routes that this function is behind the firewall
	show: async (req, res) => {
		console.log(req.body)
		console.log(jokes)
		let userProfile = jwtDecode(req.body.id)
		console.log(userProfile)	
		let joke = jokes[Math.floor(Math.random() * jokes.length)]
		// note we execute .lean() to convert a mongoose document to js doc
		let doc = await User.find({email: userProfile.email}).lean()		
		if (doc.length === 0 || err) {
			doc = []
			doc.push(userProfile)			
			doc[0].joke = joke
		} else {
			doc[0].joke = joke
		}					
		res.json(doc)
	},

	// create a new user
	create: (req, res) => {
		User.create(req.body, (err, user) => {
			if(err) return res.json({success: false, code: err.code})
			// once user is created, generate a JWT and return to client"
			const token = signToken(user)
			res.json({success: true, message: "User created. Token attached.", token})
		})
	},

	// update an existing user
	update: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			Object.assign(user, req.body)
			user.save((err, updatedUser) => {
				res.json({success: true, message: "User updated.", user})
			})
		})
	},

	// delete an existing user
	destroy: (req, res) => {
		User.findByIdAndRemove(req.params.id, (err, user) => {
			res.json({success: true, message: "User deleted.", user})
		})
	},

	// the login route
	authenticate: (req, res) => {
		// check if the user exists
		User.findOne({email: req.body.email}, (err, user) => {
			// if there's no user or the password is invalid
			if(!user || !user.validPassword(req.body.password)) {
				// deny access
				return res.json({success: false, message: "Invalid credentials."})
			}
			const {_id, name, email} = user.toJSON()  
			const token = signToken(user)
			res.json({ success: true, message: "Token attached.", id: _id, name, email, token })
		})
	},

	logout: (req, res) => {
		 // the token is removed from local storage client side
		 res.send({ message: "success" });
	}
}