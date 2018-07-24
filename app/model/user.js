module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE
    } = app.Sequelize;

    const User = app.model.define('Users', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: STRING,
        password: STRING,
        nickname: STRING,
        portrait: STRING,
        phone: STRING,
        email: STRING,
        wechat_uid: STRING,
        realname: STRING, //真实姓名
        card_id: STRING, //身份证ID等
        card_type: STRING, //身份证，护照等
        sex: INTEGER,
        age: INTEGER,
        grade: INTEGER, //等级
        special: INTEGER, //特殊标记，方便扩展
        address: STRING,
        integral: INTEGER, //积分
        created_at: DATE,
        updated_at: DATE
    });
    User.findByUserByNameAndPassword = function (username, password) {
        return this.findOne({
            where: {
                username: username,
                password: password
            }
        });
    }
    User.findById = function (user_id) {
        return this.findOne({
            where: {
                id: user_id
            }
        });
    }
    User.findByUid = function (wechat_uid) {
        return this.findOne({
            where: {
                wechat_uid: wechat_uid
            }
        });
    }
    User.findByPhone = function (phone) {
        return this.findOne({
            where: {
                phone: phone
            }
        });
    }
    User.isExist = function (username, phone, email, wechat_uid) {
        if (username) {
            return this.findOne({
                where: {
                    username: username
                }
            });
        }
        if (phone) {
            return this.findOne({
                where: {
                    phone: phone
                }
            });
        }
        if (email) {
            return this.findOne({
                where: {
                    email: email
                }
            });
        }
        if (wechat_uid) {
            return this.findOne({
                where: {
                    wechat_uid: wechat_uid
                }
            });
        }
    }
    User.upadeById = function (data, user_id) {
        return this.update(data, {
            where: {
                id: user_id
            }
        });
    }
    return User;
};