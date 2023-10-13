<<<<<<< HEAD
const mongoose = require('mongoose');

const db_url = process.env.DATABASE;

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect("mongodb+srv://ranjitbera34567:ranjit@cluster0.ruvbblv.mongodb.net/?retryWrites=true&w=majority", connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
=======
const mongoose = require('mongoose');

const db_url = process.env.DATABASE;

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect(db_url, connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
>>>>>>> origin/main
};