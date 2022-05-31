import { createServer } from "./server";
import { log } from "logger";

const port = process.env.PORT || 5011;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});
