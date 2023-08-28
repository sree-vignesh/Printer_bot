var shell = require("shelljs");
shell.cd("/home/vicky/Documents/Printer_bot/pdf/");
shell.exec("neofetch");
shell.exec(
  `lp /home/vicky/Documents/Printer_bot/pdf/1263253710-Zoro3swords-41.pdf`
);
