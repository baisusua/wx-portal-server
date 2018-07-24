'use strict';

const Controller = require('egg').Controller;

class ExcelController extends Controller {
    async index() {
        const config = await this.ctx.service.excel.getExcel();
        this.ctx.body = config.excel;
        this.ctx.set('Content-Type', 'application/vnd.openxmlformats');
        this.ctx.set("Content-Disposition", "attachment; filename=" + config.name);
    }
}

module.exports = ExcelController;