const { SitemapStream } = require("sitemap");
const { createWriteStream, existsSync, mkdirSync } = require("fs");

let routes = [
  { url: "/", changefreq: "daily", priority: 1 },
  { url: "/about", changefreq: "monthly", priority: 0.7 },
  { url: "/categories", changefreq: "monthly", priority: 0.7 },
  { url: "/productPage/:id", changefreq: "monthly", priority: 0.7 },
  { url: "/cart", changefreq: "monthly", priority: 0.7 },
  { url: "/auth/register", changefreq: "monthly", priority: 0.7 },
  { url: "/auth/login", changefreq: "monthly", priority: 0.7 },
  { url: "/faq", changefreq: "monthly", priority: 0.7 },
  { url: "/privacyPolicy", changefreq: "monthly", priority: 0.7 },
  { url: "/checkout", changefreq: "monthly", priority: 0.7 },
  { url: "/checkoutConfirmation", changefreq: "monthly", priority: 0.7 },
  { url: "/profile", changefreq: "monthly", priority: 0.7 },
  // add all other routes here
];

const sitemapStream = new SitemapStream({
  hostname: "https://staging2.fabrica-dev.com/e-gate/",
});

// Check if the public directory exists, if not create it
if (!existsSync("public")) {
  mkdirSync("public");
}

const writeStream = createWriteStream("./public/sitemap.xml");
sitemapStream.pipe(writeStream);

routes.forEach((route) => {
  sitemapStream.write(route);
});

sitemapStream.end();

// Listen for the finish event to know when writing is done
writeStream.on("finish", () => console.log("Sitemap created successfully!"));
