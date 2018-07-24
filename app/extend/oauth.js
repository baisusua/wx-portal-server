'use strict';
const crypto = require('crypto')
module.exports = app => {
    class Model {
        constructor(ctx) {
            this.ctx = ctx;
        }
        async getClient(clientId, clientSecret) {
            /* 校验客户端 */
            if (clientId !== 'kround' || clientSecret !== 'moses') {
                return;
            }
            return {
                "id": 1,
                "clientId": "kround",
                "clientSecret": "moses",
                "refreshTokenLifetime": 0,
                "accessTokenLifetime": 0,
                "grants": [
                    "password"
                ]
            }
        }
        async getUser(username, password) {
            const ps = crypto.createHmac('sha256', 'MosesAndKround').update(password).digest('hex');
            const user = await this.ctx.model.User.findByUserByNameAndPassword(username, ps);
            if (!user) {
                return;
            }
            if (username !== user.username || ps !== user.password) {
                return;
            }
            return {
                userId: user.id
            };
        }
        async getAccessToken(bearerToken) {
            const token = await this.ctx.model.Token.findByAccessToken(bearerToken);
            if (token) {
                token.accessTokenExpiresAt = new Date(token.accessTokenExpiresAt);
                token.refreshTokenExpiresAt = new Date(token.refreshTokenExpiresAt);
                const user = await this.ctx.model.User.findById(token.user_id);
                token.user = {
                    userId: user.id
                };
                token.client = {
                    "id": 1,
                    "clientId": "kround",
                    "clientSecret": "moses",
                    "refreshTokenLifetime": 0,
                    "accessTokenLifetime": 0,
                    "grants": [
                        "password"
                    ]
                }
                return token;
            }
            return;
        }
        async saveToken(token, client, user) {
            const res = await this.ctx.model.Token.findByUserId(user.userId);
            if (res) {
                /* 更新token */
                const updateToken = await this.ctx.model.Token.upadeByUserId(token, user.userId);
            } else {
                /* 新建token */
                const createToken = await this.ctx.model.Token.create({
                    user_id: user.userId,
                    accessToken: token.accessToken,
                    accessTokenExpiresAt: token.accessTokenExpiresAt,
                    refreshToken: token.refreshToken,
                    refreshTokenExpiresAt: token.refreshTokenExpiresAt
                })
            }
            return Object.assign({}, token, {
                user
            }, {
                client
            });
        }
        async revokeToken(token) {}
        async getAuthorizationCode(authorizationCode) {}
        async saveAuthorizationCode(code, client, user) {}
        async revokeAuthorizationCode(code) {}
    }
    return Model;
};