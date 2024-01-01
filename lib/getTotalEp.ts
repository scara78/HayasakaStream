import puppeteer from "puppeteer";
import cheerio from "cheerio";

export const getTotalEp = async (opt: {
  id: string;
  language?: number;
  season: number;
}) => {
  const browser = await puppeteer.launch({
    args:
      process.env.NODE_ENV === "production"
        ? [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--single-process",
            "--no-zygote",
          ]
        : [],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({ Referer: "https://google.com" });

  await page.goto(`${process.env.BASE_URL}/play/${opt.id}`);
  await page.waitForSelector(`.pjsplplayer-${opt.id}scroll`);
  await page.evaluate(
    (opt: { id: string; language?: number; season: number }) => {
      // select language
      if (!opt.language) {
        opt.language = 1;
      }
      const lang = document.getElementsByClassName(
        `pjsplplayer-${opt.id}scroll`
      )[0].children[opt.language - 1] as HTMLElement;
      lang?.click();
      // select season
      const season = document.getElementsByClassName(
        `pjsplplayer-${opt.id}scroll`
      )[2].children[opt.season - 1] as HTMLElement;
      season?.click();
    },
    opt
  );
  const html = await page.content();
  const $ = cheerio.load(html);
  const totalEpisodes = $(`.pjsplplayer-${opt.id}scroll`)[1].children.length;
  await browser.close();
  return {
    totalEpisodes,
  };
};
