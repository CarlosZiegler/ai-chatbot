import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental
  // @ts-ignore
} = NextAuth({
  // @ts-ignore
  providers: [GitHub],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      return true
    },
    // @ts-ignore
    jwt: async ({ token, profile }) => {
      console.log('jwt - token', token, profile)
      if (profile?.id) {
        token.id = profile.id
        token.image = profile.picture
      }
      return token
    },
    session: async ({ session, token, user }: any) => {
      console.log('session', session, token, user)
      session.user.id = token.id
      session.user.image = token.image
      return session
    }
    // @TODO
    // authorized({ request, auth }: any) {
    //   console.log('authorized', auth)
    //   return !!auth?.user
    // }
  },
  pages: {
    signIn: '/sign-in'
  }
})
