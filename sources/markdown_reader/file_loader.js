[file name]: file_loader.js
[file content begin]
// File Loader for Markdown Documents with Auto-Failover Support
// If primary source fails, automatically switches to backup

// Initialize enhanced notification system
function initNotificationSystem() {
    // Check if already initialized
    if (document.getElementById('notification-container')) return;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .notification-container {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        }
        
        .notification {
            pointer-events: auto;
            padding: 12px 18px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-family: Arial, sans-serif;
            font-size: 14px;
            max-width: 350px;
            min-width: 200px;
            opacity: 0;
            transform: translateX(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            color: white;
        }
        
        .notification.show {
            opacity: 1;
            transform: translateX(0);
        }
        
        .notification.info {
            background: #3498db;
            border-left: 4px solid #2980b9;
        }
        
        .notification.success {
            background: #2ecc71;
            border-left: 4px solid #27ae60;
        }
        
        .notification.warning {
            background: #f39c12;
            border-left: 4px solid #d35400;
        }
        
        .notification.error {
            background: #e74c3c;
            border-left: 4px solid #c0392b;
        }
        
        .notification-icon {
            font-size: 16px;
        }
        
        .notification-content {
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 16px;
            padding: 0;
            margin: 0;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        .notification-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: rgba(255,255,255,0.3);
            border-radius: 0 0 6px 6px;
            overflow: hidden;
        }
        
        .notification-progress-bar {
            height: 100%;
            background: rgba(255,255,255,0.7);
            width: 100%;
            transform: translateX(-100%);
            transition: transform 5s linear;
        }
        
        .notification.show .notification-progress-bar {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(styleElement);
    
    const container = document.createElement('div');
    container.id = 'notification-container';
    container.className = 'notification-container';
    document.body.appendChild(container);
}

// Enhanced showNotification function
function showNotification(message, type = 'info', duration = 5000) {
    // Initialize if needed
    if (!document.getElementById('notification-container')) {
        initNotificationSystem();
    }
    
    const container = document.getElementById('notification-container');
    
    // Limit to 5 notifications
    const notifications = container.querySelectorAll('.notification');
    if (notifications.length >= 5) {
        const oldest = notifications[0];
        removeNotification(oldest);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    
    const icon = icons[type] || icons.info;
    
    notification.innerHTML = `
        <span class="notification-icon">${icon}</span>
        <span class="notification-content">${message}</span>
        <button class="notification-close" title="Close">×</button>
        <div class="notification-progress">
            <div class="notification-progress-bar"></div>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto-hide
    let hideTimeout;
    if (duration > 0) {
        hideTimeout = setTimeout(() => {
            removeNotification(notification);
        }, duration);
        
        // Pause on hover
        notification.addEventListener('mouseenter', () => {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
                notification.querySelector('.notification-progress-bar').style.animationPlayState = 'paused';
            }
        });
        
        notification.addEventListener('mouseleave', () => {
            if (!hideTimeout) {
                hideTimeout = setTimeout(() => {
                    removeNotification(notification);
                }, duration);
                notification.querySelector('.notification-progress-bar').style.animationPlayState = 'running';
            }
        });
    }
    
    return {
        element: notification,
        close: () => removeNotification(notification),
        update: (newMessage, newType) => updateNotification(notification, newMessage, newType)
    };
}

function removeNotification(notification) {
    if (!notification || !notification.parentNode) return;
    
    notification.classList.remove('show');
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function updateNotification(notification, newMessage, newType) {
    if (!notification) return;
    
    const content = notification.querySelector('.notification-content');
    const icon = notification.querySelector('.notification-icon');
    
    if (content) content.textContent = newMessage;
    
    if (newType) {
        notification.className = notification.className.replace(/info|success|warning|error/g, '');
        notification.classList.add(newType);
        
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        if (icon) icon.textContent = icons[newType] || icons.info;
    }
    
    return notification;
}

// Convenience functions
function showInfo(message, duration) {
    return showNotification(message, 'info', duration);
}

function showSuccess(message, duration) {
    return showNotification(message, 'success', duration);
}

function showWarning(message, duration) {
    return showNotification(message, 'warning', duration);
}

function showError(message, duration) {
    return showNotification(message, 'error', duration);
}

function clearAllNotifications() {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notifications = container.querySelectorAll('.notification');
    notifications.forEach(notification => {
        removeNotification(notification);
    });
}

// Document registry
const documentRegistry = {
    // Short IDs mapped to file paths (not full URLs)
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
    'universtal_sanitary_infrastructure_act': 'contents/acts/01C_universal_sanitary_infrastructure.md',
    'hate_crime_enhancement_act': 'contents/acts/01D_hate_crime_enhancement_act.md',
    'hate_symbol_evidence_act': 'contents/acts/01E_hate_symbol_evidence_act.md',
    'social_compliance_act': 'contents/acts/01F_social_compliance.md', 
    'animal_testing_act': 'contents/acts/01G_animal_testing.md', 
    'military_age_cognition_act': 'contents/acts/01H_military_age_cognition_act.md',
    'conversion_therapy_ban': 'contents/acts/01I_conversion_therapy_ban.md',
    'responsible_carry': 'contents/acts/01J_responsible_carry.md',

    // Legal Framework and Governance
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

// Platform configurations in priority order
const PLATFORMS = {
    github: {
        name: 'GitHub',
        baseUrl: 'https://raw.githubusercontent.com',
        urlTemplate: '{baseUrl}/{username}/{repository}/{branch}/{filePath}',
        priority: 1
    },
    codeberg: {
        name: 'Codeberg',
        baseUrl: 'https://codeberg.org',
        urlTemplate: '{baseUrl}/{username}/{repository}/raw/branch/{branch}/{filePath}',
        priority: 2
    }
};

const CORS_PROXY = 'https://corsproxy.io/?';

// Repository configuration
const REPO_CONFIG = {
    username: 'GeaucefStone',
    repository: 'Secular_Democratic_Republic',
    branch: 'main',
    currentPlatform: 'github', // FIXED: lowercase 'github'
    failureCount: 0,
    maxFailuresBeforeSwitch: 3,
    isSwitching: false,
    healthCheckCache: {}
};

// Generate URL for a specific platform
function getPlatformUrl(platformKey, shortPath) {
    const platform = PLATFORMS[platformKey];
    if (!platform) {
        console.error('Unsupported platform:', platformKey);
        showError(`Unsupported platform: ${platformKey}`);
        return null;
    }
    
    let url = platform.urlTemplate
        .replace('{baseUrl}', platform.baseUrl)
        .replace('{username}', REPO_CONFIG.username)
        .replace('{repository}', REPO_CONFIG.repository)
        .replace('{branch}', REPO_CONFIG.branch)
        .replace('{filePath}', shortPath);
    
    // Use CORS proxy for Codeberg
    if (platformKey === 'codeberg') {
        url = CORS_PROXY + encodeURIComponent(url);
        console.log('Using CORS proxy for Codeberg URL');
    }
    
    return url;
}

// Get next platform in priority order
function getNextPlatform(currentPlatform) {
    const platforms = Object.keys(PLATFORMS);
    const currentIndex = platforms.indexOf(currentPlatform);
    
    // Try next platform, if none, go back to first
    for (let i = 1; i < platforms.length; i++) {
        const nextIndex = (currentIndex + i) % platforms.length;
        const nextPlatform = platforms[nextIndex];
        
        // Skip if we already tried this platform recently
        if (REPO_CONFIG.healthCheckCache[nextPlatform] !== false) {
            return nextPlatform;
        }
    }
    
    return platforms[(currentIndex + 1) % platforms.length];
}

// Perform platform switch
function switchPlatform(newPlatform) {
    if (REPO_CONFIG.isSwitching || REPO_CONFIG.currentPlatform === newPlatform) {
        return false;
    }
    
    REPO_CONFIG.isSwitching = true;
    const oldPlatform = REPO_CONFIG.currentPlatform;
    const oldPlatformName = PLATFORMS[oldPlatform]?.name || oldPlatform;
    const newPlatformName = PLATFORMS[newPlatform]?.name || newPlatform;
    
    REPO_CONFIG.currentPlatform = newPlatform;
    REPO_CONFIG.failureCount = 0;
    
    console.log(`🔄 Switched from ${oldPlatformName} to ${newPlatformName}`);
    showWarning(`Switched to ${newPlatformName}`);
    
    // Update health check cache
    REPO_CONFIG.healthCheckCache[oldPlatform] = false;
    REPO_CONFIG.healthCheckCache[newPlatform] = true;
    
    setTimeout(() => {
        REPO_CONFIG.isSwitching = false;
    }, 1000);
    
    return true;
}

// Health check for a platform (with caching)
async function checkPlatformHealth(platformKey) {
    // Check cache first
    if (REPO_CONFIG.healthCheckCache[platformKey] !== undefined) {
        console.log(`Using cached health check for ${platformKey}: ${REPO_CONFIG.healthCheckCache[platformKey] ? 'OK' : 'FAILED'}`);
        return REPO_CONFIG.healthCheckCache[platformKey];
    }
    
    const testUrl = getPlatformUrl(platformKey, 'contents/01B_constitution.md');
    if (!testUrl) {
        REPO_CONFIG.healthCheckCache[platformKey] = false;
        return false;
    }
    
    console.log(`Checking health of ${platformKey}...`);
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(testUrl, { 
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            },
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        const isHealthy = response.ok;
        REPO_CONFIG.healthCheckCache[platformKey] = isHealthy;
        
        console.log(`${platformKey} health: ${isHealthy ? 'OK' : 'FAILED'}`);
        return isHealthy;
        
    } catch (error) {
        console.log(`Health check failed for ${platformKey}:`, error.name);
        REPO_CONFIG.healthCheckCache[platformKey] = false;
        return false;
    }
}

// Initialize with health check
async function initializeLoader() {
    console.log('🚀 Initializing document loader with auto-failover...');
    showInfo('Initializing document loader...');
    
    // Clear cache
    REPO_CONFIG.healthCheckCache = {};
    
    // Check all platforms
    const platformHealth = {};
    for (const platformKey of Object.keys(PLATFORMS)) {
        platformHealth[platformKey] = await checkPlatformHealth(platformKey);
    }
    
    // Start with first healthy platform
    const platformsInOrder = Object.keys(PLATFORMS);
    let selectedPlatform = REPO_CONFIG.currentPlatform;
    
    for (const platformKey of platformsInOrder) {
        if (platformHealth[platformKey]) {
            selectedPlatform = platformKey;
            break;
        }
    }
    
    // Switch if needed
    if (selectedPlatform !== REPO_CONFIG.currentPlatform) {
        switchPlatform(selectedPlatform);
    } else {
        console.log(`✓ Using ${PLATFORMS[selectedPlatform].name} as primary source`);
        showSuccess(`Connected to ${PLATFORMS[selectedPlatform].name}`);
    }
    
    // Set cache expiration (5 minutes)
    setTimeout(() => {
        REPO_CONFIG.healthCheckCache = {};
        console.log('Health check cache cleared');
    }, 5 * 60 * 1000);
    
    return true;
}

// Load document with auto-failover
async function loadDocument(docId, retryCount = 0) {
    const shortPath = documentRegistry[docId];
    if (!shortPath) {
        console.error('Document not found:', docId);
        showError(`Document "${docId}" not found`);
        return false;
    }

    const output = document.getElementById('markdown-output');
    if (!output) {
        console.error('markdown-output element not found');
        showError('Document output element not found');
        return false;
    }

    const platform = REPO_CONFIG.currentPlatform;
    const platformName = PLATFORMS[platform]?.name || platform;
    const fullUrl = getPlatformUrl(platform, shortPath);
    
    if (!fullUrl) {
        console.error('Failed to generate URL for platform:', platform);
        showError('Failed to generate document URL');
        return false;
    }
    
    // Update URL hash
    window.history.pushState(null, '', `#${docId}`);
    
    // Show loading state
    output.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <p style="color: #999; margin-bottom: 10px;">Loading from ${platformName}...</p>
            ${retryCount > 0 ? `<p style="color: #f39c12; font-size: 0.9em;">Retry attempt ${retryCount + 1}</p>` : ''}
            <div style="width: 100px; height: 3px; background: #3498db; margin: 20px auto; border-radius: 2px; overflow: hidden;">
                <div style="width: 60%; height: 100%; background: #2ecc71; animation: loading 1.5s infinite;"></div>
            </div>
            <style>
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            </style>
        </div>
    `;

    try {
        // Try to load the document
        await window.loadMarkdownFromUrl(fullUrl);
        
        // Success - reset failure count and update cache
        REPO_CONFIG.failureCount = 0;
        REPO_CONFIG.healthCheckCache[platform] = true;
        
        console.log(`✓ Successfully loaded "${docId}" from ${platformName}`);
        showSuccess(`Loaded "${docId}" from ${platformName}`);
        return true;
        
    } catch (error) {
        console.error(`Failed to load "${docId}" from ${platformName}:`, error.message);
        REPO_CONFIG.failureCount++;
        
        // Update health cache
        REPO_CONFIG.healthCheckCache[platform] = false;
        
        // Check if we should switch platforms
        if (REPO_CONFIG.failureCount >= REPO_CONFIG.maxFailuresBeforeSwitch) {
            const nextPlatform = getNextPlatform(platform);
            
            if (nextPlatform && nextPlatform !== platform) {
                showWarning(`Switching from ${platformName} due to failures`);
                
                if (switchPlatform(nextPlatform)) {
                    // Retry with new platform after short delay
                    setTimeout(() => {
                        loadDocument(docId, 0);
                    }, 1000);
                    return false;
                }
            }
        }
        
        // Show error but don't switch yet
        const failuresLeft = REPO_CONFIG.maxFailuresBeforeSwitch - REPO_CONFIG.failureCount;
        
        output.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #d63031;">
                <p style="font-size: 1.2em; margin-bottom: 10px;">⚠️ Failed to load from ${platformName}</p>
                <p style="margin-bottom: 20px;"><small>Error: ${error.message || 'Unknown error'}</small></p>
                
                ${failuresLeft > 0 ? 
                    `<p style="color: #f39c12; margin-bottom: 20px;">
                        Will switch to backup after ${failuresLeft} more failure${failuresLeft > 1 ? 's' : ''}
                    </p>` : 
                    `<p style="color: #e74c3c; margin-bottom: 20px;">
                        Maximum failures reached. Switching platforms...
                    </p>`
                }
                
                <div style="margin-top: 30px;">
                    <a href="${fullUrl}" target="_blank" rel="noopener noreferrer" 
                       style="display: inline-block; padding: 8px 16px; background: #7393B3; color: white; 
                              text-decoration: none; border-radius: 4px; margin: 5px;">
                        Open raw file
                    </a>
                    <button onclick="loadDocument('${docId}')" 
                            style="padding: 8px 16px; background: #2ecc71; color: white; 
                                   border: none; border-radius: 4px; cursor: pointer; margin: 5px;">
                        Retry Now
                    </button>
                </div>
            </div>
        `;
        
        return false;
    }
}

// Manual platform switch
function setPlatform(platformKey) {
    if (!PLATFORMS[platformKey]) {
        console.error('Invalid platform:', platformKey);
        showError(`Invalid platform: ${platformKey}`);
        return false;
    }
    
    if (REPO_CONFIG.currentPlatform === platformKey) {
        showInfo(`Already using ${PLATFORMS[platformKey].name}`);
        return true;
    }
    
    return switchPlatform(platformKey);
}

// Get URLs for all platforms
function getAllPlatformUrls(docId) {
    const shortPath = documentRegistry[docId];
    if (!shortPath) return null;
    
    const urls = {};
    for (const platformKey of Object.keys(PLATFORMS)) {
        urls[platformKey] = getPlatformUrl(platformKey, shortPath);
    }
    return urls;
}

// Get current platform status
function getPlatformStatus() {
    const platform = REPO_CONFIG.currentPlatform;
    return {
        platform: platform,
        platformName: PLATFORMS[platform]?.name || platform,
        failureCount: REPO_CONFIG.failureCount,
        maxFailures: REPO_CONFIG.maxFailuresBeforeSwitch,
        isSwitching: REPO_CONFIG.isSwitching,
        healthCache: { ...REPO_CONFIG.healthCheckCache }
    };
}

// Compatibility functions
function getAvailableDocuments() {
    return Object.keys(documentRegistry);
}

function getDocumentUrl(docId) {
    const shortPath = documentRegistry[docId];
    return shortPath ? getPlatformUrl(REPO_CONFIG.currentPlatform, shortPath) : null;
}

function getDocumentShortPath(docId) {
    return documentRegistry[docId];
}

function updateRepoConfig(newConfig) {
    Object.assign(REPO_CONFIG, newConfig);
    console.log('Repository configuration updated:', REPO_CONFIG);
    showInfo('Configuration updated');
}

function getCurrentPlatformInfo() {
    return {
        ...REPO_CONFIG,
        platformName: PLATFORMS[REPO_CONFIG.currentPlatform]?.name || REPO_CONFIG.currentPlatform
    };
}

function getDocumentsByCategory() {
    const categories = {
        'Base System': [
            'constitution', 'legal_dictionary', 'department_structure', 
            'agency_structure', 'tax_structure', 'law_making_process', 'governing_system'
        ],
        'Penal Code': [
            'criminal_cowardice', 'defense_and_liability', 'homicide'
        ],
        'Acts and Bills': [
            'secure_systems_act', 'adult_freedom_guarantor_act', 'universtal_sanitary_infrastructure_act',
            'hate_crime_enhancement_act', 'hate_symbol_evidence_act', 'social_compliance_act',
            'animal_testing_act', 'military_age_cognition_act', 'conversion_therapy_ban', 'responsible_carry'
        ],
        'Legal Framework': [
            'poetic_justice', 'proxicide_doctrine', 'privacy_and_surveilance', 'private_prisons',
            'tiered_self_defense_framework', 'defense_and_transferred_liability', 'the_last_landlord', 'housing',
            'what_is_a_theocrat', 'immigration_and_secularism', 'bodily_autonomy_and_public_health',
            'womens_autonomy', 'coerced_marriage', 'no_fault_divorce', 'romeo_and_juliet',
            'safe_emancipation_of_minors', 'citizens_branch', 'workers_branch',
            'scientific_branch', 'surgeon_court', 'historian_branch', 'historian_court',
            'covert_ops', 'conspiracy_framework', 'financial_conflicts', 'substance_over_form',
            'proportionate_fines', 'poisoned_chalice_provision', 'anti_corruption_architecture', 'civil_war_crimes',
            'retained_sovereignty'
        ],
        'Case Studies': [
            'highway_interceptor', 'hoa_vs_doe', 'oakwood_vs_vance',
            'petrov_vs_extradition', 'poisoned_chalic_doctrine', 'the_perpetual_tenancy',
            'thou_shalt_not_bear_false_witness', 'tiptoeing_the_voice_activated_minefield',
            'troll_kings_downfall'
        ],
        'Civil Acts': [
            'holocaust_denial'
        ],
        'Scenarios': [
            'anti_transphobic_showdown', 'atlas_dilemma', 'landlords_gambit', 'nathaniels_dilemma',
            'quarantine_dilemma', 'sterling_dilemma', 'case_of_two_schools',
            'groves_defense', 'mathematical_sentence', 'secular_defense'
        ]
    };
    
    return categories;
}

// Force refresh health checks
function refreshHealthChecks() {
    REPO_CONFIG.healthCheckCache = {};
    showInfo('Refreshing platform health checks...');
    return initializeLoader();
}

// Initialize document loader
async function initDocumentLoader() {
    try {
        // Initialize notification system
        initNotificationSystem();
        
        await initializeLoader();
        
        const initialDoc = window.location.hash.substring(1);
        if (initialDoc && documentRegistry[initialDoc]) {
            console.log(`Loading initial document from URL hash: ${initialDoc}`);
            setTimeout(() => {
                loadDocument(initialDoc);
            }, 500); // Small delay to ensure everything is ready
        } else {
            console.log('No initial document in URL hash');
        }
        
        return true;
    } catch (error) {
        console.error('Failed to initialize document loader:', error);
        showError('Failed to initialize document loader');
        return false;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        documentRegistry,
        PLATFORMS,
        REPO_CONFIG,
        loadDocument,
        setPlatform,
        getCurrentPlatformInfo,
        getAllPlatformUrls,
        getDocumentsByCategory,
        getPlatformStatus,
        refreshHealthChecks,
        initDocumentLoader,
        showNotification,
        showInfo,
        showSuccess,
        showWarning,
        showError,
        clearAllNotifications
    };
}
[file content end]