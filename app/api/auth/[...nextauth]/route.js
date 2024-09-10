import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";  // now lets import from the database component
import User from "@models/user";


// console.log(
//   {
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   }
// )
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],

  callbacks: {
    async session({ session }) {
      //  We want to be able to get the data about that user every time to keep an existing and running session
      const sessionUser = await User.findOne({
        email: session.user.email
      })
  
      session.user.id = sessionUser._id.toString();
  
      return session;
    },
  
    async signIn ({ profile }) {
      try {
        /*
        Keep in mind that every next js route is a serverless route that opens up only
        when it gets called so every time it gets called it means to spin up the server and make a connection
        to the database therefore lets open a database folder in our utils
        */
        await connectToDB();
  
        // check if user already exist
        const userExist = await User.findOne({
          email: profile.email
        });
  
        // if not, create a new user
        /* create a function to create a new user and add it to the database we
        just connected to and to be able to do we first need to create a model
        based on which the document of the user will be created*/
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.picture
          })
        }
  
        return true
      } catch (error) {
        console.log(error);
        return false;
      }
    }

  }
   
 
});

export { handler as GET, handler as POST };

/*
we create a project on console.cloud.google.com and did the set up

**** we are exploring the opportunity to dive into the use of nest js route for backend endpoint
alongside using the front end side as well 

 */