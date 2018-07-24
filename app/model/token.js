module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE
    } = app.Sequelize;

    const Token = app.model.define('Token', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: INTEGER,
        accessToken: STRING,
        accessTokenExpiresAt: DATE,
        refreshToken: STRING,
        refreshTokenExpiresAt: DATE
    });
    Token.findByUserId = function (user_id) {
        return this.findOne({
            where: {
                user_id: user_id
            }
        });
    }
    Token.findByAccessToken = function (accessToken) {
        return this.findOne({
            where: {
                accessToken: accessToken
            }
        });
    }
    Token.upadeByUserId = function (token, user_id) {
        return this.update({
            accessToken: token.accessToken,
            match_date: token.match_date,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt
        }, {
            where: {
                user_id: user_id
            }
        });
    }
    return Token;
};