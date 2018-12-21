const { merge } = require("lodash/fp");
const url = require("url");
const { glob } = require("glob");
const { routes } = require("./now.json");
const http = require("http");
const qs = require("querystring");
const port = 8000;

const lambdas = {};
glob("src/api/**/*.js", null, (er, files) => {
  files.forEach(file => {
    let name = file
      .split(".")
      .slice(0, -1)
      .join(".");

    console.log("> File load: ", name);
    lambdas[name] = require(`./` + name);
  });

  console.log(`> Loaded ${Object.keys(lambdas).length} lambdas!\n\n`);
  runServer();
});

function runServer() {
  const server = http.createServer(async (req, res) => {
    const { pathname, href, query } = url.parse(req.url);
    const params = qs.parse(query);
    const route = routes.find(route => {
      const method = route.methods || ["GET"];
      if (!method.includes(req.method)) return false;
      return pathname.match(route.src);
    });

    if (!route) return notFound(res);

    const [path] = route.dest.split(".");
    const rex = new RegExp(route.src.replace(/\//gim, "\\/"), "gmi");
    const { groups } = rex.exec(pathname) || {};

    const q = merge(params, groups);
    req.url = `${href.split("?")[0]}?${qs.stringify(q)}`;

    const fn = lambdas[path];
    console.log("Lambda to invoke: ", path);

    if (!fn) return notFound(res);
    await fn(req, res);
  });

  server.listen(port, () => console.log(`> Running at port ${port}`));
}

function notFound(res) {
  res.writeHead(200);
  res.end("Not found");
}
