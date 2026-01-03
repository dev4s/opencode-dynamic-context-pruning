/**
 * Token estimation module - uses character-based heuristics for fast token counting.
 *
 * This module provides approximate token counts (~85-95% accuracy) using a simple
 * character-to-token ratio. This is sufficient for statistics display where counts
 * are shown with a "~" prefix indicating approximation.
 *
 * Using estimation instead of actual tokenization eliminates the 5-15 second
 * startup delay that tokenizer libraries like gpt-tokenizer require.
 */

/**
 * Estimates token count for text using character-based heuristic.
 * Returns an array of the estimated length (for API compatibility).
 *
 * Uses ~3.5 chars per token which is more conservative than the common /4 estimate,
 * accounting for code, mixed content, and non-English text better.
 */
export function encodeText(text: string): number[] {
    const estimatedLength = Math.ceil(text.length / 3.5)
    return new Array(estimatedLength)
}
