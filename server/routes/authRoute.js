const router = require('express').Router();
const User = require('../models/user');
const hashHelpers = require('../helpers/hash');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const checkToken = require('../helpers/token');

dotenv.config();

router.get('/', (req, res) => {
    User.find({}).then(result => {
        result.forEach(user => {
            user.password = undefined
            user.isAdmin = undefined
            user.isSuspended = undefined
        })
        console.log(result)
        res.send(result);
    }).catch(err => {
        res.send(
            {
                success: false,
                message: err.message
            }
        )
    })
})

router.get("/validation", async (req, res) => {
    const token = req.headers.authorization
    console.log(token)
    let result = checkToken(token, process.env.SECRET_KEY)
    res.json({ 'validation': result })
})

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    User.findById(req.params.userId).then(result => {
        console.log(result)
        const user = {
            id: userId,
            username: result.username,
            email: result.email,
            isSuspended: result.isSuspended
        }
        res.send(user)
    }).catch(err => {
        res.send(
            {
                success: false,
                message: err.message
            }
        )
    })
})



router.post('/signUp', async (req, res) => {
    try {
        const duplicate = await User.findOne({ email: req.body.email })
        if (duplicate) {
            res.send('user already exists')
        } else {
            let hashedPassword = await hashHelpers.hashPassword(req.body.password)
            let user = new User({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email
            })
            await user.save()
            res.send('User created')
        }
    } catch (err) {
        res.send(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (user) {
            if (await hashHelpers.checkPassword(password, user.password)) {
                const accessToken = jwt.sign({ email: email }, process.env.SECRET_KEY, {
                    expiresIn: '1h',
                })

                res.cookie(
                    'token',
                    accessToken,
                    {
                        httpOnly: true,
                        origin: 'http://localhost:3000',
                    }
                ).status(200).send({ token: accessToken, user })
            } else {
                res.status(400).send('password incorrect')
            }
        } else {
            res.status(404).send('user not found')
        }
    } catch (err) {
        res.send(err)
    }
}
)

router.put('/suspend', async (req, res) => {
    const guiltyUser = await User.findById(req.body.id)
    if (guiltyUser) {
        if (guiltyUser.isSuspended) {
            guiltyUser.isSuspended = false
            guiltyUser.save()
            res.send('user unsuspended')
        }
        else {
            guiltyUser.isSuspended = true
            guiltyUser.save()
            res.send('user suspended')
        }
    }
    else {
        res.send('user not found')
    }

})

router.delete('/', async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email: email })
        if (user) {
            await User.findByIdAndDelete(user._id)
            res.send('user deleted')
        } else {
            res.send('user not found')
        }
    } catch (err) {
        res.send(err)
    }
}
)


module.exports = router;