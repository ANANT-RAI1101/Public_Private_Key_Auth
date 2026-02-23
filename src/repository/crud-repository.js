class CrudRepository {
    constructor(model) {
        this.model = model
    }

    async create(data) {
        try {
            const response = await this.model.create(data);

            return response;
        } catch (error) {
            console.log(error);

        }
    }
    async delete(userId) {
        try {
            const response = await this.model.destroy({
                where: {
                    userId: userId
                }
            });
            return response;
        } catch (error) {
            throw error
        }
    }
    async get(userId) {
        try {
            const response = await this.model.findOne(userId);
            return response;
        } catch (error) {
            throw error
        }
    }
}

module.exports = CrudRepository