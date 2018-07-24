'use strict';
const crypto = require('crypto')
const Controller = require('egg').Controller;

class UserController extends Controller {
	async create() {
		if (this.ctx.request.body) {
			this.ctx.request.body.password = crypto.createHmac('sha256', 'MosesAndKround').update(this.ctx.request.body.password).digest('hex');
			const res = await this.ctx.service.user.createUser(this.ctx.request.body);
			if (res.errors) {
				this.ctx.body = {
					code: 10000,
					message: res.errors[0].message
				};
			} else {
				this.ctx.body = {
					code: 200,
					data: {
						id: res.id
					}
				};
			}
		} else {
			this.ctx.status = 4001;
			this.ctx.body = {
				code: 10001,
				message: '没有body'
			};
		}
	}
	authenticate() {
		this.ctx.body = {
			result: 'ok'
		};
	}
	async getNP(wechat_uid){

	}
}

module.exports = UserController;