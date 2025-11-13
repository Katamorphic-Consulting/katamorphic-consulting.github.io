export default function handler(req, res) {
  res.status(200).json({
    jsonbinSecretKey: process.env.JSONBIN_SECRET_KEY,
    jsonbinCollectionId: process.env.JSONBIN_COLLECTION_ID,
  });
}
