// File Loader for Markdown Documents with Auto-Failover Support
const documentRegistry = {
    // Constitution
    'constitution': 'contents/01B_constitution.md',

    // Base System
    'legal_dictionary': 'contents/01C_legal_dictionary.md',
    'department_structure': 'contents/01D_department_structure.md',
    'agency_structure': 'contents/01E_agency_structure.md',
    'tax_structure': 'contents/01F_tax_structure.md',
    'law_making_process': 'contents/01G_law_making_process.md',
    'governing_system': 'contents/01H_governing_system.md',

    // Penal Code
    'criminal_cowardice': 'contents/penal_code/criminal_cowardice.md',
    'defense_and_liability': 'contents/penal_code/defense_and_liability.md',
    'homicide': 'contents/penal_code/homicide.md',

    // Acts and Bills
    'secure_systems_act': 'contents/acts/01A_secure_microkernel_systems_act.md',
    'adult_freedom_guarantor_act': 'contents/acts/01B_adult_freedom_guarantor_act.md',
    'universal_sanitary_infrastructure_act': 'contents/acts/01C_universal_sanitary_infrastructure.md',
    'hate_crime_enhancement_act': 'contents/acts/01D_hate_crime_enhancement_act.md',
    'hate_symbol_evidence_act': 'contents/acts/01E_hate_symbol_evidence_act.md',
    'social_compliance_act': 'contents/acts/01F_social_compliance_act.md',
    'animal_testing_act': 'contents/acts/01G_animal_testing_act.md',
    'military_age_cognition_act': 'contents/acts/01H_military_age_cognition_act.md',
    'conversion_therapy_ban': 'contents/acts/01I_conversion_therapy_ban.md',
    'responsible_carry': 'contents/acts/01J_responsible_carry.md',

    // Legal Framework & Governance
    'poetic_justice': 'contents/education/textbook/00_analysis-flexible_sentencing.md',
    'proxicide_doctrine': 'contents/education/textbook/01A_analysis-proxicide_doctrine.md',
    'privacy_and_surveilance': 'contents/education/textbook/01A0_analysis-balance_of_privacy_and_surveilance.md',
    'private_prisons': 'contents/education/textbook/01A01_analysis-private_prisons.md',
    'tiered_self_defense_framework': 'contents/education/textbook/01B_analysis-tiered_self_defense_framework.md',
    'defense_and_transferred_liability': 'contents/education/textbook/01C_analysis-defense_and_transferred_liability.md',
    'the_last_landlord': 'contents/education/textbook/01D_the_last_landlord.md',
    'housing': 'contents/education/textbook/01E_analysis-housing.md',
    'what_is_a_theocrat': 'contents/education/textbook/01F_analysis-what_is_a_theocrat.md',
    'immigration_and_secularism': 'contents/education/textbook/01G_analysis-immigration_and_secularism.md',
    'bodily_autonomy_and_public_health': 'contents/education/textbook/01H_analysis-bodily_autonomy_and_public_health.md',
    'womens_autonomy': 'contents/education/textbook/01I_analysis-womens_autonomy.md',
    'coerced_marriage': 'contents/education/textbook/01J_analysis-coerced_marriage.md',
    'no_fault_divorce': 'contents/education/textbook/01K_analysis-no_fault_divorce.md',
    'romeo_and_juliet': 'contents/education/textbook/01L_analysis-romeo_and_juliet.md',
    'safe_emancipation_of_minors': 'contents/education/textbook/01M_analysis-safe_emancipation_of_minors.md',
    'citizens_branch': 'contents/education/textbook/01N_analysis-citizens_branch.md',
    'workers_branch': 'contents/education/textbook/01O_analysis-workers_branch.md',
    'scientific_branch': 'contents/education/textbook/01P_analysis-scientific_branch.md',
    'surgeon_court': 'contents/education/textbook/01Q_analysis-surgeon_court.md',
    'historian_branch': 'contents/education/textbook/01R_analysis-historian_branch.md',
    'historian_court': 'contents/education/textbook/01S_analysis-historian_court.md',
    'covert_ops': 'contents/education/textbook/01T_analysis-covert_ops.md',
    'conspiracy_framework': 'contents/education/textbook/01U_analysis-conspiracy_framework.md',
    'financial_conflicts': 'contents/education/textbook/01V_analysis-financial_conflicts.md',
    'substance_over_form': 'contents/education/textbook/01W_analysis-substance_over_form.md',
    'proportionate_fines': 'contents/education/textbook/01W0_analysis-proportionate_fines.md',
    'poisoned_chalice_provision': 'contents/education/textbook/01X_analysis-poisoned_chalice_provision.md',
    'anti_corruption_architecture': 'contents/education/textbook/01Y_anti_corruption_architecture.md',
    'civil_war_crimes': 'contents/education/textbook/01Z_analysis-civil_war_crimes.md',
    'retained_sovereignty': 'contents/education/textbook/02A_analysis-retained_sovereignty.md',

    // Case Study
    'highway_interceptor': 'contents/simulations/case_study/highway_interceptor_case.md',
    'hoa_vs_doe': 'contents/simulations/case_study/hoa_vs_doe.md',
    'oakwood_vs_vance': 'contents/simulations/case_study/oakwood_vs_vance.md',
    'petrov_vs_extradition': 'contents/simulations/case_study/petrov_vs_extradition_treaty.md',
    'poisoned_chalic_doctrine': 'contents/simulations/case_study/poisoned_chalice_doctrine.md',
    'the_perpetual_tenancy': 'contents/simulations/case_study/the_perpetual_tenancy.md',
    'thou_shalt_not_bear_false_witness': 'contents/simulations/case_study/thou_shalt_not_bear_false_witness.md',
    'tiptoeing_the_voice_activated_minefield': 'contents/simulations/case_study/tiptoeing_the_voice_activated_minefield.md',
    'troll_kings_downfall': 'contents/simulations/case_study/troll_kings_downfall.md',

    // Civil Acts
    'holocaust_denial': 'contents/simulations/civil_acts/holocaust_denial.md',

    // Scenarios
    'anti_transphobic_showdown': 'contents/simulations/scenarios/anti_transphobic_showdown.md',
    'atlas_dilemma': 'contents/simulations/scenarios/atlas_dilemma.md',
    'landlords_gambit': 'contents/simulations/scenarios/landlords_gambit.md',
    'nathaniels_dilemma': 'contents/simulations/scenarios/nathaniels_dilemma.md',
    'quarantine_dilemma': 'contents/simulations/scenarios/quarantine_dilemma.md',
    'sterling_dilemma': 'contents/simulations/scenarios/sterling_dilemma.md',
    'case_of_two_schools': 'contents/simulations/scenarios/the_case_of_two_schools.md',
    'groves_defense': 'contents/simulations/scenarios/the_groves_defense.md',
    'mathematical_sentence': 'contents/simulations/scenarios/the_mathematical_sentence.md',
    'secular_defense': 'contents/simulations/scenarios/the_secular_defense.md'
};

// Platform configurations
const PLATFORMS = {
    codeberg: {
        name: 'Codeberg',
        baseUrl: 'https://codeberg.org',
        urlTemplate: '{baseUrl}/{username}/{repository}/raw/branch/{branch}/{filePath}',
        priority: 1,
        needsProxy: true
    },
    github: {
        name: 'GitHub',
        baseUrl: 'https://raw.githubusercontent.com',
        urlTemplate: '{baseUrl}/{username}/{repository}/{branch}/{filePath}',
        priority: 2,
        needsProxy: false
    },
    jsdelivr: {
        name: 'jsDelivr CDN',
        baseUrl: 'https://cdn.jsdelivr.net',
        urlTemplate: '{baseUrl}/gh/{username}/{repository}@{branch}/{filePath}',
        priority: 3,
        needsProxy: false
    }
};

const REPO_CONFIG = {
    username: 'GeaucefStone',
    repository: 'Secular_Democratic_Republic',
    branch: 'main',
    currentPlatform: 'codeberg', // Changed to codeberg first
    failureCount: 0,
    maxFailuresBeforeSwitch: 2,
    isSwitching: false,
    platformHealth: {}
};

// CORS proxy options
const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy?quest='
];

// Get URL for a platform
function getPlatformUrl(platformKey, filePath) {
    const platform = PLATFORMS[platformKey];
    if (!platform) return null;
    
    let url = platform.urlTemplate
        .replace(/{baseUrl}/g, platform.baseUrl)
        .replace(/{username}/g, REPO_CONFIG.username)
        .replace(/{repository}/g, REPO_CONFIG.repository)
        .replace(/{branch}/g, REPO_CONFIG.branch)
        .replace(/{filePath}/g, filePath);
    
    return url;
}

// Test if a platform is working
async function testPlatform(platformKey) {
    const testPath = 'contents/01B_constitution.md';
    const url = getPlatformUrl(platformKey, testPath);
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        let testUrl = url;
        
        // Apply CORS proxy if needed
        if (PLATFORMS[platformKey].needsProxy) {
            testUrl = CORS_PROXIES[0] + encodeURIComponent(url);
        }
        
        const response = await fetch(testUrl, {
            method: 'HEAD',
            signal: controller.signal,
            cache: 'no-store'
        });
        
        clearTimeout(timeoutId);
        
        const isHealthy = response.ok;
        REPO_CONFIG.platformHealth[platformKey] = {
            healthy: isHealthy,
            lastChecked: Date.now()
        };
        
        console.log(`${PLATFORMS[platformKey].name}: ${isHealthy ? '✅ Healthy' : '❌ Unhealthy'}`);
        return isHealthy;
        
    } catch (error) {
        console.log(`${PLATFORMS[platformKey].name}: ❌ Error - ${error.name}`);
        REPO_CONFIG.platformHealth[platformKey] = {
            healthy: false,
            lastChecked: Date.now(),
            error: error.name
        };
        return false;
    }
}

// Get best available platform
async function getBestPlatform() {
    // Check current platform first
    const currentPlatform = REPO_CONFIG.currentPlatform;
    const currentHealth = REPO_CONFIG.platformHealth[currentPlatform];
    
    // If current platform was recently checked and is healthy, use it
    if (currentHealth && currentHealth.healthy && 
        Date.now() - currentHealth.lastChecked < 30000) {
        return currentPlatform;
    }
    
    // Test current platform
    const isCurrentHealthy = await testPlatform(currentPlatform);
    if (isCurrentHealthy) {
        return currentPlatform;
    }
    
    // Try other platforms in priority order
    const platformsInOrder = Object.keys(PLATFORMS)
        .sort((a, b) => PLATFORMS[a].priority - PLATFORMS[b].priority);
    
    for (const platformKey of platformsInOrder) {
        if (platformKey === currentPlatform) continue;
        
        const isHealthy = await testPlatform(platformKey);
        if (isHealthy) {
            console.log(`Switching to ${PLATFORMS[platformKey].name}`);
            REPO_CONFIG.currentPlatform = platformKey;
            REPO_CONFIG.failureCount = 0;
            return platformKey;
        }
    }
    
    // All platforms failed, return current
    return currentPlatform;
}

// Try to load from a platform with fallback strategies
async function tryLoadFromPlatform(platformKey, filePath) {
    const platform = PLATFORMS[platformKey];
    const strategies = [];
    
    // Strategy 1: Direct (for platforms that don't need proxy)
    if (!platform.needsProxy) {
        strategies.push({
            name: 'Direct',
            url: getPlatformUrl(platformKey, filePath)
        });
    }
    
    // Strategy 2-4: With CORS proxies
    for (let i = 0; i < CORS_PROXIES.length; i++) {
        strategies.push({
            name: `CORS Proxy ${i + 1}`,
            url: CORS_PROXIES[i] + encodeURIComponent(getPlatformUrl(platformKey, filePath))
        });
    }
    
    // Try each strategy
    for (const strategy of strategies) {
        console.log(`Trying ${strategy.name} for ${platform.name}`);
        
        try {
            const response = await fetch(strategy.url, {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            
            if (response.ok) {
                console.log(`✅ Success with ${strategy.name}`);
                return {
                    success: true,
                    response: response,
                    strategy: strategy.name,
                    platform: platform.name
                };
            }
        } catch (error) {
            console.log(`❌ Failed with ${strategy.name}: ${error.message}`);
            continue;
        }
    }
    
    return { success: false };
}

// Main document loader
async function loadDocument(docId) {
    const filePath = documentRegistry[docId];
    if (!filePath) {
        showError(`Document "${docId}" not found`);
        return false;
    }
    
    const output = document.getElementById('markdown-output');
    if (!output) return false;
    
    // Update URL hash
    window.location.hash = docId;
    
    // Show loading
    output.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <p>Loading <strong>${docId}</strong>...</p>
            <div style="width: 100px; height: 3px; background: #3498db; margin: 20px auto;"></div>
        </div>
    `;
    
    // Get best platform
    const platformKey = await getBestPlatform();
    const platform = PLATFORMS[platformKey];
    
    // Try to load
    const result = await tryLoadFromPlatform(platformKey, filePath);
    
    if (result.success) {
        // Reset failure count
        REPO_CONFIG.failureCount = 0;
        
        // Update platform health
        REPO_CONFIG.platformHealth[platformKey] = {
            healthy: true,
            lastChecked: Date.now()
        };
        
        // Parse and display
        const text = await result.response.text();
        if (window.parseMarkdown) {
            output.innerHTML = window.parseMarkdown(text);
        } else if (window.loadMarkdownFromUrl) {
            // Use the markdown loader if available
            output.innerHTML = window.parseMarkdown(text);
        } else {
            output.innerHTML = `<pre>${text}</pre>`;
        }
        
        // Show source indicator
        showSourceIndicator(platform.name, result.strategy);
        
        return true;
        
    } else {
        // Increment failure count
        REPO_CONFIG.failureCount++;
        
        // Check if we should switch platforms
        if (REPO_CONFIG.failureCount >= REPO_CONFIG.maxFailuresBeforeSwitch) {
            console.log(`Too many failures, marking ${platform.name} as unhealthy`);
            REPO_CONFIG.platformHealth[platformKey] = {
                healthy: false,
                lastChecked: Date.now()
            };
        }
        
        // Show error
        output.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #d63031;">
                <h3>⚠️ Failed to Load Document</h3>
                <p>Could not load "${docId}" from ${platform.name}.</p>
                
                <div style="margin-top: 20px;">
                    <button onclick="loadDocument('${docId}')" 
                            style="padding: 10px 20px; background: #3498db; color: white; 
                                   border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
                        Try Again
                    </button>
                    <button onclick="forcePlatformSwitch('${docId}')" 
                            style="padding: 10px 20px; background: #f39c12; color: white; 
                                   border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
                        Try Different Source
                    </button>
                    <a href="${getPlatformUrl('github', filePath)}" target="_blank" 
                       style="padding: 10px 20px; background: #2ecc71; color: white; 
                              text-decoration: none; border-radius: 5px; margin: 5px; display: inline-block;">
                        Open Raw File
                    </a>
                </div>
                
                <div style="margin-top: 20px; font-size: 0.9em; color: #666;">
                    <p>File path: <code>${filePath}</code></p>
                    <p>Platform status: 
                        <a href="https://status.codeberg.org" target="_blank" style="color: #7393B3;">Codeberg</a> | 
                        <a href="https://www.githubstatus.com" target="_blank" style="color: #7393B3;">GitHub</a>
                    </p>
                </div>
            </div>
        `;
        
        return false;
    }
}

// Helper functions
function showError(message) {
    const output = document.getElementById('markdown-output');
    if (output) {
        output.innerHTML = `<div style="color: #d63031; padding: 20px;">${message}</div>`;
    }
}

function showSourceIndicator(platformName, strategy) {
    // Remove existing indicator
    const existing = document.getElementById('source-indicator');
    if (existing) existing.remove();
    
    // Create new indicator
    const indicator = document.createElement('div');
    indicator.id = 'source-indicator';
    indicator.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(45, 55, 72, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 10000;
        cursor: help;
        backdrop-filter: blur(5px);
        border-left: 3px solid #7393B3;
    `;
    
    indicator.innerHTML = `
        <strong>Source:</strong> ${platformName}<br>
        <small>${strategy}</small>
    `;
    
    indicator.title = 'Click to check platform status';
    indicator.onclick = () => checkPlatformHealth();
    
    document.body.appendChild(indicator);
}

// Force platform switch
async function forcePlatformSwitch(docId) {
    // Mark current platform as unhealthy
    const currentPlatform = REPO_CONFIG.currentPlatform;
    REPO_CONFIG.platformHealth[currentPlatform] = {
        healthy: false,
        lastChecked: Date.now()
    };
    
    // Reset failure count
    REPO_CONFIG.failureCount = 0;
    
    // Reload document
    await loadDocument(docId);
}

// Check platform health
async function checkPlatformHealth() {
    console.log('=== Platform Health Check ===');
    
    for (const platformKey of Object.keys(PLATFORMS)) {
        await testPlatform(platformKey);
    }
    
    alert('Platform health check complete. Check console for details.');
}

// Get all documents by category (for debugging)
function getDocumentsByCategory() {
    return {
        'Constitution': ['constitution'],
        'Base System': [
            'legal_dictionary', 'department_structure', 'agency_structure',
            'tax_structure', 'law_making_process', 'governing_system'
        ],
        'Penal Code': ['criminal_cowardice', 'defense_and_liability', 'homicide'],
        'Acts and Bills': [
            'secure_systems_act', 'adult_freedom_guarantor_act', 'universal_sanitary_infrastructure_act',
            'hate_crime_enhancement_act', 'hate_symbol_evidence_act', 'social_compliance_act',
            'animal_testing_act', 'military_age_cognition_act', 'conversion_therapy_ban', 'responsible_carry'
        ],
        'Legal Framework': [
            'poetic_justice', 'proxicide_doctrine', 'privacy_and_surveilance', 'private_prisons',
            'tiered_self_defense_framework', 'defense_and_transferred_liability', 'the_last_landlord',
            'housing', 'what_is_a_theocrat', 'immigration_and_secularism', 'bodily_autonomy_and_public_health',
            'womens_autonomy', 'coerced_marriage', 'no_fault_divorce', 'romeo_and_juliet',
            'safe_emancipation_of_minors', 'citizens_branch', 'workers_branch', 'scientific_branch',
            'surgeon_court', 'historian_branch', 'historian_court', 'covert_ops', 'conspiracy_framework',
            'financial_conflicts', 'substance_over_form', 'proportionate_fines', 'poisoned_chalice_provision',
            'anti_corruption_architecture', 'civil_war_crimes', 'retained_sovereignty'
        ],
        'Case Studies': [
            'highway_interceptor', 'hoa_vs_doe', 'oakwood_vs_vance', 'petrov_vs_extradition',
            'poisoned_chalic_doctrine', 'the_perpetual_tenancy', 'thou_shalt_not_bear_false_witness',
            'tiptoeing_the_voice_activated_minefield', 'troll_kings_downfall'
        ],
        'Civil Acts': ['holocaust_denial'],
        'Scenarios': [
            'anti_transphobic_showdown', 'atlas_dilemma', 'landlords_gambit', 'nathaniels_dilemma',
            'quarantine_dilemma', 'sterling_dilemma', 'case_of_two_schools', 'groves_defense',
            'mathematical_sentence', 'secular_defense'
        ]
    };
}

// Initialize loader
async function initDocumentLoader() {
    console.log('Initializing document loader (Codeberg-first)...');
    
    // Initial platform health check
    await checkPlatformHealth();
    
    // Load initial document from URL hash
    const hash = window.location.hash.substring(1);
    if (hash && documentRegistry[hash]) {
        setTimeout(() => loadDocument(hash), 300);
    }
    
    // Periodic health checks (every 2 minutes)
    setInterval(async () => {
        console.log('Performing periodic platform health check...');
        await checkPlatformHealth();
    }, 120000);
}

// Export functions
window.loadDocument = loadDocument;
window.forcePlatformSwitch = forcePlatformSwitch;
window.checkPlatformHealth = checkPlatformHealth;
window.getDocumentsByCategory = getDocumentsByCategory;
window.initDocumentLoader = initDocumentLoader;

// Initialize on page load
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