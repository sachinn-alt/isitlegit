# Agent Rule: Project Context & Memory Integration

Always consult [MEMORY.md](file:///c:/Users/DELL/.gemini/antigravity-ide/scratch/isitlegit/MEMORY.md) at the project root for comprehensive architectural details, core privacy invariants, scoring algorithms, and conventions.

## Key Directives:
1. **Zero-Knowledge Privacy**: Never transmit user inputs (URLs, texts, email headers) or credentials to external logging servers.
2. **Local Heuristics First**: Ensure offline heuristics in `src/engine/` operate without external API keys.
3. **Verification**: Always run `npm test` after modifying threat engine heuristics.
4. **Maintenance**: Update `MEMORY.md` when introducing new features, services, or architectural patterns.
