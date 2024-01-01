import puppeteer from "puppeteer";
import cheerio from "cheerio";

export const getInfo = async (id: string) => {
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

  await page.goto(`${process.env.BASE_URL}/play/${id}`);
  await page.waitForSelector(`[class^="pjsplplayer"][class$="scroll"]`);
  const html = await page.content();
  const $ = cheerio.load(html);
  const languages: { id: number; name: string }[] = [];
  const totalSeasons = $(`[class^="pjsplplayer"][class$="scroll"]`)[2]?.children
    ?.length;
  const totalEpisodes = $(`[class^="pjsplplayer"][class$="scroll"]`)[1]
    ?.children?.length;
  const lang = $(`[class^="pjsplplayer"][class$="scroll"]`)[0]?.children as any;
  for (let i = 0; i < lang.length; i++) {
    languages.push({
      id: i + 1,
      name: lang?.[i]?.children?.[0]?.data,
    });
  }
  await browser.close();
  return {
    totalSeasons,
    totalEpisodesS1: totalEpisodes,
    languages,
  };
};
