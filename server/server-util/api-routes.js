const mongoose = require('mongoose');
const Site = require('../model/sites');
const User = require('../model/users');
const Channel = require('../model/channels');
const metascraper = require('metascraper');
const got = require('got');
const fs = require('fs');

const createId = () => Math.random().toString(36).substr(2, 9).toUpperCase()

module.exports = (app, keys) => {
	//db config
	mongoose.set('useCreateIndex', true);
	mongoose.connect(keys.MONGOLAB_URI, { useNewUrlParser: true });

	//Main route for retiveing users, sites, channels from mongolab
	app.get('/data', async (req, res) => {
		let data = {};
		let tasks = [
			//Using mongoose schema to retrive site data
			Site.find((err, sites) => {
				if (err) return err
				return sites;
			
			}),
			//Using mongoose schema to retrive user data
			User.find((err, users) => {
				if (err) return err
				data.users = users;
				
			}),
			//Using mongoose schema to retrive slack channel data
			Channel.find((err, channels) => {
				if (err) return err
				data.channels = channels;
				
			})
		]

		await Promise.all(tasks)
			.then((data) => res.json(data))
			.catch((err) => res.json(err))
	})

	app.post('/entry/new/', async (req, res) => {
		if (req.isAuthenticated()){
			let { listId, url} = req.body
			console.log(req.user.id)
			let tasks = [
				User.findOne({ id: req.user.id }),
				(async () => {
					
					try {
						const { body: html } = await got( url )
						const metadata = await metascraper({html, url})
						let newSite = new Site();
						newSite = Object.assign(newSite, { 
							...metadata, 
							id: createId(),
							list: listId,
							posted: new Date()
						})
						console.log(newSite)
						return newSite
						
					} catch (err) {
						console.log(err) 
					}
				})(),
			]

			await Promise.all(tasks)
				.then((data) => {
					let [ user, newSite ] = data
					let list = user.lists.find((x) => x.id === listId)
					list.sites = [ ...list.sites, newSite] 
					user.save((err) => {
						if (err) error = err;
						console.log('Updated ' + user.id + ' in DB')
					})
					const { _id, access_token, scopes, __v, ...trimmedUser } = user.toObject()
					return trimmedUser
				})
				.then((trimmedUser) => {
					res.json({ ...trimmedUser, authenticated: true })
				})
				.catch((err) =>  res.json({ error: err}))
				
		} else {
			res.json({ authenticated: false })
		}
	})

	app.post('/entry/delete/', async  (req, res) => {
		let { itemId, listId } = req.body
		if (req.isAuthenticated()){

			let tasks = [
				User.findOne({ id: req.user.id }),
			]

			await Promise.all(tasks)
				.then((data) => {
					let [ user ] = data
					let list = user.lists.find((x) => x.id === listId)
					list.sites = list.sites.filter( x => x.id !== itemId)
					
					user.save((err) => {
						if (err) error = err;
						console.log('Updated ' + user.id + ' in DB')
					})
					const { _id, access_token, scopes, __v, ...trimmedUser } = user.toObject()
					return trimmedUser
				})
				.then((trimmedUser) => {
					res.json({ ...trimmedUser, authenticated: true })
				})
				.catch((err) =>  res.json({ error: err}))
				
		} else {
			res.json({ authenticated: false });
		}
	})

	app.post('/entry/update/', async  (req, res) => {
		console.log(req.body)
		let { title, itemId, listId, newListId } = req.body
		if (req.isAuthenticated()){

			let tasks = [
				User.findOne({ id: req.user.id }),
			]

			await Promise.all(tasks)
				.then((data) => {
					let [ user ] = data
		
					let oldList = user.lists.find((x) => x.id === listId)
					let newList = user.lists.find((x) => x.id === newListId)

					if ( title ) {
						oldList.sites = oldList.sites.map((site) => {
							return site.id === itemId ? { ...site, title: title } : site
						})
					}

					if (newListId !== listId ) {
						oldList.sites = oldList.sites.reduce((acc, site) => {
						
							site.id === itemId ? newList.sites = [ ...newList.sites, site ] : acc = [ ...acc, site ]
							return acc
						}, [])
					}

					user.save((err) => {
						if (err) error = err;
						console.log('Updated ' + user.id + ' in DB')
					})
					const { _id, access_token, scopes, __v, ...trimmedUser } = user.toObject()
					return trimmedUser
				})
				.then((trimmedUser) => {
					res.json({ ...trimmedUser, authenticated: true })
				})
				.catch((err) =>  res.json({ error: err}))
				
		} else {
			res.json({ authenticated: false });
		}
	})
};