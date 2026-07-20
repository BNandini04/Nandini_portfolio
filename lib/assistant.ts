import kb from "@/data/knowledge-base.json";

export type KbEntry = {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
};

const STOPWORDS = new Set([
  "what", "who", "is", "the", "a", "an", "does", "do", "her", "she", "his", "he",
  "and", "of", "to", "in", "on", "for", "with", "about", "tell", "me", "can",
  "you", "how", "are", "was", "were", "it", "this", "that", "please", "hi",
  "hello", "hey", "there", "their", "they",
]);

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s.]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Word-boundary match, so "she" doesn't hit inside "pushes". */
function hasKeyword(haystack: string, keyword: string): boolean {
  return new RegExp(`\\b${escapeRegex(keyword)}\\b`).test(haystack);
}

/**
 * Scores each knowledge-base entry against the query by keyword overlap.
 * Deliberately simple and fully local — no network call, no model, no key.
 *
 * Longer and multi-word keywords score higher than short ones, so a specific
 * term ("resumetailor") outranks a generic one ("about") when both match.
 */
export function answerQuestion(query: string): string {
  const normalized = query.toLowerCase();
  const tokens = tokenize(query);

  if (!tokens.length) return kb.fallback;

  let best: { entry: KbEntry; score: number } | null = null;

  for (const entry of kb.entries as KbEntry[]) {
    let score = 0;

    for (const keyword of entry.keywords) {
      if (hasKeyword(normalized, keyword)) {
        // Specificity weighting: multi-word phrases > long words > short words.
        if (keyword.includes(" ")) score += 6;
        else if (keyword.length >= 8) score += 5;
        else if (keyword.length >= 5) score += 3;
        else score += 2;
      } else if (tokens.some((t) => t.length >= 5 && keyword.startsWith(t))) {
        // Prefix hit covers plurals and truncations ("product" -> "products").
        score += 1;
      }
    }

    if (!best || score > best.score) best = { entry, score };
  }

  return best && best.score >= 3 ? best.entry.answer : kb.fallback;
}

export const suggestions: string[] = kb.suggestions;
