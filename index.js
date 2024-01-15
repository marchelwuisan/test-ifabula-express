const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3010;

app.use(bodyParser.json());

const validateHeader = (req, res, next) => {
  const userIdHeader = req.headers["user-id"];
  const scopeHeader = req.headers.scope;

  if (userIdHeader === "ifabula" && scopeHeader === "user") {
    next();
  } else {
    res.status(401).json({
      responseCode: 401,
      responseMessage: "UNAUTHORIZED",
    });
  }
};

app.get("/api/getData", validateHeader, (req, res) => {
  res.json({
    responseCode: 200,
    responseMessage: "Data retrieved successfully",
  });
});

app.post("/api/sendData", validateHeader, (req, res) => {
  const requestData = req.body;
  res.json({
    responseCode: 200,
    responseMessage: "Data sent successfully",
    data: requestData,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

