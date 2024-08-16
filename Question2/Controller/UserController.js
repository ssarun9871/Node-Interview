const User = require('../models/User');

const addUser = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (user) {
            return res.status(409).json({ error: 'User already exists!' });
        }

        await User.create({ username });

        res.status(200).json({ message: "Successfully added!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getBalance = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        const user_balance = {
            balance : user.balance,
            unclaimed : user.unclaimed,
            earned_today : user.earned_today
        }

        res.status(200).json({ message: "success", user_balance: user_balance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    addUser,
    getBalance
}
