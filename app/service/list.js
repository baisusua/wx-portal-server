const Service = require('egg').Service;
class List extends Service {
    async getList() {
        const list = await this.ctx.model.WorldCup.findAllList();
        return list;
    }
}
module.exports = List;