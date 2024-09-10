import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectToDB();

    // filtering our prompt
    const prompts = await Prompt.find({}).populate('creator'); //find all post and populate the creator to know who create it
    
    return new Response(JSON.stringify(prompts), {status:200})
  } catch (error) {
    return new Response('Failure to fetch all prompts', { status:500 })
  }
}

/**
 it is advisable to create the route where we will post our data
 in a child folder to where we will get the data
 */