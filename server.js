import express from "express";
import { Configuration, OpenAIApi } from "azure-openai";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env;

const openai = new OpenAIApi(
  new Configuration({
    azure: {
      apiKey: env.AZURE_OPENAI_API_KEY,
      endpoint: env.AZURE_OPENAI_ENDPOINT,
      deploymentName: env.AZURE_OPENAI_MODEL,
    },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

//index.html
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.post("/response", async (req, res) => {
  const _term = req.body.message;

  messages: [
    {
      role: "system",
      content:
        "You are an expert in the field of IT Support. You have extensive knowledge of Microsoft products dating back to Windows 3.1. You have vast knowledge of networking, devices, software and know how to troubleshoot technology problems.",
    },
    { role: "user", content: _term },
  ];

  const response = await openai.createChatCompletion({
    model: env.AZURE_OPENAI_MODEL,
    messages: [{ role: "user", content: _term }],
  });

  res.send(response.data);
});

app.listen(8080, () => {
  console.log("Application listening on port 8080!");
});

export default app;
