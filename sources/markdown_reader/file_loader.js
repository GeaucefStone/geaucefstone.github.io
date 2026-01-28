// File Loader for Markdown Documents with Auto-Failover Support
const documentRegistry = {
    // Note: Update these paths to match your actual file structure
    'constitution': 'contents/01B_constitution.md',

    // Base System
    'legal_dictionary': 'contents/01C_legal_dictionary.md',
    'department_structure': 'contents/01D_department_structure.md',
    'agency_structure': 'contents/01E_agency_structure.md',
    'tax_structure': 'contents/01F_tax_structure.md',
    'law_making_process': 'contents/01G_law_making_process.md',
    'governing_system': 'contents/01H_governing_system.md',

    // Penal Code (ensure these files exist)
    'criminal_cowardice': 'contents/penal_code/criminal_cowardice.md',
    'defense_and_liability': 'contents/penal_code/defense_and_liability.md',
    'homicide': 'contents/penal_code/homicide.md',

    // Acts and Bills (ensure these files exist)
    'secure_systems_act': 'contents/acts/01A_secure_microkernel_systems_act.md',
    'adult_freedom_guarantor_act': 'contents/acts/01B_adult_freedom_guarantor_act.md',
    // FIXED: Corrected spelling
    'universtal_sanitary_infrastructure_act': 'contents/acts/01C_universal_sanitary_infrastructure_act.md',
    'hate_crime_enhancement_act': 'contents/acts/01D_hate_crime_enhancement_act.md',
    'hate_symbol_evidence_act': 'contents/acts/01E_hate_symbol_evidence_act.md',
    'social_compliance_act': 'contents/acts/01F_social_compliance_act.md',
    'animal_testing_act': 'contents/acts/01G_animal_testing_act.md',
    'military_age_cognition_act': 'contents/acts/01H_military_age_cognition_act.md',
    'conversion_therapy_ban': 'contents/acts/01I_conversion_therapy_ban.md',
    'responsible_carry': 'contents/acts/01J_responsible_carry.md'
};

// Only include files that actually exist in your repository
const PLATFORMS = {
    github: {
        name: 'GitHub',
        baseUrl: 'https://raw.githubusercontent.com',
        // Correct GitHub raw URL format
        urlTemplate: '{baseUrl}/{username}/{repository}/{branch}/{filePath}',
        priority: 1
    },
    codeberg: {
        name: 'Codeberg',
        baseUrl: 'https://codeberg.org',
        // Correct Codeberg raw URL format
        urlTemplate: '{baseUrl}/{username}/{repository}/raw/branch/{branch}/{filePath}',
        priority: 2,
        needsProxy: true
    }
};

const REPO_CONFIG = {
    username: 'GeaucefStone',
    repository: 'Secular_Democratic_Republic',
    branch: 'main',
    currentPlatform: 'github', // This is first
    failureCount: 0,
    maxFailuresBeforeSwitch: 2,
    isSwitching: false
};

// Simplified URL generator
function getPlatformUrl(platformKey, filePath) {
    const platform = PLATFORMS[platformKey];
    if (!platform) return null;
    
    let url = platform.urlTemplate
        .replace(/{baseUrl}/g, platform.baseUrl)
        .replace(/{username}/g, REPO_CONFIG.username)
        .replace(/{repository}/g, REPO_CONFIG.repository)
        .replace(/{branch}/g, REPO_CONFIG.branch)
        .replace(/{filePath}/g, filePath);
    
    // Add CORS proxy for Codeberg if needed
    if (platformKey === 'codeberg' && platform.needsProxy) {
        url = 'https://corsproxy.io/?' + encodeURIComponent(url);
    }
    
    return url;
}

// Simplified load function
async function loadDocument(docId) {
    const filePath = documentRegistry[docId];
    if (!filePath) {
        console.error('Document not found:', docId);
        showError(`Document "${docId}" not found in registry`);
        return false;
    }
    
    const output = document.getElementById('markdown-output');
    if (!output) return false;
    
    // Show loading state
    output.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <p style="color: #999;">Loading ${docId}...</p>
            <div style="width: 100px; height: 3px; background: #3498db; margin: 20px auto;"></div>
        </div>
    `;
    
    const platform = REPO_CONFIG.currentPlatform;
    const url = getPlatformUrl(platform, filePath);
    
    if (!url) {
        showError('Failed to generate URL');
        return false;
    }
    
    console.log(`Loading from ${platform}: ${url}`);
    
    try {
        // Update URL hash
        window.location.hash = docId;
        
        // Try to load
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const markdownText = await response.text();
        
        // Use the markdown parser
        if (window.loadMarkdownFromUrl) {
            await window.loadMarkdownFromUrl(url);
        } else if (window.parseMarkdown) {
            output.innerHTML = window.parseMarkdown(markdownText);
        } else {
            output.innerHTML = `<pre>${markdownText}</pre>`;
        }
        
        console.log(`Successfully loaded ${docId}`);
        return true;
        
    } catch (error) {
        console.error('Failed to load document:', error);
        
        // Try GitHub Pages as fallback
        if (platform === 'github') {
            const pagesUrl = `https://${REPO_CONFIG.username}.github.io/${REPO_CONFIG.repository}/${filePath}`;
            console.log('Trying GitHub Pages:', pagesUrl);
            
            try {
                const response = await fetch(pagesUrl);
                if (response.ok) {
                    const text = await response.text();
                    output.innerHTML = window.parseMarkdown ? window.parseMarkdown(text) : `<pre>${text}</pre>`;
                    return true;
                }
            } catch (pagesError) {
                console.error('GitHub Pages also failed:', pagesError);
            }
        }
        
        // Show error
        output.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #d63031;">
                <h3>⚠️ Failed to Load Document</h3>
                <p><strong>Document:</strong> ${docId}</p>
                <p><strong>Path:</strong> ${filePath}</p>
                <p><strong>Error:</strong> ${error.message}</p>
                <p><strong>Platform:</strong> ${platform}</p>
                <div style="margin-top: 30px;">
                    <button onclick="loadDocument('${docId}')" 
                            style="padding: 10px 20px; background: #3498db; color: white; 
                                   border: none; border-radius: 5px; cursor: pointer;">
                        Try Again
                    </button>
                    <a href="${url}" target="_blank" 
                       style="padding: 10px 20px; background: #2ecc71; color: white; 
                              text-decoration: none; border-radius: 5px; margin-left: 10px;">
                        Open Raw File
                    </a>
                </div>
                <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
                    Make sure the file exists at: <code>${filePath}</code>
                </p>
            </div>
        `;
        
        return false;
    }
}

function showError(message) {
    const output = document.getElementById('markdown-output');
    if (output) {
        output.innerHTML = `<div style="color: #d63031; padding: 20px;">${message}</div>`;
    }
}

// Initialize on page load
async function initDocumentLoader() {
    console.log('Document loader initialized');
    
    // Check for hash in URL
    const hash = window.location.hash.substring(1);
    if (hash && documentRegistry[hash]) {
        setTimeout(() => loadDocument(hash), 100);
    }
    
    return true;
}

// Export functions
window.loadDocument = loadDocument;
window.initDocumentLoader = initDocumentLoader;

// For sidebar navigation
document.addEventListener('DOMContentLoaded', function() {
    // Set up sidebar click handlers
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip dropdown toggles
            if (this.classList.contains('dropdown-toggle')) {
                return;
            }
            
            e.preventDefault();
            const docId = this.getAttribute('href').substring(1);
            loadDocument(docId);
        });
    });
    
    // Initialize loader
    initDocumentLoader();
});