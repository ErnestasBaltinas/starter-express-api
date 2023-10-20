const express = require('express');
const app = express();
const port = process.env.PORT || 3005;

app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.listen(port, async () => {
	console.log(`Server is running on port: ${port}`);
});
