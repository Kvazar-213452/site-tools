import Config from "@/lib/config";

const CONVERTERS = [
  "/",
  "/blog/ai-tools-for-students",
  "/blog/ai-tools-for-tiktok",
  "/blog/ai-tools-for-youtube",
  "/blog/how-to-write-youtube-titles",
  "/blog/social-media-tools-free",
  "/tools/case-converter",
  "/tools/word-counter",
  "/tools/json-formatter",
  "/tools/url-encoder",
  "/tools/url-decode",
  "/tools/url-decode-online",
  "/tools/url-encoder-online",
  "/tools/generator/random-country-generator",
  "/tools/generator/random-fact-generator",
  "/tools/generator/random-number-generator",
  "/tools/generator/random-question-generator",
  "/tools/generator/startup-idea-generator",
  "/tools/generator/name/aesthetic-minecraft-names",
  "/tools/generator/name/business-name-generator",
  "/tools/generator/name/cool-minecraft-names",
  "/tools/generator/name/cool-usernames-for-gamers",
  "/tools/generator/name/funny-usernames-for-tiktok",
  "/tools/generator/name/minecraft-clan-names",
  "/tools/generator/name/minecraft-names-for-boys",
  "/tools/generator/name/nickname-generator",
  "/terms-of-service",
  "/privacy-policy",
  "/contacts",
];

export default function sitemap() {
  const urls = [{ url: Config.MAIN_DOMAIN_NO, priority: 1 }];
  
  CONVERTERS.forEach((path) => {
    urls.push({ url: `${Config.MAIN_DOMAIN_NO}${path}`, priority: 0.8 });
  });

  return urls;
}