const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = process.env.PORT || 3005;

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.get('/test1', async (req, res) => {
	try {
		const results = await fetch(
			'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228'
		);

		const r = await results.json();
		res.json(r);
	} catch (error) {
		console.log({ error });
		res.status(500).json({ error });
	}
});

app.get('/test2', async (req, res) => {
	try {
		const results = await fetch('https://dummyjson.com/products/1');

		const r = await results.json();
		res.json(r);
	} catch (error) {
		console.log({ error });
		res.status(500).json({ error });
	}
});
app.listen(port, async () => {
	console.log(
		`Server is running on port: ${port}`
	);
})