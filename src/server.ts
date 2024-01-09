import 'dotenv/config'
import { app } from "./app";
import { connectToDB } from "./data/database";

connectToDB();

const PORT = process.env.PORT || 3000;
const __ENV__ = process.env.NODE_ENV

app.listen(PORT, () => {
	console.log(
		`Server is working on port:${PORT} in ${__ENV__} Mode`
	);
});