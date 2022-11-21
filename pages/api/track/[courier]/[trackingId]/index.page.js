const cheerio = require("cheerio");
const playwright = require("playwright-aws-lambda");

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36";

async function createPage(context, url) {
  //Randomize User agent or Set a valid one
  context.setDefaultNavigationTimeout(0);
  await context.route("**/*", (route) => {
    return ["image", "font"].includes(route.request().resourceType())
      ? route.abort()
      : route.continue();
  });

  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => false,
    });
  });

  await context.addInitScript(() => {
    // Pass chrome check
    window.chrome = {
      runtime: {},
      // etc.
    };
  });

  await context.addInitScript(() => {
    //Pass notifications check
    const originalQuery = window.navigator.permissions.query;
    return (window.navigator.permissions.query = (parameters) =>
      parameters.name === "notifications"
        ? Promise.resolve({ state: Notification.permission })
        : originalQuery(parameters));
  });

  await context.addInitScript(() => {
    // Overwrite the `plugins` property to use a custom getter.
    Object.defineProperty(navigator, "plugins", {
      // This just needs to have `length > 0` for the current test,
      // but we could mock the plugins too if necessary.
      get: () => [1, 2, 3, 4, 5],
    });
  });

  await context.addInitScript(() => {
    // Overwrite the `languages` property to use a custom getter.
    Object.defineProperty(navigator, "languages", {
      get: () => ["en-US", "en"],
    });
  });

  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 0 });
  return page;
}

const handler = async (req, res) => {
  let browser = null;

  const { trackingId, courier } = req.query;

  try {
    const browser = await playwright.launchChromium({ headless: false });
    const context = await browser.newContext({
      userAgent: USER_AGENT,
      javaScriptEnabled: true,
      viewport: {
        width: 1920 + Math.floor(Math.random() * 100),
        height: 3000 + Math.floor(Math.random() * 100),
        deviceScaleFactor: 1,
        hasTouch: false,
        isLandscape: false,
        isMobile: false,
      },
    });


    console.log(`https://www.aftership.com/track/${courier}/${trackingId}`, courier, trackingId)

    let page = await createPage(
      context,
      `https://www.aftership.com/track/${courier}/${trackingId}`
    );

    const jsHandle = await page.evaluateHandle(() => {
      const elements = document
        .querySelector("main #tracking")
        .shadowRoot.querySelector("#shipment-result-card");
      return elements;
    });

    const data = await page.evaluate((els) => els.innerHTML, jsHandle);

    const $ = cheerio.load(data);

    const output = [];

    $("#checkpoints-container").each((index, el) => {
      $(el)
        .find(".checkpoint__detail")
        .each((upparIndex, el) => {
          $(el)
            .children()
            .each((index, el) => {
              if (index === 0) {
                output[upparIndex] = [$(el).text()];
              } else if (index === 1) {
                const [first, second, third] = el.children;
                output[upparIndex] = [
                  ...output[upparIndex],
                  $(first).text(),
                  $(third).text(),
                ];
              }
            });
        });
    });

    let finalOutput = output.reduce((acc, current) => {
      const [detail, date, location] = current;
      return [
        ...acc,
        {
          location: location,
          detail: detail,
          date: date,
        },
      ];
    }, []);

    return !finalOutput.length
      ? res.status(200).json({
          status: "failed",
          message: `No Results found for ${trackingId}`,
        })
      : res.status(200).json({ data: finalOutput, status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: JSON.stringify(error),
      status: "failed",
      message: "Something went wrong",
    });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

export default handler;
