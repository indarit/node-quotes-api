const express = require("express");
const app = express();
const quotes = require("./quotes.json");
app.use(express.json());
app.get("/heartbeat", (request, response) => {
  response.status(200).send("OK");
});
app.get("/quotes", (request, response) => {
  response.status(200).json(quotes);
});
app.get("/quotes/:quote_id", (request, response) => {
  const quoteId = request.params.quote_id;
  const result = quotes.find((q) => q.id == quoteId);
  if (result) {
    response.status(200).json(result);
  } else {
    response.status(404).send("Not Found");
  }
});
app.post("/quotes", (request, response) => {
  const newQuoteId = quotes.length > 0 ? quotes[quotes.length - 1].id : 0;
  const newQuote = {
    id: newQuoteId,
    ...request.body,
  };
  quotes.push(newQuote);
  response.status(201).json(newQuote);
});
app.put("/quotes/:quote_id", (request, response) => {
  const quoteId = request.params.quote_id;
  const quoteIdx = quotes.findIndex((q) => q.id == quoteId);
  if (quoteIdx > -1) {
    quotes[quoteIdx] = {
      id: quoteId,
      ...request.body,
    };
    response.status(200).json(quotes[quoteIdx]);
  } else {
    response.status(404).send("Not Found");
  }
});
app.delete("/quotes/:quote_id", (request, response) => {
  const quoteId = request.params.quote_id;
  const quoteIdx = quotes.findIndex((q) => q.id == quoteId);
  if (quoteIdx > -1) {
    quotes.splice(quoteIdx, 1);
    response.status(200).json(quotes);
  } else {
    response.status(404).send("Not Found");
  }
});
app.listen(3000, () => console.log("Listening on port 3000"));
