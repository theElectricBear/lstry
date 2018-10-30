const session = require('express-session');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
const mongoose = require('mongoose');
const User = require('../model/users');
const Site = require('../model/sites');
const mkurl = (str) => { return str.toLowerCase().replace(/\s/g, '-')};

module.exports = (app, express, keys) => {
	app.use(session({
		secret: keys.SESSION_SECRET,
		resave: true,
		saveUninitialized: true
	}));

	// setup the strategy for loging into slack using defaults
	passport.use(new SlackStrategy({
		clientID: keys.CLIENT_ID,
		clientSecret: keys.CLIENT_SECRET,
		callbackURL: keys.CALLBACK_URI,
		scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team'] // default ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team']
	}, (accessToken, refreshToken, profile, done) => {
		// optionally persist profile data
		done(null, profile);
	}
	));

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser((user, done) => {
		// placeholder for custom user serialization
		// null is for errors
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		// placeholder for custom user deserialization.
		// maybe you are going to get the user from mongo by id?
		// null is for errors
		done(null, user );
	});

	//route to check if user is stored in session
	app.get('/validate-user', async (req, res) => {
		//if user is logged in return user basics
		console.log('validating User')
		if (req.isAuthenticated()){
			const user = await User.findOne({ id: req.user.id, }, (err, user) => {
				if (err) return err
				return user
			})
			
			const lists = await user.lists.map(async (list) => {
							
				let strArr = []
				let objArr = []

				list.sites.map((x) => typeof x === 'string' ? strArr.push(x) : objArr.push(x) )
				
				await Site.find( { id: { $in :strArr }}, (err, sites) => {
					if (err) return err
					return list.sites = [ ...objArr, ...sites ]
				} )
				return list
			})
			
			await Promise.all(lists)
				.then((lists) => {
					user.lists = lists

					user.save((err) => {
						if (err) error = err
						console.log('Updated ' + user.id + ' in DB')
					})
					res.json({
						id: user.id,
						name: user.name,
						real_name: user.real_name,
						lists: user.lists,
						authenticated: true
					})
				})
		} else {
			res.json({ authenticated: false });
		}
	})

	// path to start the OAuth flow
	app.get('/slack', passport.authenticate('slack'));

	// OAuth callback url
	app.get('/slack/callback',
		passport.authenticate('slack', { failureRedirect: '/failed' }),
		(req, res) => {
			res.redirect('/your/dashboard')
		}
	);
}
