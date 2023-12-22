import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import {config} from "dotenv";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "107929581278-5e0h11g4ukgf7vgqi8bf935qa5dc7vdt.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});

/*https://www.telerik.com/blogs/how-to-implement-google-authentication-nextjs-app-using-nextauth*/