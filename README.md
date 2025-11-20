# Dynamic Context Pruning Plugin

[![npm version](https://img.shields.io/npm/v/@tarquinen/opencode-dcp.svg)](https://www.npmjs.com/package/@tarquinen/opencode-dcp)

Automatically reduces token usage in OpenCode by removing obsolete tool outputs from conversation history.

## What It Does

When your OpenCode session becomes idle, this plugin analyzes your conversation and identifies tool outputs that are no longer relevant (superseded file reads, old errors that were fixed, exploratory searches, etc.). These obsolete outputs are pruned from future requests to save tokens and reduce costs.

## Installation

Add to your OpenCode configuration:

**Global:** `~/.config/opencode/opencode.json`  
**Project:** `.opencode/opencode.json`

```json
{
  "plugin": [
    "@tarquinen/opencode-dcp"
  ]
}
```

Restart OpenCode. The plugin will automatically start optimizing your sessions.

## Debug Logging

Enable debug logging by setting the `OPENCODE_DCP_DEBUG` environment variable:

```bash
# For one session
OPENCODE_DCP_DEBUG=1 opencode

# For all sessions
export OPENCODE_DCP_DEBUG=1
opencode
```

Logs are written to `~/.config/opencode/logs/dcp/YYYY-MM-DD.log`.

Watch logs in real-time:

```bash
tail -f ~/.config/opencode/logs/dcp/$(date +%Y-%m-%d).log
```

## License

MIT
