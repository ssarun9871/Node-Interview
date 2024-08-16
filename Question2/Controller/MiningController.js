const User = require('../models/User');
const Claim = require('../models/Claim');

const COINS_PER_HOUR = 5;
const MAX_CLAIM = 10;
const MAX_COINS_PER_DAY = 100;

function currentTimeInSeconds() {
    return Math.floor(Date.now() / 1000);
}

function calculateEarnedCoins(lastTimestamp, currentTimestamp) {
    const hours = Math.max(0, (currentTimestamp - lastTimestamp) / 3600);
    return Math.floor(hours * COINS_PER_HOUR);
}

function isNewDay(lastTimestamp, currentTimestamp) {
    const lastDate = new Date(lastTimestamp * 1000);
    const currentDate = new Date(currentTimestamp * 1000);
    return lastDate.toDateString() !== currentDate.toDateString();
}

const startMining =  async (req, res) => {
    const { username } = req.body;
    console.log("username ===>>>>>> "+username)

    try {
        const user = await User.findOne({ where: { username : username} });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const currentTimestamp = currentTimeInSeconds();

        if (isNewDay(user.last_mine_timestamp, currentTimestamp)) {
            user.earned_today = 0;
            user.unclaimed = 0;
            user.last_mine_timestamp = currentTimestamp;
            await user.save();

            return res.status(200).json({ message: 'Mining started successfully', minedToday: 0 });
        }

        const earnedCoins = calculateEarnedCoins(user.last_mine_timestamp, currentTimestamp);
        const newMinedToday = Math.min(earnedCoins, MAX_COINS_PER_DAY - user.earned_today);

        if (newMinedToday > 0) {
            user.last_mine_timestamp = currentTimestamp;
            user.earned_today += newMinedToday;
            user.unclaimed += newMinedToday;
            await user.save();
        }

        res.status(200).json({ message: 'Mining started successfully', minedToday: newMinedToday });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const claimCoins = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let claim_amount = Math.min(MAX_CLAIM, user.unclaimed);

        if (claim_amount > 0) {
            user.balance += claim_amount;
            user.unclaimed -= claim_amount;
            await user.save();

            await Claim.create({
                user_id: user.user_id,
                claim_timestamp: currentTimeInSeconds(),
                claim_amount: claim_amount
            });
        }

        res.status(200).json({ message: 'Claim successful', newBalance: user.balance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    startMining,
    claimCoins
};
