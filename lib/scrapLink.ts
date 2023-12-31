const puppeteer = require("puppeteer");

type opt = {
  id: string;
  language?: number;
  season?: number;
  episode?: number;
};
export const scrapLink = async (opt: opt) => {
  let streamhls = "";
  let abort = true;
  const browser = await puppeteer.launch({
    headless: true, // Set this to false to run in non-headless mode
  });

  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({ Referer: "https://google.com" });

  await page.goto(`https://esh-bostewsom-i-273.site/play/${opt.id}`);
  // Enable the request interception
  await page.setRequestInterception(true);

  // Intercept requests
  page.on("request", (request: any) => {
    // Continue with the request
    if (abort) {
      request.abort();
    } else {
      const url = request.url();
      if (url.includes(".m3u8")) {
        // console.log(url);
        streamhls = url;
      }
      request.continue();
    }
  });
  await page.waitForSelector(`[class^="pjsplplayer"][class$="scroll"]`);
  abort = false;
  await page.evaluate((opt: opt) => {
    // select language
    if (opt.language) {
      const lang = document.querySelectorAll(
        `[class^="pjsplplayer"][class$="scroll"]`
      )[0].children[opt.language - 1] as HTMLElement;
      lang.click();
    }
    // select season
    if (opt.season) {
      const season = document.querySelectorAll(
        `[class^="pjsplplayer"][class$="scroll"]`
      )[2].children[opt.season - 1] as HTMLElement;
      season.click();
    }
    // select episode
    if (opt.episode) {
      const episode = document.querySelectorAll(
        `[class^="pjsplplayer"][class$="scroll"]`
      )[1].children[opt.episode - 1] as HTMLElement;
      episode.click();
    }
  }, opt);

  // Log responses
  //   page.on("response", (response) => {
  //     const url = response.url();
  //     if (url.includes(".m3u8")) {
  //       streamhls = url;
  //       //   console.log(url);
  //     }
  //   });
  await browser.close();
  return {
    StreamLink: streamhls,
  };
};
