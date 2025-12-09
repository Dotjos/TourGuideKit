// Convex Auth Configuration
// This file sets up authentication providers

export default {
  providers: [
    {
      domain: process.env.AUTH_DOMAIN,
      applicationID: process.env.AUTH_APPLICATION_ID,
    },
  ],
}
