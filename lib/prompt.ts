export function buildAnalysisPrompt(unprunedToolCallIds: string[], messages: any[], protectedTools: string[]): string {
    const protectedToolsText = protectedTools.length > 0 
        ? `- NEVER prune the following protected tools: ${protectedTools.join(", ")}\n` 
        : '';
    
    return `You are a conversation analyzer that identifies obsolete tool outputs in a coding session.

Your task: Analyze the session history and identify tool call IDs whose outputs are NO LONGER RELEVANT to the current conversation context.

Guidelines for identifying obsolete tool calls:
1. Tool outputs that were superseded by newer reads of the same file/resource
2. Exploratory reads that didn't lead to actual edits or meaningful discussion AND were not explicitly requested to be retained
3. Tool calls from >10 turns ago that are no longer referenced and have served their purpose
4. Error outputs that were subsequently fixed
5. Tool calls whose information has been replaced by more recent operations

DO NOT prune:
${protectedToolsText}- Recent tool calls
- Tool calls that modified state (edits, writes, etc.)
- Tool calls whose outputs are actively being discussed
- Tool calls that produced errors still being debugged
- Tool calls where the user explicitly indicated they want to retain the information (e.g., "save this", "remember this", "keep this for later", "don't output anything else but save this")
- Tool calls that are the MOST RECENT activity in the conversation (these may be intended for future use)

IMPORTANT: Available tool call IDs for analysis (duplicates already removed): ${unprunedToolCallIds.join(", ")}

You may see additional tool call IDs in the session history below, but those have already been handled by automatic deduplication. ONLY return IDs from the available list above.

Session history:
${JSON.stringify(messages, null, 2)}

You MUST respond with valid JSON matching this exact schema:
{
  "pruned_tool_call_ids": ["id1", "id2", ...],
  "reasoning": "explanation of why these IDs were selected"
}

Return ONLY the tool call IDs from the available list above that should be pruned.`
}
