import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface ShopArticle {
  html: string;
  title?: string;
  visitedAt?: string;
  author?: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function loadShopArticle(slug: string): Promise<ShopArticle | null> {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  return {
    html: String(processed),
    title: typeof data.title === "string" ? data.title : undefined,
    visitedAt: typeof data.visitedAt === "string" ? data.visitedAt : undefined,
    author: typeof data.author === "string" ? data.author : undefined,
  };
}
