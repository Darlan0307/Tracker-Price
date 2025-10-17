import rateLimit from "express-rate-limit"

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    errorMessage:
      "Muitas requisições feitas a partir deste IP, por favor tente novamente mais tarde."
  },
  standardHeaders: true,
  legacyHeaders: false
})
