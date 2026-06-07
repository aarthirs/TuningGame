// game.js
import { GoogleGenAI } from '@google/genai';

// const GEMINI_API_KEY = "AQ.Ab8RN6KelKk_7gWQR0LO_zw";
// const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Check browser local storage, otherwise pop up a prompt window asking for their key
let savedKey = localStorage.getItem("TURING_DIAL_KEY");

if (!savedKey || savedKey === "YOUR_GEMINI_API_KEY_PLACEHOLDER") {
    savedKey = prompt("Welcome to The Turing Dial!\n\nPlease enter your Google AI Studio API Key to interface with the Solstice Core engine:");
    if (savedKey) {
        localStorage.setItem("TURING_DIAL_KEY", savedKey);
    }
}

const GEMINI_API_KEY = savedKey || "FALLBACK_MODE";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const GameState = {
    timeOfDay: 11.00,
    activeMode: 'BOOLEAN',
    isProcessing: false,
    currentSolution: "1", // Target condition tracker (e.g., 1 node, 4 nodes, etc.)
    score: 0
};

// DOM Selections
const clockDisplay = document.getElementById('clock-display');
const logicDisplay = document.getElementById('logic-display');
const gridContainer = document.getElementById('grid');
const executeBtn = document.getElementById('btn-process');
const resetBtn = document.getElementById('btn-reset');
const terminalLog = document.getElementById('terminal-log');
const aiContextText = document.getElementById('ai-context-text');
const scoreDisplay = document.getElementById('score-display');

// Guide Pop-up Selectors
const helpBtn = document.getElementById('btn-help');
const closeGuideBtn = document.getElementById('btn-close-guide');
const guideModal = document.getElementById('guide-modal');

// Help Manual Toggle Events
helpBtn.addEventListener('click', () => guideModal.classList.add('open'));
closeGuideBtn.addEventListener('click', () => guideModal.classList.remove('open'));

async function fetchAIPuzzle(mode) {
    logToTerminal("[API]: Querying Gemini for fresh data matrices...");
    
    const prompt = `You are an automated backend engine for a game honoring Alan Turing and the June Solstice.
    The current active mode is: ${mode}.
    Provide a JSON object containing:
    1. "puzzleHint": A precise target assignment instruction (e.g., "Activate exactly 1 node to solve the matrix").
    2. "solutionKey": A string indicating exactly how many active nodes are required to pass (e.g., "1", "4", "EVEN").
    3. "historyQuote": A historical context quote or snippet about Alan Turing, Pride Month, or Juneteenth.
    Respond ONLY with raw JSON. No markdown fences.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        const cleanText = response.text.replace(/```json|```/g, "").trim();
        const data = JSON.parse(cleanText);
        
        aiContextText.textContent = data.historyQuote;
        logToTerminal(`[DECRYPT TARGET]: ${data.puzzleHint}`);
        GameState.currentSolution = data.solutionKey;

    } catch (error) {
        console.error(error);
        logToTerminal("[SYSTEM ERROR]: Handshake with Gemini timed out. Local fallback firmware active.");
        // Simulated structural fallback targets
        if (mode === 'BOOLEAN') {
            logToTerminal("[DECRYPT TARGET]: Activate exactly 1 node to form a singleton prime.");
            GameState.currentSolution = "1";
        } else {
            logToTerminal("[DECRYPT TARGET]: Activate an EVEN number of system nodes.");
            GameState.currentSolution = "EVEN";
        }
        aiContextText.textContent = '"We can only see a short distance ahead, but we can see plenty there that needs to be done." — Alan Turing';
    }
}

// Logic Compilation & Validation Parser
function executeSequence() {
    GameState.isProcessing = true;
    logToTerminal("___// COMMENCING SYSTEM MATRIX COMPILE...");
    executeBtn.disabled = true;
    
    // Scan all active elements currently selected on your grid UI
    const activeNodes = document.querySelectorAll('.tile.active');
    const totalActiveCount = activeNodes.length;

    setTimeout(() => {
        let isCorrect = false;
        const target = GameState.currentSolution.toUpperCase();

        // Perform dynamic verification validation conditions
        if (target === "EVEN") {
            isCorrect = (totalActiveCount > 0 && totalActiveCount % 2 === 0);
        } else if (target === "ODD") {
            isCorrect = (totalActiveCount % 2 !== 0);
        } else {
            // Check numeric target bounds directly (e.g. exactly "1" or "4")
            const expectedCount = parseInt(target, 10);
            isCorrect = (totalActiveCount === expectedCount);
        }

        // Print context matching logs inside your console terminal stream
        if (isCorrect) {
            logToTerminal(`[SUCCESS]: Sequence verified! Found ${totalActiveCount} active node configuration. Cryptographic map cleared.`);
            GameState.score += 100;
            scoreDisplay.textContent = GameState.score.toString().padStart(4, '0');
            logToTerminal(`[SCORE]: +100 XP added to matrix registers.`);
            // Automatically queue up next iteration shift cleanly
            mutateGridElements();
        } else {
            logToTerminal(`[CRITICAL FAILURE]: Found ${totalActiveCount} active node(s). This configuration violates target parameters. Inversion sequence halted.`);
            logToTerminal(`[HINT]: Adjust matrix node options and run execution sequence compilation again.`);
        }
        
        GameState.isProcessing = false;
        executeBtn.disabled = false;
    }, 1200);
}

// System loop structures
function updateTimeAndEnvironment() {
    GameState.timeOfDay += 0.25; 
    if (GameState.timeOfDay >= 24) GameState.timeOfDay = 0;

    const hours = Math.floor(GameState.timeOfDay);
    const minutes = Math.floor((GameState.timeOfDay % 1) * 60);
    clockDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    let oldMode = GameState.activeMode;
    
    if (hours >= 6 && hours < 12) GameState.activeMode = 'UNARY';
    else if (hours >= 12 && hours < 18) GameState.activeMode = 'BOOLEAN';
    else GameState.activeMode = 'ENIGMA';
    
    logicDisplay.textContent = GameState.activeMode;

    if (oldMode !== GameState.activeMode) {
        logToTerminal(`[SHIFT]: Dial context transition: ${GameState.activeMode}.`);
        mutateGridElements();
        fetchAIPuzzle(GameState.activeMode);
    }
}

function mutateGridElements() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        
        if (GameState.activeMode === 'ENIGMA') {
            tile.textContent = Math.random() > 0.5 ? '1' : '0';
            tile.classList.add('gate');
        } else if (GameState.activeMode === 'BOOLEAN') {
            const symbols = ['1', '0', 'AND', 'OR', 'NOT'];
            tile.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            if (['AND', 'OR', 'NOT'].includes(tile.textContent)) tile.classList.add('gate');
        } else {
            tile.textContent = i.toString(2);
        }

        tile.addEventListener('click', () => {
            if (GameState.isProcessing) return;
            tile.classList.toggle('active');
        });
        gridContainer.appendChild(tile);
    }
}

function logToTerminal(message) {
    const p = document.createElement('p');
    p.className = 'system-msg';
    p.textContent = message;
    terminalLog.appendChild(p);
    terminalLog.scrollTop = terminalLog.scrollHeight;
}

executeBtn.addEventListener('click', executeSequence);
resetBtn.addEventListener('click', () => {
    mutateGridElements();
    fetchAIPuzzle(GameState.activeMode);
});

// Start sequence setups
setInterval(updateTimeAndEnvironment, 6000); // Set to 6 seconds per interval block so players have time to think
mutateGridElements();
fetchAIPuzzle(GameState.activeMode);
