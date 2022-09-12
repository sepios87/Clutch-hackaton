const fs = require('fs')
const express = require('express')
const Router = express.Router

const jwt = require('jsonwebtoken')

const cookieParser = require('cookie-parser')
const jwtMiddleware = require('express-jwt')
const getTokenFromCookie = cookieKey => req => {
    const token = req.cookies && req.cookies[cookieKey]
    if(token){
        return token
    }

    return null
}

const getCredentialsFromRequest = req => {
    if(req.headers.authorization){
        const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
        const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')
        return {
            username,
            password
        }
    } else if(req.body.username && req.body.password){
        return {
            username: req.body.username,
            password: req.body.password
        }
    } else {
        return null
    }
}

const authMiddleware = settings => Router()
    .use(cookieParser())
    .post('/auth/login', (req, res) => {

        const credentials = getCredentialsFromRequest(req)
        if(!credentials){
            return res.status(401)
                .json({
                    error: 'Failed to authenticate : Missing credentials'
                })
        }

        const {
            username,
            password
        } = credentials
    
        fs.promises.readFile(settings.database)
            .then(content => JSON.parse(content))
            .then(data => {
                const user = data.users.find(user => user.email === username);

                const {
                    password: userPwd,
                    ...userWithoutPwd
                } = user

                if(user && userPwd === password){
                    return {
                        token: jwt.sign({
                            user: userWithoutPwd,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            iat: Date.now()
                        }, settings.jwt.secret),
                        userWithoutPwd,
                    }
                    
                } else {
                    throw new Error('Mismatching credentials')
                }
            })
            .then(({token, userWithoutPwd}) => {
                res.cookie(settings.jwt.cookieKey, token)
                res.json({
                    msg: 'success',
                    user: userWithoutPwd
                })
            })
            .catch(() => {
                res.status(401)
                    .json({
                        error: 'Failed to authenticate : Mismatching credentials'
                    })
            })
    })

    .use(jwtMiddleware({
        secret: settings.jwt.secret,
        algorithms: [settings.jwt.algorithm],
        credentialsRequired: false,
        requestProperty: 'auth',
        getToken: getTokenFromCookie(settings.jwt.cookieKey)
    }))

    .use((err, req, res, next) => {
        if(err && err.name === 'UnauthorizedError'){
            return next()
        }

        next(err)
    })
    
    .get('/auth/me', (req, res) => {
        if(req.auth){
            return res.json(req.auth.user)
        }
        res.status(401)
            .json({
                msg: 'Unauthorized'
            })
    })
    
    .post('/auth/logout', (req, res) => {
        res.cookie(settings.jwt.cookieKey, '')
        res.json({
            msg: 'success'
        })
    })


const protect = (req, res, next) => {
    next()
}

module.exports = {
    authMiddleware,
    protect
}