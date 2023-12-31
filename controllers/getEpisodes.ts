import { Request, Response } from "express";
import { getTotalEp } from "../lib/getTotalEp";

export default async function getEpisodes(req: Request, res: Response) {
  const { id, lang, season } = req.query;
  if (!id) {
    return res.json({
      success: false,
      message: "Please provide a valid id",
    });
  }
  if (!season) {
    return res.json({
      success: false,
      message: "Please provide a valid season",
    });
  }
  try {
    const info = await getTotalEp({
      id: id as string,
      language: parseInt(lang as string),
      season: parseInt(season as string),
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
