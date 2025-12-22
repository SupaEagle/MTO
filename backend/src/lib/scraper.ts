import * as cheerio from 'cheerio';


export async function scrapeWebsiteText(url: string): Promise<string> {
    // 1. Basic Validation
    if (!url) return "";
    let targetUrl = url.startsWith('http') ? url : `https://${url}`;

    try {
        console.log(`🕷️ Scraping context from: ${targetUrl}`);

        // 2. Fetch HTML
        const response = await fetch(targetUrl, {
            headers: { 'User-Agent': 'MansaTina-Bot/1.0' } // Be polite
        });

        if (!response.ok) throw new Error("Site unreachable");

        const html = await response.text();
        const $ = cheerio.load(html);

        // 3. Clean the noise (Scripts, Styles, Navs)
        $('script, style, nav, footer, svg, button').remove();

        // 4. Extract meaningful text (Limit to ~3000 chars to save AI tokens)
        const text = $('body').text()
            .replace(/\s+/g, ' ') // Remove extra whitespace
            .trim()
            .slice(0, 3000);

        return text;

    } catch (error) {
        console.warn(`⚠️ Scraping failed for ${url}. Proceeding with user input only.`);
        return "Website content unavailable. Rely solely on user answers.";
    }
}
