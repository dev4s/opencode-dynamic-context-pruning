/**
 * Lazy tokenizer module - loads gpt-tokenizer in background to avoid blocking startup.
 *
 * The gpt-tokenizer package takes 5-15 seconds to initialize due to loading
 * large vocabulary files. This module defers that load to happen asynchronously
 * after plugin initialization, keeping startup instant.
 */

type EncodeFn = (text: string) => number[]

let encodeFn: EncodeFn | null = null
let loadPromise: Promise<void> | null = null

/**
 * Starts loading the tokenizer in the background.
 * Call this at plugin startup - it returns immediately and loads async.
 */
export function preloadTokenizer(): void {
    if (loadPromise) return

    loadPromise = import("gpt-tokenizer")
        .then(({ encode }) => {
            encodeFn = encode
        })
        .catch(() => {
            // Silently fail - fallback estimation will be used
        })
}

/**
 * Encodes text to tokens. Returns immediately with either:
 * - Accurate token array (if tokenizer loaded)
 * - Estimated token array based on char/4 heuristic (if still loading)
 */
export function encodeText(text: string): number[] {
    if (encodeFn) {
        return encodeFn(text)
    }
    // Fallback: ~4 chars per token (reasonable estimate for English text)
    const estimatedLength = Math.ceil(text.length / 4)
    return new Array(estimatedLength)
}

/**
 * Returns whether the tokenizer has finished loading.
 * Useful for logging/debugging.
 */
export function isTokenizerReady(): boolean {
    return encodeFn !== null
}
