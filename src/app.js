require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
var download = require("download-file");
var shell = require("shelljs");
const token = process.env.TOKEN;
// Created instance of TelegramBot
const bot = new TelegramBot(token, {
  polling: true,
});

// In-memory storage
const URLs = [];
const URLLabels = [];
let tempSiteURL = "";

console.log("helo");
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  console.log(resp);

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.on("document", (msg, match) => {
  bot.getFile(msg.document.file_id).then((resp) => {
    console.log(resp.file_path);
    console.log(
      "<-------------------------------------------------------------->"
    );
    console.log(msg);
    console.log(
      "<-------------------------------------------------------------->"
    );

    const filePath = resp.file_path;
    const downloadURL = `https://api.telegram.org/file/bot${process.env.TOKEN}/${filePath}`;
    console.log(downloadURL);
    var options = {
      directory: `./pdf/${msg.from.username}/`,
      //filename: `${msg.from.id}-${msg.from.username}-${msg.message_id}.pdf`,
      filename: `${msg.message_id}.pdf`,
    };
    //const filename = `${msg.from.id}-${msg.from.username}-${msg.message_id}.pdf`;
    const filn = options.filename;
    console.log(filn);
    download(downloadURL, options, function err() {
      //if (err) throw err;
      shell.exec(`lp ${options.directory}/${filn}`);
      console.log("meow");
    });
    // download the file (in this case it's an image)

    bot.sendMessage(msg.chat.id, msg.message_id);
  });
});
