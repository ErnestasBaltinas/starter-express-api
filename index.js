const express = require('express')
const fetch = require('node-fetch');
const urls = require('./data.js')
const app = express()
const port = process.env.PORT || 3005;

const IPR_URLS =  [
    'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&healthcareServiceId=9&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&organizationId=1000099157&specialistId=5126389312',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&leftBound=1697312057000&rightBound=1695751200000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&leftBound=1697312057000&rightBound=1695762000000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000099606',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=117&organizationId=1914239898&specialistId=1222687802',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=117&organizationId=1914239898&specialistId=1222687802',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=222201&healthcareServiceId=117&organizationId=1914239898&specialistId=1222687802',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=222201&healthcareServiceId=474&organizationId=1914239898&specialistId=1222687802',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221213&organizationId=1000098802',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=356&organizationId=1914239898&specialistId=1023663367',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=211',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=211',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=1798850657',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000099157',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000099157',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000099157',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000099606',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000097713',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=226102&healthcareServiceId=79',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221277&healthcareServiceId=272&specialistId=2295530192',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&healthcareServiceId=211&organizationId=1000099076&specialistId=1000114798&leftBound=1697312057000&rightBound=1698703200000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=79',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&healthcareServiceId=448',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=1000117810',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&healthcareServiceId=91&organizationId=1000098867&specialistId=1000114624',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221216&healthcareServiceId=157&organizationId=1782934985&specialistId=1143501137&leftBound=1697312057000&rightBound=1698703200000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&specialistId=1000111443&leftBound=1697312057000&rightBound=1728766800000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221221&specialistId=1000116001',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&healthcareServiceId=447&specialistId=1000114474',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=4347147355',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221252',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221205',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221221&healthcareServiceId=178&organizationId=1000098867&specialistId=1000111443&leftBound=1697312057000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221230&healthcareServiceId=250&specialistId=1000107145',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221221&healthcareServiceId=177',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&specialistId=1000111443',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&leftBound=1697312057000&rightBound=1701295200000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=1000112489',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221204&healthcareServiceId=115&organizationId=1000099157&leftBound=1697312057000&rightBound=1698094800000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=1000114474',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221248&organizationId=1000098867&leftBound=1697312057000&rightBound=1698703200000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&organizationId=1000099303&specialistId=1000113464&leftBound=1697312057000&rightBound=1698703200000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&healthcareServiceId=9&leftBound=1697312057000&rightBound=1701381600000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221205&healthcareServiceId=117&organizationId=1000099076&leftBound=1697312057000&rightBound=1701295200000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221204&healthcareServiceId=508&organizationId=1000098072&leftBound=1697312057000&rightBound=1701295200000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221259&healthcareServiceId=14&organizationId=1000098867&specialistId=1000117810&leftBound=1697312057000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=1000114474',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221221',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221221&healthcareServiceId=176&organizationId=1000098867&specialistId=1000111443&leftBound=1697312057000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=1000114474',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=1000114474',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221259&healthcareServiceId=14&organizationId=1000098867&specialistId=1000117810&leftBound=1697312057000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221221&organizationId=1000098867&specialistId=1000111443&leftBound=1697312057000&rightBound=1701295200000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=9&organizationId=1000098867&specialistId=1000111443&leftBound=1697312057000&rightBound=1698962400000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&specialistId=1000113624&leftBound=1697312057000&rightBound=1701295200000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000098867&specialistId=1000114474',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221213&organizationId=1000098867&specialistId=1000118310',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221227&specialistId=1335407924',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=210&organizationId=1000098867&specialistId=1000117810&leftBound=1697312057000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221205&healthcareServiceId=117&organizationId=1000099157&specialistId=1000116944',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=251',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=1000114474',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&healthcareServiceId=91&organizationId=1000098867&specialistId=1000114474',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=1000114474',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221221&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=1000109462&leftBound=1697312057000&rightBound=1706652000000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=9',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&specialistId=1000114474',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&healthcareServiceId=9',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=214&organizationId=1000099076&specialistId=1000117202&leftBound=1697312057000&rightBound=1703973600000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000098867',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&healthcareServiceId=9',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221227&healthcareServiceId=429&organizationId=1000098802&specialistId=1335407924&leftBound=1697312057000&rightBound=1703973600000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=12&organizationId=1000098867&specialistId=1000117810&leftBound=1697312057000&rightBound=1703973600000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&healthcareServiceId=9',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221216',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221221&healthcareServiceId=178&organizationId=1000098867&specialistId=1000111443&leftBound=1697312057000&rightBound=1714510800000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221221&organizationId=1000099076&specialistId=1000116001&leftBound=1697312057000&rightBound=1701295200000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221257&healthcareServiceId=9&organizationId=1000098867&specialistId=1000109462',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=1000117810',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000098867&leftBound=1697312057000&rightBound=1703973600000',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&specialistId=1000113728',
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=210&organizationId=1000098867&specialistId=1000118730&leftBound=1697312057000&rightBound=1701295200000'
       ]

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

app.get('/test3/:size', async (req, res) => {

	const size = Number(req.params.size);
	const promisesUrls = [...IPR_URLS];
	const chunkSize = size || 30; // Set the desired chunk size
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
	res.json(IPR_URLS.length)
});

app.listen(port, async () => {
	console.log(
		`Server is running on port: ${port}`
	);
})