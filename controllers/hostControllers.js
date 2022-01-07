
const addSignup = ( passport ) => { 
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
    res.json({
        message: 'Signup success',
        user: req.user
    })
    }
}

export default addSignup