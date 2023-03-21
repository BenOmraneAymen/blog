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
        })
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

router.get("/userValid", async (req, res) => {
    const token = req.headers.authorization
    let result = checkToken(token, process.env.SECRET_KEY)
    console.log("result",result)
    res.json({ 'validation': result })
})

router.get("/adminValid", async (req, res) => {
    const token = req.headers.authorization
    let result = checkToken(token, process.env.ADMIN_SECRET_KEY)
    console.log("result",result)
    res.json({ 'validation': result })
})


router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    User.findById(req.params.userId).then(result => {
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
        console.log(process.env.SECRET_KEY)
        console.log(process.env.ADMIN_SECRET_KEY)
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        console.log("login -----------------------------------------",user)
        if (user) {
            if (await hashHelpers.checkPassword(password, user.password)) {
                if(user.isAdmin==true){
                    console.log("----------------------admin login--------------------------------")
                    let accessToken = jwt.sign({ email: email }, process.env.ADMIN_SECRET_KEY, {
                        expiresIn: '1h',
                    })
                    res.status(200).send({ token: accessToken, user })

                }else{
                    console.log("----------------------user login--------------------------------")
                    let accessToken = jwt.sign({ email: email }, process.env.SECRET_KEY, {
                        expiresIn: '1h',
                    })
                    res.status(200).send({ token: accessToken, user })

                }
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

router.put('/suspend/:id', async (req, res) => {
    const guiltyUser = await User.findById(req.params.id)
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