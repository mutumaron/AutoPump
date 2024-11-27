const express = require("express");
const bodyParser = require("body-parser");
const { SerialPort, ReadlineParser } = require("serialport");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const arduinoPort = new SerialPort({
  path: "/dev/ttyACM0", // Replace "COM3" with the correct port for your system (Linux example: "/dev/ttyACM0")
  baudRate: 9600,
});
const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\n" }));

app.use(bodyParser.json());
app.use(express.static("public"));

//;Log arduuino output

parser.on("data", (line) => {
  console.log(`Arduino ${line}`);
});

//API route to control the LED

app.post("/control", (req, res) => {
  const command = req.body.command;
  if (command === "RLED_ON" || command === "RLED_OFF") {
    arduinoPort.write(`${command}\n`, (err) => {
      if (err) {
        console.error("Error sending command:", err);
        return res.status(500).send("Failed to send command");
      }
      res.send(`Command "${command}" sent to Arduino`);
    });
  } else if (command === "GLED_ON" || command === "GLED_OFF") {
    arduinoPort.write(`${command}\n`, (err) => {
      if (err) {
        console.error("Error sending command:", err);
        return res.status(500).send("Failed to send command");
      }
      res.send(`Command "${command}" sent to Arduino`);
    });
  } else if (command === "YLED_ON" || command === "YLED_OFF") {
    arduinoPort.write(`${command}\n`, (err) => {
      if (err) {
        console.error("Error sending command:", err);
        return res.status(500).send("Failed to send command");
      }
      res.send(`Command "${command}" sent to Arduino`);
    });
  } else if (command === "OLED_ON" || command === "OLED_OFF") {
    arduinoPort.write(`${command}\n`, (err) => {
      if (err) {
        console.error("Error sending command:", err);
        return res.status(500).send("Failed to send command");
      }
      res.send(`Command "${command}" sent to Arduino`);
    });
  } else {
    res.status(400).send("Invalid command");
  }
});

//start the web server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
