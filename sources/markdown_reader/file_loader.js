// Github-first, Codeberg-fallback file loader
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

// SOURCES in priority order
const SOURCES = [
    {
        name: 'GitHub Raw',
        getUrl: (filePath) => `https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/main/${filePath}`,
        needsProxy: false
    },
    {
        name: 'jsDelivr CDN',
        getUrl: (filePath) => `https://cdn.jsdelivr.net/gh/GeaucefStone/Secular_Democratic_Republic@main/${filePath}`,
        needsProxy: false
    },
    {
        name: 'Codeberg Raw',
        getUrl: (filePath) => `https://codeberg.org/GeaucefStone/Secular_Democratic_Republic/raw/branch/main/${filePath}`,
        needsProxy: true
    }
];

// CORS proxy for Codeberg (works better than corsproxy.io)
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Track which source we're using
let currentSource = 0; // Start with GitHub

async function loadDocument(docId) {
    const filePath = documentRegistry[docId];
    if (!filePath) {
        console.error('Document not found:', docId);
        showError(`Document "${docId}" not found`);
        return false;
    }
    
    const output = document.getElementById('markdown-output');
    if (!output) {
        console.error('markdown-output element not found');
        return false;
    }
    
    // Update URL
    window.location.hash = docId;
    
    // Show loading with source info
    const source = SOURCES[currentSource];
    output.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <p>Loading <strong>${docId}</strong>...</p>
            <p><small>Source: ${source.name}</small></p>
            <div style="width: 100px; height: 3px; background: #3498db; margin: 20px auto;"></div>
        </div>
    `;
    
    // Try current source first
    let result = await tryLoadSource(currentSource, filePath);
    
    // If failed, try other sources
    if (!result.success) {
        for (let i = 0; i < SOURCES.length; i++) {
            if (i === currentSource) continue;
            
            output.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <p>${source.name} failed, trying ${SOURCES[i].name}...</p>
                    <div style="width: 100px; height: 3px; background: #f39c12; margin: 20px auto;"></div>
                </div>
            `;
            
            result = await tryLoadSource(i, filePath);
            if (result.success) {
                currentSource = i; // Switch to this source
                break;
            }
        }
    }
    
    if (result.success) {
        // Parse and display
        if (window.parseMarkdown) {
            output.innerHTML = window.parseMarkdown(result.text);
        } else {
            output.innerHTML = `<pre>${result.text}</pre>`;
        }
        
        // Show source indicator
        showSourceIndicator(SOURCES[currentSource].name);
        return true;
    } else {
        // All sources failed
        output.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #d63031;">
                <h3>⚠️ All Sources Failed</h3>
                <p>Could not load "${docId}" from any source.</p>
                
                <div style="margin-top: 20px;">
                    <button onclick="loadDocument('${docId}')" 
                            style="padding: 10px 20px; background: #3498db; color: white; 
                                   border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
                        Retry
                    </button>
                    
                    ${SOURCES.map((source, index) => `
                        <button onclick="forceSource(${index}, '${docId}')" 
                                style="padding: 10px 20px; background: ${index === 0 ? '#2ecc71' : index === 1 ? '#9b59b6' : '#e74c3c'}; 
                                       color: white; border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
                            Force: ${source.name}
                        </button>
                    `).join('')}
                </div>
                
                <div style="margin-top: 30px; font-size: 0.9em; color: #666;">
                    <p>Direct links to try:</p>
                    <ul style="text-align: left; display: inline-block;">
                        ${SOURCES.map(source => {
                            const url = source.getUrl(filePath);
                            return `<li><a href="${source.needsProxy ? CORS_PROXY + encodeURIComponent(url) : url}" 
                                           target="_blank" style="color: #7393B3;">
                                ${source.name}
                            </a></li>`;
                        }).join('')}
                    </ul>
                </div>
            </div>
        `;
        return false;
    }
}

async function tryLoadSource(sourceIndex, filePath) {
    const source = SOURCES[sourceIndex];
    let url = source.getUrl(filePath);
    
    // Add CORS proxy if needed
    if (source.needsProxy) {
        url = CORS_PROXY + encodeURIComponent(url);
    }
    
    console.log(`Trying ${source.name}: ${url}`);
    
    try {
        const response = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const text = await response.text();
        console.log(`✅ Success from ${source.name}`);
        return { success: true, text: text, source: source.name };
        
    } catch (error) {
        console.error(`❌ Failed from ${source.name}:`, error.message);
        return { success: false, error: error.message };
    }
}

function showError(message) {
    const output = document.getElementById('markdown-output');
    if (output) {
        output.innerHTML = `<div style="color: #d63031; padding: 20px;">${message}</div>`;
    }
}

function showSourceIndicator(sourceName) {
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
        backdrop-filter: blur(5px);
        border-left: 3px solid #7393B3;
    `;
    
    indicator.innerHTML = `<strong>Source:</strong> ${sourceName}`;
    indicator.title = 'Current document source';
    
    document.body.appendChild(indicator);
}

// Force a specific source
async function forceSource(sourceIndex, docId) {
    currentSource = sourceIndex;
    await loadDocument(docId);
}

// Test all sources
async function testAllSources() {
    console.log('=== Testing all sources ===');
    const testPath = 'contents/01B_constitution.md';
    
    for (let i = 0; i < SOURCES.length; i++) {
        const result = await tryLoadSource(i, testPath);
        console.log(`${SOURCES[i].name}: ${result.success ? '✅' : '❌'}`);
    }
}

// Initialize
function initDocumentLoader() {
    console.log('Initializing GitHub-first document loader');
    
    // Load from URL hash
    const hash = window.location.hash.substring(1);
    if (hash && documentRegistry[hash]) {
        setTimeout(() => loadDocument(hash), 100);
    }
    
    // Set up sidebar navigation
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.classList.contains('dropdown-toggle')) return;
            
            e.preventDefault();
            const docId = this.getAttribute('href').substring(1);
            loadDocument(docId);
        });
    });
    
    // Test sources on startup
    setTimeout(testAllSources, 2000);
}

// Export
window.loadDocument = loadDocument;
window.forceSource = forceSource;
window.testAllSources = testAllSources;
window.initDocumentLoader = initDocumentLoader;

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDocumentLoader);
} else {
    initDocumentLoader();
}