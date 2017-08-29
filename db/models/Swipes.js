const Sequelize = require('sequelize');
const db = require('../sequelizeDb');

const PossibleMatches = db.define('possibleMatches', {
  matchIdArray: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [],
    allowNull: true
  }
});


PossibleMatches.prototype.addToMatchArray = function(num){
  this.matchIdArray = this.matchIdArray.concat([num]);
  this.save();
  return this.matchIdArray;
};
module.exports = PossibleMatches;


