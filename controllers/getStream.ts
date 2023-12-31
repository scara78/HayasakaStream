import { Request, Response } from "express";
import { scrapLink } from "../lib/scrapLink";

export default async function getStream(req: Request, res: Response) {
  const { id, lang, season, episode } = req.query;
  if (!id) {
    return res.json({
      success: false,
      message: "Please provide a valid id",
    });
  }
  try {
    const info = await scrapLink({
      id: id as string,
      language: parseInt(lang as string),
      season: parseInt(season as string),
      episode: parseInt(episode as string),
    });
    res.json({
      success: true,
      data: info,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
