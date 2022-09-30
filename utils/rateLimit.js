import rateLimit from 'express-rate-limit'

export const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 2, // limit each IP to 2 requests per windowMs
    message: "Trop de comptes créés, vous pourrez réessayer dans une heure."
})

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Trop de requêtes, veuillez réessayer plus tard."
})