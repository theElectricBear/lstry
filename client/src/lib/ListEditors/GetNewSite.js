import axios from 'axios'

export const getNewSite = async ( url ) => {
	try { 
		const res = await axios.post('/api/get-new-site', { url: url })
		if(res.data.message) alert(res.data.message)
		return res.data
	
	} catch (err) {
		console.log(err);
	}
}