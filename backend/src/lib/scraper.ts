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

        // 3a. Extract Potential Brand Colors (Hex Codes)
        const hexRegex = /#([A-Fa-f0-9]{6})\b/g;
        const allMatches = html.match(hexRegex) || [];
        // Count frequency to find dominant colors
        const colorCounts: Record<string, number> = {};
        allMatches.forEach(c => {
            const upper = c.toUpperCase();
            if (upper !== '#FFFFFF' && upper !== '#000000') { // Ignore pure black/white
                colorCounts[upper] = (colorCounts[upper] || 0) + 1;
            }
        });
        const topColors = Object.entries(colorCounts)
            .sort((a, b) => b[1] - a[1]) // Sort by frequency
            .slice(0, 10) // Take top 10
            .map(([color]) => color)
            .join(', ');

        // 3b. Extract Fonts (Google Fonts or font-family)
        const fontRegex = /font-family:\s*([^;]+)/g;
        const fontMatches = html.match(fontRegex) || [];
        const googleFontRegex = /family=([^&"']+)/g;
        const googleFontMatches = html.match(googleFontRegex) || [];

        const allFonts = new Set<string>();

        // Process Google Fonts
        googleFontMatches.forEach(m => {
            const family = m.split('=')[1]?.replace(/\+/g, ' ').split(':')[0];
            if (family) allFonts.add(family);
        });

        // Process CSS fonts
        fontMatches.forEach(m => {
            const raw = m.split(':')[1]?.trim().replace(/['"]/g, '');
            if (raw) {
                const primary = raw.split(',')[0].trim(); // Take the first font in the stack
                if (primary && !['inherit', 'initial', 'unset'].includes(primary)) {
                    allFonts.add(primary);
                }
            }
        });

        const detectedFonts = Array.from(allFonts).slice(0, 5).join(', ');

        // 3c. Clean the noise (Scripts, Styles) - KEEP Nav/Footer as they often have address/socials
        $('script, style, svg, button').remove();

        // 4. Extract meaningful text (Limit to ~15000 chars to Give AI full context)
        const text = $('body').text()
            .replace(/\s+/g, ' ') // Remove extra whitespace
            .trim()
            .slice(0, 15000);

        return `DETECTED_COLORS: [${topColors}]\nDETECTED_FONTS: [${detectedFonts}]\n\nWEB_CONTENT:\n${text}`;

    } catch (error) {
        console.warn(`⚠️ Scraping failed for ${url}. Proceeding with user input only.`);
        return "Website content unavailable. Rely solely on user answers.";
    }
}
