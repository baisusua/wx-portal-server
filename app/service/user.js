const crypto = require('crypto')
const Service = require('egg').Service;
class User extends Service {
    async createUser(data) {
        try {
            const res = await this.ctx.model.User.create(data);
            return res;
        } catch (error) {
            return error;
        }
    }
    async upadeUser(data) {
        const user_id = data.id;
        delete data.id;
        try {
            const res = await this.ctx.model.User.upadeById(data, user_id);
            return res;
        } catch (error) {
            return error;
        }
    }
    async isExistUser(username, email, phone, we_web_uid) {
        if (username) {
            try {
                const res = await this.ctx.model.User.isExist(username, false, false, false);
                return res;
            } catch (error) {
                return error;
            }
        }
        if (email) {
            try {
                const res = await this.ctx.model.User.isExist(false, email, false, false);
                return res;
            } catch (error) {
                return error;
            }
        }
        if (phone) {
            try {
                const res = await this.ctx.model.User.isExist(false, false, phone, false);
                return res;
            } catch (error) {
                return error;
            }
        }
        if (we_web_uid) {
            try {
                const res = await this.ctx.model.User.isExist(false, false, false, we_web_uid);
                return res;
            } catch (error) {
                return error;
            }
        }
    }
    async getNP(we_web_uid){
        try {
            const res = await this.ctx.model.User.getNP(we_web_uid);
            // const ps = crypto.createHmac('sha256', 'MosesAndKround').update(password).digest('hex');
            return res;
        } catch (error) {
            return error;
        }
    }
}
module.exports = User;