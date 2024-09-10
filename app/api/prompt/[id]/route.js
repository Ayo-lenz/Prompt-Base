import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

/* we need this route inside a dynamic route folder for us to be 
able to know the specific prompt we are working with

this route is going to have 3 types of request
*/

// GET (read)..... helps us to read a one specific prompt

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    // filtering our prompt
    const prompt = await Prompt.findById(params.id).populate('creator'); //find one individual prompt according to it's id
    
    if (!prompt) return new Response('prompt not found', {status: 404})
    return new Response(JSON.stringify(prompt), {status:200})
  } catch (error) {
    return new Response('Failure to fetch all prompts', { status:500 })
  }
}

//PATCH (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) return new Response('Prompt not found', {status: 404});

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), {status : 200})
  } catch (error) {
    return new Response('Failure to update the prompts', { status:500 })
  }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response('Prompt deleted', { status: 200 })
  } catch (error) {
    return new Response('Failed to delete prompt', { status :500 })
  }
}