import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const {
  handlers: { GET, POST },
  auth
  // CSRF_experimental
  // @ts-ignore
} = NextAuth({
  // @ts-ignore
  providers: [GitHub],
  callbacks: {
    // @ts-ignore
    jwt: async ({ token, profile }) => {
      console.log('jwt - token', token?.name)
      if (profile?.id) {
        token.id = profile.id
        token.image = profile.picture
      }
      return token
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
