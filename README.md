# The Turing Dial: A Solstice Cryptography Protocol

I'm excited to share my submission for the DEV Community Challenge! **The Turing Dial** is a time-shifting puzzle game inspired by the transition of daylight during the June Solstice and the mathematical genius of Alan Turing.

## 🎮 Play the Game


## 💡 How It Works (The Theme Connection)
The game maps the physical passage of time during the Solstice to computational logic constraints. As the game clock cycles from day to night, your processing framework degrades across three environmental phases:
1. **Sunrise (Unary):** Pure binary processing.
2. **High Noon (Boolean):** Advanced algebraic logic gates (`AND`, `OR`, `NOT`).
3. **Midnight (Enigma):** Hard cryptographic bit-parity challenges that honor Turing's codebreaking at Bletchley Park.

## 🧠 Behind the Curtain: Best Google AI Usage
Instead of using the Gemini API as a simple chat box, **Gemini 2.5 Flash acts as our automated Procedural Level Designer**. 

Every time the environment transitions, the system fires a background request to Google AI Studio. Gemini dynamically parses the current game state and feeds back:
1. A unique, context-aware matrix puzzle directive (`puzzleHint`).
2. The dynamic numeric or parity solution ruleset (`solutionKey`).
3. A curated, inspiring quote reflecting Alan Turing's legacy, Juneteenth, or Pride Month (`historyQuote`).

If the network connection ever fails, a native hardware fallback loop steps in to ensure seamless offline gameplay.

## 🛠️ Built With
- Pure HTML5 / CSS Grid (with a custom CRT scanline terminal effect)
- Modular Vanilla JavaScript
- Official `@google/genai` SDK via CDN
