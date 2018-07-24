const Service = require('egg').Service;
const XLSX = require('xlsx');
const moment = require('moment');

class Excel extends Service {
    async getExcel() {
        const list = await this.ctx.service.list.getList();
        const name = list[0] ? moment(list[0].updated_at).format('YYYY-MM-DD HH:mm') : '暂无数据';
        const _headers = ['时间', '场次', '场地', '一类票价', '二类票价', '三类票价', '赛程', '更新日期'];
        const headers = _headers.map((v, i) => Object.assign({}, {
                v: v,
                position: String.fromCharCode(65 + i) + 1
            }))
            .reduce((prev, next) => Object.assign({}, prev, {
                [next.position]: {
                    v: next.v
                }
            }), {});
        const data = [];
        list.forEach((item, index) => {
            data.push({
                '时间': moment(item.match_date).format('YYYY-MM-DD HH:mm'),
                '场次': item.match_name,
                '场地': item.match_location,
                '一类票价': item.match_one_current_price,
                '二类票价': item.match_two_current_price,
                '三类票价': item.match_three_current_price,
                '赛程': item.sub_title,
                '更新日期': moment(item.updated_at).format('YYYY-MM-DD HH:mm')
            });
        });
        const jsonData = data.map((v, i) => _headers.map((k, j) => Object.assign({}, {
                v: v[k],
                position: String.fromCharCode(65 + j) + (i + 2)
            })))
            .reduce((prev, next) => prev.concat(next))
            .reduce((prev, next) => Object.assign({}, prev, {
                [next.position]: {
                    v: next.v
                }
            }), {});
        const output = Object.assign({}, headers, jsonData);
        const outputPos = Object.keys(output);
        const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
        const wb = {
            SheetNames: [name],
            Sheets: {}
        };
        wb.Sheets[name] = Object.assign({}, output, {
            '!ref': ref
        })
        const buf = XLSX.write(wb, {
            type: 'buffer',
            bookType: 'xlsx'
        });
        return {
            excel: buf,
            name: name+'.xlsx'
        };
    }
}
module.exports = Excel;