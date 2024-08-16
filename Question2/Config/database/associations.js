const User = require('../../models/User');
const Claim = require('../../models/Claim');

User.hasMany(Claim);
Claim.belongsTo(User);