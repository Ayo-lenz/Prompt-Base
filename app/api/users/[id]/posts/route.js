 import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

/* we want to get only the post from the specific creator here
  to do this, we will pass additional params which gets populated if we pass
  dynamic variables into the url, thats why we have the id as a dynamic parameter

*/
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    // filtering our prompt
    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator'); //find all post and populate the creator to know who create it
    
    return new Response(JSON.stringify(prompts), {status:200})
  } catch (error) {
    return new Response('Failure to fetch all prompts', { status:500 })
  }
}