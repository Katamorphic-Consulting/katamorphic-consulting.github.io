export default function handler(req, res) {
  res.status(200).json({
    jsonbinSecretKey: process.env.JSONBIN_SECRET_KEY,
    jsonbinBinId: process.env.JSONBIN_BIN_ID,
  });
}
