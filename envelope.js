const db = require('./db'); // assume db ni instance ya MongoDB
const envelopeCodesCollection = db.collection('envelopeCodes');
const envelopeWinnersCollection = db.collection('envelopeWinners');

const checkEnvelopeCode = async (code) => {
  const validCode = await envelopeCodesCollection.findOne({ code });
  
  if (!validCode) return { success: false, message: "Invalid code." };
  if (validCode.redeemed) return { success: false, message: "Code already used." };
  
  await envelopeCodesCollection.updateOne({ code }, { $set: { redeemed: true } });
  
  const time = new Date().toISOString();
  
  await envelopeWinnersCollection.insertOne({ code, time });
  
  return { success: true, message: "Envelope code accepted.", time };
};

const getWinners = async () => {
  const winners = await envelopeWinnersCollection
    .find({})
    .sort({ time: -1 })
    .limit(20)
    .toArray();
  return winners;
};

module.exports = { checkEnvelopeCode, getWinners };