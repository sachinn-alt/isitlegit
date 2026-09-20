<div align="center">

# IsItLegit 🛡️
### AI-Powered Scam, Phishing & Network Loophole Intelligence Engine

[![Live Application](https://img.shields.io/badge/Live%20App-sachinn--alt.github.io%2Fisitlegit-1040C0?style=for-the-badge&logo=githubpages&logoColor=white)](https://sachinn-alt.github.io/isitlegit/)
[![Loophole Defense](https://img.shields.io/badge/RFC%203986-Loophole%20Defender-D02020?style=for-the-badge&logo=shield&logoColor=white)](https://sachinn-alt.github.io/isitlegit/)
[![Zero Storage Guarantee](https://img.shields.io/badge/Zero%20Storage-100%25%20Ephemeral-F0C020?style=for-the-badge&labelColor=121212&logoColor=121212)](https://sachinn-alt.github.io/isitlegit/)
[![Test Suite](https://img.shields.io/badge/Tests-28%20Passed-121212?style=for-the-badge&logo=vitest&logoColor=white)](https://github.com/sachinn-alt/isitlegit)

<br/>

```
 █▀▀ █░█ █▀▀ █▀▀ █▄▀   █░░ █ █▄░█ █▄▀ █▀ 
 █▄▄ █▀█ ██▄ █▄▄ █░█   █▄▄ █ █░▀█ █░█ ▄█ 
   RFC 3986 ANTI-EVASION • ZERO STORAGE PRIVACY • ML PHISHING INFERENCE
```

<p align="center">
  <b>Inspect suspicious links, emails, and alerts without ever clicking them.</b><br/>
  Traps obscure network evasion exploits (DWORD decimal IPs, userinfo camouflage, multi-layer percent-encoding, invisible Unicode) and verifies genuine bank 2FA OTP codes — <i>100% client-side, zero storage, vanishes immediately after analysis.</i>
</p>

[**Explore Live Demo »**](https://sachinn-alt.github.io/isitlegit/) · [**Report Loophole »**](https://github.com/sachinn-alt/isitlegit/issues) · [**View Source »**](https://github.com/sachinn-alt/isitlegit)

</div>

---

## 🎨 Visual Identity & Bauhaus Constructivist Design

IsItLegit is built on a high-contrast **Bauhaus Constructivist Design System** featuring crisp geometric layouts, stark borders, and bold functional color-coding:

| Swatch | Color Name | Hex Code | Purpose in IsItLegit |
| :---: | :--- | :---: | :--- |
| <img src="https://via.placeholder.com/20/D02020/000000?text=+" width="20" height="20" /> | **Bauhaus Red** | `#D02020` | Critical threats, malicious network loopholes, phishing verdicts |
| <img src="https://via.placeholder.com/20/1040C0/000000?text=+" width="20" height="20" /> | **Bauhaus Blue** | `#1040C0` | Primary actions, verified authentic domains, algorithmic telemetry |
| <img src="https://via.placeholder.com/20/F0C020/000000?text=+" width="20" height="20" /> | **Bauhaus Yellow** | `#F0C020` | Warnings, suspicious anomalies, high-entropy token highlights |
| <img src="https://via.placeholder.com/20/121212/000000?text=+" width="20" height="20" /> | **Stark Ink** | `#121212` | Solid structure, 4px/6px hard-offset shadows, geometric borders |
| <img src="https://via.placeholder.com/20/F0F0F0/000000?text=+" width="20" height="20" /> | **Canvas Cream** | `#F0F0F0` | High-legibility tactile background with subtle constructivist dot grid |

---

## 🔒 100% Zero-Storage Ephemeral Privacy Guarantee

> [!IMPORTANT]
> **Your data vanishes the second your check completes.**  
> IsItLegit does **not** log, store, cache, or transmit your URLs, emails, SMS text, or scanned images to any remote database.

- **Zero Remote Telemetry**: No trackers, no analytics pixels, no server-side ingestion logs.
- **In-Memory Volatility**: Text, URLs, and QR frames are held strictly in browser RAM during computation and discarded immediately upon session completion.
- **Safe Sandboxing**: Inspected URLs are **never fetched directly or triggered in the background**, protecting you against drive-by malware execution, tracking cookies, and IP read-receipts.
- **Client-Side Cryptographic Keyring**: Any optional user-provided API keys (Gemini, VirusTotal) are protected with **AES-GCM 256-bit** encryption and PBKDF2 derivation (100,000 iterations) locally via the browser's native Web Crypto API.

---

## ⚙️ RFC 3986 Network Loophole Defender

Phishing attackers exploit standard networking specifications to trick browser address bars, spam filters, and human inspection. IsItLegit incorporates a dedicated **Algorithmic RFC 3986 Anti-Evasion Engine** (`src/engine/network-loophole-defender.ts`):

```mermaid
flowchart TD
    Raw[Raw Input URL / Text] --> Norm[RFC 3986 Normalizer]
    
    subgraph DeObfuscation["De-Cloaking & Anti-Evasion Layer"]
        Norm --> DecIP[DWORD / Hex / Octal IP De-Cloaker<br/>2130706433 ➔ 127.0.0.1<br/>0x7f000001 ➔ 127.0.0.1]
        Norm --> Userinfo[Userinfo '@' Credential Camouflage Trap<br/>paypal.com:auth@evil.xyz]
        Norm --> Unicode[Invisible Character & BiDi Override Scanner<br/>U+200B Zero-Width, U+202E RTL]
        Norm --> MultiPct[Recursive Multi-Layer Percent De-Encoder<br/>%252e%252e, %00 Null Byte, CRLF]
        Norm --> Trampoline[Open Redirect & Trampoline Deep Hunter<br/>q=, redirect_uri=, next=, dest=]
        Norm --> PortCloud[Non-Standard Ports & Disposable Cloud Scanners<br/>:8080, workers.dev, pages.dev, duckdns]
    end

    subgraph MatrixEngine["Algorithmic Verification Matrix"]
        DeObfuscation --> ML[Client-side Naive Bayes ML Inference]
        DeObfuscation --> Lev[Levenshtein Brand Proximity Distance d]
        DeObfuscation --> Ent[Shannon Entropy H Calculation]
        DeObfuscation --> Hom[Unicode Homoglyph / Punycode Matrix]
    end

    subgraph Consensus["Threat Verdict Consensus"]
        ML & Lev & Ent & Hom --> ResScore[Loophole Resistance Score %]
        ResScore --> FinalVerdict["VERDICT: SAFE • SUSPICIOUS • PHISHING<br/>+ Plain-English Human Action Steps"]
    end
```

### Supported Anti-Evasion Countermeasures

| Evasion Technique | Real-World Attack Sample | RFC / Vector | Algorithmic Trap |
| :--- | :--- | :---: | :--- |
| **DWORD Decimal IP Cloaking** | `http://3583560641/login` | RFC 3986 §3.2.2 | De-cloaks 32-bit integer arithmetic into resolved dot-decimal IP (`213.159.183.193`) |
| **Hexadecimal & Octal IPs** | `http://0xd5.0x9f.0xb7.0xc1` | POSIX / inet_addr | Normalizes mixed hex (`0x..`) and octal (`0177...`) base formats |
| **Userinfo Credential Camouflage** | `https://paypal.com:auth@evil.xyz/login` | RFC 3986 §3.2.1 | Strips misleading brand credentials preceding `@` and flags destination domain `evil.xyz` |
| **Recursive Percent-Encoding** | `http://legit.com%252e%252e@evil.com` | RFC 3986 §2.1 | Iteratively unpacks nested percent tokens (`%2525` ➔ `%25` ➔ `%`) and traps null bytes (`%00`) |
| **BiDi Override & Zero-Width Chars** | `google.com\u202Ecod.evil.com` | Unicode TR9 | Detects Right-To-Left overrides (`U+202E`) and zero-width spaces (`U+200B`, `U+FEFF`) |
| **Open Redirect / Trampolines** | `google.com/url?q=https://phish.ru` | CWE-601 | Recursively extracts target landing parameter and evaluates the nested terminal URL |
| **Disposable Cloud Subdomain Stacking** | `paypal-verify.workers.dev` | Multi-tenant DNS | Identifies abuse of serverless workers (`workers.dev`, `pages.dev`, `duckdns.org`, `ngrok-free.app`) |
| **Subdomain Viewport Truncation** | `chase.com.security.verify.account-update.tk` | Mobile UX Abuse | Flags $\ge 3$ stacked subdomains designed to push the real TLD off narrow smartphone screens |

---

## 🔬 Algorithmic Verification Matrix

Every scan displays a live **Algorithmic Matrix Telemetry Panel** detailing quantitative heuristics:

```
┌─────────────────────────── ALGORITHMIC VERIFICATION MATRIX ───────────────────────────┐
│                                                                                        │
│  [✓] RFC 3986 Loophole Trap   [✓] Levenshtein Distance    [✓] Shannon Entropy H       │
│      De-obfuscated: 0 Traps       Similarity: d = 1 (Spoof)   Entropy: 4.82 bits/char  │
│                                                                                        │
│  [✓] Punycode / Homoglyph      [✓] Naive Bayes ML Core     [✓] Loophole Resistance     │
│      Cyrillic: 0 Spoofs           Inference: 97.4% Phish      Resistance Score: 98.6%  │
│                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Shannon Entropy Calculation ($H$)**:
   $$\text{Entropy } H = -\sum_{i=1}^{n} P(c_i) \log_2 P(c_i)$$
   Measures cryptographic randomness in domains and tokens to catch DGA (Domain Generation Algorithms) and malicious hash parameters.
2. **Levenshtein Distance Metric ($d$)**:
   Computes edit distance against a curated dictionary of global financial, tech, and payment brands to instantly identify character substitutions (`micros0ft.com`, `paypa1.com`).
3. **Punycode & Cyrillic Homoglyph Matrix**:
   Detects confusable characters across mixed scripts (e.g. Cyrillic `а`, `е`, `о`, `р`, `с` mimicking Latin glyphs) under RFC 3492.
4. **Client-Side Naive Bayes Machine Learning Classifier**:
   Zero-dependency in-memory classifier trained on high-signal threat indicators, financial coercion phrasing, and malicious URL structural features.

---

## 🛡️ Legitimacy & Genuine 2FA Verifier

Unlike standard blocklists that only shout *"Dangerous!"*, IsItLegit solves panic caused by real security warnings. When you receive a real bank transaction alert or 2FA OTP code, IsItLegit:
- Identifies the official originating sender and authentic domain infrastructure.
- Explains **why the message was triggered** (e.g. new sign-in from another device, card transaction confirmation).
- Explicitly reminds the user **never to recite OTP codes to incoming callers**.

---

## 📷 Optical QR Scanner (In-Browser Computer Vision)

- **Real-Time Optical Decoding**: Powered by client-side `jsQR` running up to 30 fps directly in the browser.
- **Tactile Bauhaus HUD Reticle**: High-contrast geometric targeting overlay with corner markers and status readouts.
- **Pre-Navigation Interception**: Decodes QR payloads in memory so malicious URLs can be inspected and neutralized *before* any browser tab opens.

---

## 📱 Progressive Web App (PWA) with Web Share Target

IsItLegit operates as a full offline-capable PWA installable on iOS, Android, macOS, and Windows:
- **Share Directly From Messaging Apps**: Tap **Share** on any suspicious SMS or WhatsApp message and select **IsItLegit** to analyze it without copying and pasting.
- **Offline Reliability**: Service Workers cache security heuristics and the machine learning classifier for field operation without internet.

---

## 🤖 Model Context Protocol (MCP) Server

Connect IsItLegit directly to AI agents (Claude Desktop, Cursor, Antigravity) via the standard Model Context Protocol:

### Tools Exposed
- `check_url`: Evaluates URLs for network loopholes, homoglyphs, and brand spoofing.
- `check_message`: Scans messages for social engineering, urgency tactics, and financial scam signatures.
- `verify_authenticity`: Distinguishes genuine 2FA OTP security alerts from account takeover lures.

### Claude Desktop Configuration
Add this to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "isitlegit": {
      "command": "node",
      "args": ["<PATH_TO_ISITLEGIT>/mcp/server.js"]
    }
  }
}
```

---

## ⚡ Quick Start & Development

### Requirements
- [Node.js](https://nodejs.org/) v18+ (v20+ recommended)
- `npm`

### Local Setup
```bash
# 1. Clone repository
git clone https://github.com/sachinn-alt/isitlegit.git
cd isitlegit

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Test Suite & Verification

The test suite covers algorithmic de-cloaking, RFC compliance, ML inference, and privacy guarantees:

```bash
# Run all unit tests
npm test -- --run
```

```
 ✓ src/tests/scoring.test.ts (2 tests)
 ✓ src/tests/confidentiality.test.ts (3 tests)
 ✓ src/tests/email-analyzer.test.ts (3 tests)
 ✓ src/tests/network-loophole-defender.test.ts (11 tests)
 ✓ src/tests/ml-phishing-classifier.test.ts (4 tests)
 ✓ src/tests/url-analyzer.test.ts (5 tests)

 Test Files  6 passed (6)
      Tests  28 passed (28)
```

```bash
# Run production build
npm run build
```

---

## 👨‍💻 Author & Connect

Engineered by **Sachin**:

- **GitHub**: [@sachinn-alt](https://github.com/sachinn-alt)
- **LinkedIn**: [Sachin](https://www.linkedin.com/in/heyitsachin/)
- **Instagram**: [@sac._.hinn](https://www.instagram.com/sac._.hinn/)

---

## 📄 License

Distributed under the **MIT License**. Free for personal, educational, and open-source cybersecurity defense.
