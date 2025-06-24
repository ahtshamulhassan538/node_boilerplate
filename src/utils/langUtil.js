const fs = require("fs");
const path = require("path");

class LangUtil {
    static messages = {}; // Store loaded messages

    static loadMessages(language = "en") {
      try {
        const filePath = path.join(__dirname, "../lang", language, "messages.json");
        LangUtil.messages[language] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } catch (error) {
        console.error(`⚠️ Language file not found for '${language}', falling back to English.`);
        const fallbackPath = path.join(__dirname, "lang", "en", "messages.json");
        LangUtil.messages[language] = JSON.parse(fs.readFileSync(fallbackPath, "utf-8"));
      }
    }
  
    static getMessage(language, key) {
      if (!LangUtil.messages[language]) {
        LangUtil.loadMessages(language); // Load messages if not already loaded
      }
      return key.split(".").reduce((obj, part) => obj?.[part], LangUtil.messages[language]) || key;
    }
}

module.exports = LangUtil;
