import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
	const {userId, prompt, tag} = await req.json(); // helps to extract all the data that we pass through the post request

	try {
		await connectToDB();
		//Again we have to create a model for this prompt like we did with the route so we go to the models folder and create a model
		// From the model we can then create a new prompt

		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tag
		})

		await newPrompt.save();  // to save it in the database

		return new Response (JSON.stringify(newPrompt), { status:201 })
	} catch (error) {
		return new Response ('Failed to create a new prompt', {status: 500});
	}
}