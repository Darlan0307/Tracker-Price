import { User } from "@app/users"
import { logger } from "@infra/logger"
import { prismaDB } from "@shared/prisma"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails![0].value
        const providerId = profile.id
        const providerName = profile.provider

        let user = await prismaDB.user.findUnique({
          where: {
            providerId
          }
        })

        if (user) {
          return done(null, {
            ...user,
            acceptEmailNotification: Boolean(user.acceptEmailNotification)
          })
        }

        user = await prismaDB.user.findUnique({
          where: { email }
        })

        if (user) {
          // Usuário existe mas com outro provider
          // Atualiza para incluir o novo provider (cuidado: isso vai sobrescrever o provider anterior)
          user = await prismaDB.user.update({
            where: { id: user.id },
            data: {
              providerId,
              providerName,
              name: profile.displayName,
              image: profile.photos?.[0].value ?? null
            }
          })
        } else {
          user = await prismaDB.user.create({
            data: {
              providerId,
              providerName,
              email,
              name: profile.displayName,
              image: profile.photos?.[0].value ?? null
            }
          })
        }

        done(null, {
          ...user,
          acceptEmailNotification: Boolean(user.acceptEmailNotification)
        })
      } catch (error) {
        logger.error("Erro ao autenticar usuário Google:" + JSON.stringify(error, null, 2))
        done(error, false)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user: User, done) => {
  try {
    const userExists = await prismaDB.user.findUnique({
      where: {
        id: user.id
      }
    })

    if (!userExists) {
      return done(null, false)
    }

    done(null, {
      ...userExists,
      acceptEmailNotification: Boolean(userExists.acceptEmailNotification)
    })
  } catch (error) {
    done(error, null)
  }
})

export default passport
