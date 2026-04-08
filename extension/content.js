// Starship Cockpit: ChatGPT Theme - Content Script

console.log("Starship Cockpit: Systems Online.");

function injectHUD() {
  const hudContainer = document.createElement('div');
  hudContainer.id = 'cockpit-hud-overlay';
  hudContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    pointer-events: none;
    font-family: 'JetBrains Mono', monospace;
    color: #00f2ff;
    text-shadow: 0 0 5px #00f2ff;
    font-size: 12px;
    text-align: right;
  `;
  
  hudContainer.innerHTML = `
    <div>SYSTEM: ACTIVE</div>
    <div>FUEL: 100%</div>
    <div>OXYGEN: STABLE</div>
    <div style="margin-top: 10px; font-size: 10px; opacity: 0.7;">COCKPIT v1.0</div>
  `;
  
  document.body.appendChild(hudContainer);
}

// Wait for body to be available
if (document.body) {
  injectHUD();
} else {
  window.addEventListener('DOMContentLoaded', injectHUD);
}
