import NextAuth from "next-auth";

import { authOptions } from "rekommendera/server/auth";

export default NextAuth(authOptions);
