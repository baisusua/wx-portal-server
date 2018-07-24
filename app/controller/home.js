'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		const list = await this.ctx.service.list.getList();
		this.ctx.body = {
			data:list,
			total:list.length
		};
	}
}

module.exports = HomeController;