type Tool = {
    slug: string;
    name: string;
    desc: string;
    cat: string;
    icon: string;
};

export default class Config {
    static MAIN_DOMAIN_NO: string = "https://besttoolsfree.com";
    static NAME_MAKE: string = "Best tools free";
    static MAIN_DOMEN: string = "https://besttoolsfree.com/";
    static SITE_NAME: string = "Besttoolsfree";
    static GMAIL: string = "alret213452@gmail.com";




    static TOOLS: Tool[] = [
        { slug: "/tools/case-converter", name: "Case Converter", desc: "Convert text to uppercase, lowercase, title case, and more instantly.", cat: "Text", icon: "Aa" },

        { slug: "/tools/word-counter", name: "Word Counter", desc: "Count words, characters, and sentences in real time for writing and SEO.", cat: "Text", icon: "✎" },

        { slug: "/tools/json-formatter", name: "JSON Formatter", desc: "Format, validate, and beautify JSON data for better readability.", cat: "Developer", icon: "{}" },

        { slug: "/tools/url-encoder", name: "URL Encoder", desc: "Encode URLs into a safe format for web usage using percent-encoding.", cat: "Developer", icon: "🔗" },

        { slug: "/tools/url-decode", name: "URL Decoder", desc: "Decode encoded URLs back into readable format instantly.", cat: "Developer", icon: "↺" },

        { slug: "/tools/url-decode-online", name: "URL Decode Online", desc: "Free online URL decoding tool with instant results.", cat: "Developer", icon: "🌐" },

        { slug: "/tools/url-encoder-online", name: "URL Encode Online", desc: "Encode text and URLs online quickly and securely.", cat: "Developer", icon: "🌍" },

        { slug: "/tools/generator/random-country-generator", name: "Random Country Generator", desc: "Generate random countries for games, quizzes, or geography learning.", cat: "Generator", icon: "🌎" },

        { slug: "/tools/generator/hash-generator", name: "Hash Generator", desc: "Generate MD5, SHA-1, SHA-256 hashes for security and data integrity.", cat: "Security", icon: "#" },

        { slug: "/tools/generator/uuid-generator", name: "UUID Generator", desc: "Generate unique UUID v4 identifiers instantly.", cat: "Developer", icon: "🆔" },

        { slug: "/tools/generator/password-generator", name: "Password Generator", desc: "Create strong, secure passwords with custom length and rules.", cat: "Security", icon: "🔒" },

        { slug: "/tools/generator/lorem-ipsum-generator", name: "Lorem Ipsum Generator", desc: "Generate placeholder text for design and testing purposes.", cat: "Generator", icon: "¶" },

        { slug: "/tools/generator/random-fact-generator", name: "Random Fact Generator", desc: "Get interesting and fun random facts instantly.", cat: "Fun", icon: "💡" },

        { slug: "/tools/generator/random-number-generator", name: "Random Number Generator", desc: "Generate random numbers within a custom range.", cat: "Utility", icon: "🔢" },

        { slug: "/tools/generator/random-question-generator", name: "Random Question Generator", desc: "Generate questions for conversations, games, and icebreakers.", cat: "Fun", icon: "❓" },

        { slug: "/tools/generator/startup-idea-generator", name: "Startup Idea Generator", desc: "Generate creative startup and business ideas instantly.", cat: "Business", icon: "🚀" },

        { slug: "/tools/generator/name/nickname-generator", name: "Nickname Generator", desc: "Generate cool and unique nicknames for games and social media.", cat: "Generator", icon: "🎮" },
    ];
}