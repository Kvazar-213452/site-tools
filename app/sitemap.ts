import Config from "@/lib/config";

const CONVERTERS = [
  "/"
];

export default function sitemap() {
  const urls = [{ url: Config.MAIN_DOMAIN_NO, priority: 1 }];
  
  CONVERTERS.forEach((path) => {
    urls.push({ url: `${Config.MAIN_DOMAIN_NO}${path}`, priority: 0.8 });
  });

  return urls;
}