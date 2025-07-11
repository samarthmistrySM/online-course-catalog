import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Course Catalog",
    description: "Course Catalog",
  },
  host: "localhost:8080/api/v1",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Enter your bearer token in the format **Bearer &lt;token&gt;**",
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"];

swaggerAutogen()(outputFile, routes, doc);
