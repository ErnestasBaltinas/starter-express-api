const express = require('express')
const fetch = require('node-fetch');
const urls = require('./data.js')
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

app.get('/test3', async (req, res) => {

	const promisesUrls = urls.splice(0, 150);
	const chunkSize = 10; // Set the desired chunk size
	const chunks = [];

	for (let i = 0; i < promisesUrls.length; i += chunkSize) {
		chunks.push(promisesUrls.slice(i, i + chunkSize));
	}

	let results = [];
	console.log(`[chunks] ${chunks.length} for [URLS]: ${promisesUrls.length}`);
	let i = 0;
	for (const chunk of chunks) {
		const data = await Promise.allSettled(
			chunk.map(async (url) => {
				try {
					const response = await fetch(url);

					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}

					return response.json(); // Assuming response is JSON
				} catch (error) {
					console.log({error});
					throw `Error fetching data from ${url}: ${error.message}`;
				}
			})
		);
		i += 1;
		console.log(`[chunk-done] ${i}/${chunks.length}`);
		results = [...results, ...data];
	}

	console.log({
		length: results.length
	})

	res.json(results.filter(r => r.status === 'rejected')); 


});

app.get('/test4', async (req, res) => {
	res.json(urls.length)
});

app.listen(port, async () => {
	console.log(
		`Server is running on port: ${port}`
	);
})