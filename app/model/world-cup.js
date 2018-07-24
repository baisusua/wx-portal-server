module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE
    } = app.Sequelize;

    const WorldCup = app.model.define('WorldCup', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        match_id: STRING,
        match_name: STRING,
        match_date: DATE,
        match_location: STRING,
        match_one_current_price: INTEGER,
        match_one_origin_price: INTEGER,
        match_two_current_price: INTEGER,
        match_two_origin_price: INTEGER,
        match_three_current_price: INTEGER,
        match_three_origin_price: INTEGER,
        sub_title: STRING,
        created_at: DATE,
        updated_at: DATE
    });

    WorldCup.findAllList = function () {
        return this.findAll();
    }
    return WorldCup;
};