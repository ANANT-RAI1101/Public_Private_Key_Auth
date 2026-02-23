const crypto = require('crypto');
const UserRepository = require("../repository/user-repository");
const KeyRepository = require("../repository/key-repository")
const JWT = require("jsonwebtoken")

const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor() {
        this.userRepository = new UserRepository()
        this.keyRepository = new KeyRepository()
    }
    async signUp(data) {
        try {
            const algo = "Ed25519"
            if (data.algorithm != algo) {
                throw new Error("Algorithm is different");
            }
            const id = crypto.randomUUID();
            console.log(id);

            const payload = {
                userId: id,
                username: data.username
            }
            const user = await this.userRepository.create(payload)
            console.log(user);

            const keyId = crypto.randomUUID();

            const keyPayload = {
                userId: id,
                keyId: keyId,
                deviceName: data.deviceName,
                publicKey: data.publicKey,
                algorithm: data.algorithm
            }

            const key = await this.keyRepository.create(keyPayload)

            return {
                userId: user.userId,
                username: user.username
            }
        }
        catch (error) {
            throw new error
        }
    }


    async login(data) {//userId,deviceName
        try {
            const challenge = crypto.randomBytes(32).toString("base64");
            const keys = await this.keyRepository.findOne(data.userId, data.deviceName)
            const keyId = keys.keyId
            const challengePayload = {
                userId: data.userId,
                keyId: keyId,
                challenge: challenge
            }
            const response = await this.challengeRepository.create(challengePayload)

            return {
                userId: data.userId,
                challenge: challenge
            }

        } catch (error) {
            throw new error
        }
    }

    async verifyChallenge(data) {//data->userId,challenge,signature,deviceName
        try {
            const keys = await this.keyRepository.findOne(data.userId, data.deviceName)
            const publicKey = keys.publicKey
            const signature = Buffer.from(data.signature, "base64");
            const challenge = Buffer.from(data.challenge, "base64");
            const isVerified = crypto.verify(
                null,
                challenge,
                publicKey,
                signature,

            )
            if (!isVerified) throw new Error("signature is not correct");

            const sessionToken = this.createToken({ userId: data.userId, username: data.username })
            return {
                userId: data.userId,
                sessionToken: sessionToken
            }
        } catch (error) {
            throw new error
        }
    }

    async createToken(user) {
        try {
            const sessionToken = JWT.sign(user, JWT_KEY, { "expiresIn": "2d" })
            return sessionToken
        } catch (error) {

        }
    }
}

module.exports = UserService