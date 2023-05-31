const crypto = require("crypto");

/**
 * @author "Khushbu Shah"
 */
const encript = async msg => {
  try {
    const iv = crypto.randomBytes(16);
    const pass = crypto.randomBytes(32);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(pass), iv);
    let encrypted = cipher.update(JSON.stringify(msg), "utf8", "hex");
    encrypted = encrypted + cipher.final("hex");
    return { encrypted, pass, iv };
  } catch (err) {
    console.error(err);
    return "";
  }
};

/**
 * @author "Khushbu Shah"
 */
const decript = async (msg, pass, iv) => {
  try {
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(pass),
      Buffer.from(iv)
    );
    let dec = decipher.update(msg, "hex", "utf8");
    return dec + decipher.final("utf8");
  } catch (err) {
    console.error(err);
    return "";
  }
};

module.exports = {
  encript,
  decript
};
