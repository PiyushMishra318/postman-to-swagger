import postmanToSwagger from "postman-2-swagger";

import fs from "fs";
const postman = fs.readFileSync("./postman.json").toString();

const convertAndSave = (postmanJson) => {
  // This returns the actual swagger v2.0 spec as a json
  const swaggerJson = postmanToSwagger(postmanJson);

  // Example if you want to save it somewhere
  fs.writeFileSync(
    "./swagger.json",
    JSON.stringify(swaggerJson, null, 2),
    "utf8"
  );
};

convertAndSave(JSON.parse(postman));
