const crypto = require('crypto');
const UserRepository = require("../repository/user-repository");
const { use } = require('react');

class UserService {
    constructor() {
        this.userRepository = new UserRepository()
        this.keyRepository = new keyRepository()
    }
    async signUp(data) {
        try {
            const algo = "Ed25519"
            if (data.algorithm != algo) {
                throw new Error("Algorithm is different");
            }
            const id = crypto.randomUUID();
            const payload = {
                userId: id,
                username: data.username
            }
            const user = await this.userRepository.create(payload)


            const keyPayload = {
                userId: id,
                deviceName: data.deviceName,
                publicKey: data.publicKey,
                algorithm: data.algorithm
            }

            const key = await this.keyRepository.create(keyPayload)

            return {
                userId:user.userId,
                username:user.username
            }
        }
        catch(error) {
            throw new error
    }
}
}