// CoolGPT: High-Tech Theme - Content Script

console.log("CoolGPT: Systems Online.");

let customName = "CoolGPT";

// Load settings
chrome.storage.local.get(['customName'], (result) => {
  if (result.customName) {
    customName = result.customName;
    updateBranding();
  }
});

function updateBranding() {
  // Find ChatGPT name in header or sidebar
  const elements = document.querySelectorAll('h1, .font-semibold, [data-testid="sidebar"] span');
  elements.forEach(el => {
    if (el.textContent.includes('ChatGPT')) {
      el.textContent = el.textContent.replace('ChatGPT', customName);
    }
  });
}

// Periodically update branding to handle dynamic content
setInterval(updateBranding, 2000);

function injectUI() {
  // Settings Button
  const settingsBtn = document.createElement('div');
  settingsBtn.className = 'cool-settings-btn';
  settingsBtn.innerHTML = `<span>⚙️ SETTINGS</span>`;
  settingsBtn.onclick = showSettings;
  document.body.appendChild(settingsBtn);

  // Bulk Delete Button in Sidebar (if exists)
  const sidebar = document.querySelector('nav');
  if (sidebar) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'cool-delete-btn';
    deleteBtn.innerText = '🗑️ BULK DELETE';
    deleteBtn.onclick = bulkDelete;
    sidebar.prepend(deleteBtn);
  }
}

function showSettings() {
  const modal = document.createElement('div');
  modal.className = 'cool-modal';
  modal.innerHTML = `
    <h3 style="margin:0; color:#00f2ff;">COOLGPT SETTINGS</h3>
    <p style="font-size:10px; color:#8b9bb4;">CHANGE BRAND NAME:</p>
    <input type="text" id="cool-name-input" value="${customName}">
    <div style="display:flex; gap:10px; margin-top:10px;">
      <button id="cool-save-btn" style="flex:1; background:#00f2ff; color:#000; border:none; padding:5px;">SAVE</button>
      <button id="cool-close-btn" style="flex:1; background:#2a313d; color:#fff; border:none; padding:5px;">CLOSE</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('cool-save-btn').onclick = () => {
    const newName = document.getElementById('cool-name-input').value;
    chrome.storage.local.set({ customName: newName }, () => {
      customName = newName;
      updateBranding();
      modal.remove();
    });
  };

  document.getElementById('cool-close-btn').onclick = () => modal.remove();
}

async function bulkDelete() {
  if (!confirm('Are you sure you want to delete ALL chats in view?')) return;
  
  // Find all chat items in the sidebar
  // ChatGPT usually uses specific classes or data attributes for chat items
  const chatItems = document.querySelectorAll('li div.group');
  
  for (const item of chatItems) {
    // This is a heuristic: find the "..." or "Delete" button
    // It usually requires hovering or clicking the menu first
    const menuBtn = item.querySelector('button[aria-haspopup="menu"]');
    if (menuBtn) {
      menuBtn.click();
      await new Promise(r => setTimeout(r, 200));
      
      const deleteBtn = Array.from(document.querySelectorAll('[role="menuitem"]'))
        .find(el => el.textContent.toLowerCase().includes('delete'));
        
      if (deleteBtn) {
        deleteBtn.click();
        await new Promise(r => setTimeout(r, 200));
        
        // Confirm delete modal
        const confirmBtn = document.querySelector('button.btn-danger');
        if (confirmBtn) confirmBtn.click();
        await new Promise(r => setTimeout(r, 500));
      }
    }
  }
  alert('Bulk delete process completed.');
}

// Wait for body to be available
if (document.body) {
  injectUI();
} else {
  window.addEventListener('DOMContentLoaded', injectUI);
}
