const express = require('express')
const fetch = require('node-fetch');
const urls = require('./data.js')
const app = express()
const port = process.env.PORT || 3005;
const axios = require('axios');
const http = require('http');
const https = require('https');

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
       'https://ipr.esveikata.lt/api/searches/appointments/times?municipalityId=7&healthcareServiceId=210&organizationId=1000098867&specialistId=1000118730&leftBound=1697312057000&rightBound=1701295200000',
	   '/searches/appointments/times?municipalityId=19&professionCode=221205&organizationId=1143747565&leftBound=1697384690000',
	   '/searches/appointments/times?municipalityId=54&professionCode=221249&organizationId=1000098434',
	   '/searches/appointments/times?municipalityId=28&professionCode=321402',
	   '/searches/appointments/times?municipalityId=19&professionCode=221205&healthcareServiceId=119&organizationId=1143747565&leftBound=1697384690000',
	   '/searches/appointments/times?municipalityId=12&professionCode=221205&healthcareServiceId=119&specialistId=1005321131',
	   '/searches/appointments/times?municipalityId=28&professionCode=321402&specialistId=4685196652',
	   '/searches/appointments/times?municipalityId=28&professionCode=321402&specialistId=4685196652&leftBound=1697384690000&rightBound=1698703200000',
	   '/searches/appointments/times?municipalityId=28&professionCode=325503&organizationId=1000098069&leftBound=1697384690000&rightBound=1698703200000',
	   '/searches/appointments/times?municipalityId=28&professionCode=221201&organizationId=1000098069',
	   '/searches/appointments/times?municipalityId=28&professionCode=221226&organizationId=4295989277',
	   '/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1782934985',
	   '/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000099577',
	   '/searches/appointments/times?municipalityId=56&professionCode=222201&healthcareServiceId=497&leftBound=1697384690000&rightBound=1698354000000',
	   '/searches/appointments/times?municipalityId=7&professionCode=221226&organizationId=1914239898',
	   '/searches/appointments/times?municipalityId=7&professionCode=221258&organizationId=1914239898',
	   '/searches/appointments/times?municipalityId=7&professionCode=221245&organizationId=1914239898',
	   '/searches/appointments/times?municipalityId=7&professionCode=221101&organizationId=1914239898&specialistId=1023663367',
	   '/searches/appointments/times?municipalityId=7&professionCode=221101&organizationId=2061867869',
	   '/searches/appointments/times?municipalityId=7&professionCode=221101&organizationId=1110592446',
	   '/searches/appointments/times?municipalityId=7&professionCode=221101&organizationId=1424145958',
	   '/searches/appointments/times?municipalityId=7&professionCode=221101&organizationId=1004903753',
	   '/searches/appointments/times?municipalityId=7&professionCode=222105&organizationId=1004903753',
	   '/searches/appointments/times?municipalityId=7&professionCode=221244&organizationId=1004903753',
	   '/searches/appointments/times?municipalityId=7&professionCode=221251&organizationId=1004903753',
	   '/searches/appointments/times?municipalityId=7&professionCode=221251&organizationId=1004903753&specialistId=1000113693',
	   '/searches/appointments/times?municipalityId=7&professionCode=221251&organizationId=1004903753&specialistId=1000113078',
	   '/searches/appointments/times?municipalityId=7&professionCode=221251&organizationId=1004903753&specialistId=1000113078',
	   '/searches/appointments/times?municipalityId=7&professionCode=221251&organizationId=1004903753&specialistId=1000110721',
	   '/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1004903753',
	   '/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1004904460',
	   '/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000097704',
	   '/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000097704&specialistId=1000112937',
	   '/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000098867',
	   '/searches/appointments/times?municipalityId=2&professionCode=222101&specialistId=1005321131',
	   '/searches/appointments/times?municipalityId=10&professionCode=222101&organizationId=1004907313',
	   '/searches/appointments/times?municipalityId=56&professionCode=221212&specialistId=4835954402',
	   '/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000097704&specialistId=1000116812',
	   '/searches/appointments/times?municipalityId=7&professionCode=221228&organizationId=1000097704&specialistId=1000114808',
	   '/searches/appointments/times?municipalityId=7&organizationId=1000097704&specialistId=1000114808',
	   '/searches/appointments/times?municipalityId=19&healthcareServiceId=88&organizationId=1000097028',
	   '/searches/appointments/times?municipalityId=19&healthcareServiceId=139&organizationId=1000097028&leftBound=1697384690000&rightBound=1697662800000',
	   '/searches/appointments/times?municipalityId=54&healthcareServiceId=88&organizationId=1000098423&specialistId=1007468635',
	   '/searches/appointments/times?municipalityId=7&professionCode=221205&organizationId=1000097704&specialistId=1000112863',
	   '/searches/appointments/times?municipalityId=7&professionCode=221204&organizationId=1000097704&specialistId=1000112863',
	   '/searches/appointments/times?municipalityId=7&professionCode=221204&organizationId=1000097704&specialistId=1000112863',
	   '/searches/appointments/times?municipalityId=19&healthcareServiceId=139&organizationId=1000098646&leftBound=1697384690000&rightBound=1697662800000',
	   '/searches/appointments/times?municipalityId=54&professionCode=226304&organizationId=1000098423',
	   '/searches/appointments/times?municipalityId=5&professionCode=221204&organizationId=1004904377',
	   '/searches/appointments/times?municipalityId=5&professionCode=221204&organizationId=1000097834',
	   '/searches/appointments/times?municipalityId=5&professionCode=221204&organizationId=1004907393',
	   '/searches/appointments/times?municipalityId=5&professionCode=221204&organizationId=1004907164',
	   '/searches/appointments/times?municipalityId=5&professionCode=221204&organizationId=1000098137&specialistId=1000103700',
	   '/searches/appointments/times?municipalityId=5&professionCode=221204&organizationId=1000098137&specialistId=1000116733',
	   '/searches/appointments/times?municipalityId=5&professionCode=221204&organizationId=1000098137&specialistId=1326421547',
	   '/searches/appointments/times?municipalityId=5&professionCode=221204&organizationId=1000098137&specialistId=1196503446'
       ]

	   
const BASE_URL = 'https://ipr.esveikata.lt/api'
const axi = axios.create({
	baseURL: BASE_URL,
	timeout: 30000, // Adjust the timeout as needed

	//keepAlive pools and reuses TCP connections, so it's faster
	httpAgent: new http.Agent({ keepAlive: true }),
	httpsAgent: new https.Agent({ keepAlive: true }),
});


// Set a timer with a 5-minute (300,000 milliseconds) delay
const delayInMilliseconds = 5 * 60 * 1000; // 5 minutes in milliseconds

let timer = null;

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

app.get('/start', async (req, res) => {
	try {
		axiosCalls(100, 10);
		timer = setInterval(() => {
      // Code to run after the 5-minute delay
      console.log('------------------------------')
      axiosCalls(100, 10);
    }, delayInMilliseconds);
		res.json('started');
	} catch (error) {
		console.log({ error });
		res.status(500).json({ error });
	}
});

app.get('/clear', async (req, res) => {
	try {
		clearInterval(timer);
		res.json('cleared');
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

app.get('/test3/:count/:size', async (req, res) => {

	const count = Number(req.params.count);
	const size = Number(req.params.size);
	const promisesUrls = [...IPR_URLS].splice(0, count);
	const chunkSize = size || 30; // Set the desired chunk size
	const chunks = [];

	for (let i = 0; i < promisesUrls.length; i += chunkSize) {
		chunks.push(promisesUrls.slice(i, i + chunkSize));
	}

	let results = [];
	console.log(`[FETCH-chunks] ${chunks.length} for [URLS]: ${promisesUrls.length}`);
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
		length: results.length,
		rejected: results.filter(r => r.status === 'rejected').length,
		fulfilled: results.filter(r => r.status !== 'rejected').length
	})

	res.json(results.filter(r => r.status === 'rejected')); 


});

app.get('/test4/:count/:size', async (req, res) => {

	const count = Number(req.params.count);
	const size = Number(req.params.size);
	const results = await axiosCalls(count, size);

	res.json(results.filter(r => r.status === 'rejected')); 

});

app.get('/test4', async (req, res) => {
	res.json(IPR_URLS.length)
});

async function axiosCalls(count, size) {
	let promisesUrls = [...IPR_URLS].splice(0, count);
	const chunkSize = size || 30; // Set the desired chunk size
	const chunks = [];

	for (let i = 0; i < promisesUrls.length; i += chunkSize) {
		chunks.push(promisesUrls.slice(i, i + chunkSize));
	}

	let results = [];
	console.log(`[AXIOS-chunks] ${chunks.length} for [URLS]: ${promisesUrls.length}`);
	let i = 0;
	for (const chunk of chunks) {
		const data = await Promise.allSettled(
			chunk.map(async (url) => {
				try {
					const nUrl = url.replace(BASE_URL, '')
					const response = await axi(nUrl);
					console.log(`[Headers] :`, {headers: response.headers})
					if (response.status !== 200) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					
					return response.data; // Assuming response is JSON
				} catch (error) {
					// console.log(`${url} :`, error.message);
					throw `Error axios data from ${url}: ${error.message}`;
				}
			})
		);
		i += 1;
		results = [...results, ...data];
		console.log(`[chunk-done] ${i}/${chunks.length}`);
	}
	console.log(`[chunk-results] length: ${results.length}, rejected: ${results.filter(r => r.status === 'rejected').length}, fulfilled: ${results.filter(r => r.status !== 'rejected').length}`);
	
	return results;
}

app.listen(port, async () => {
	console.log(
		`Server is running on port: ${port}`
	);
})