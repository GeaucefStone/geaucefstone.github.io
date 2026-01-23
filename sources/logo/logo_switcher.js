/**
 * Logo Switcher Module
 * Automatically changes the logo based on the current month
 * - February: Black History Month logo
 * - June: Pride Month logo
 * - Other months: Default logo
 * 
 * This module is completely self-contained and has no dependencies.
 */

(function() {
    'use strict';
    
    // Configuration - update these paths to match your actual logo URLs
    const LOGO_CONFIG = {
        default: {
            url: 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/main/contents/images/phoenix.svg',
            alt: 'Secular Democratic Republic Logo'
        },
        bhm: {
            url: 'sources/logo/images/phoenix_bhm.png',
            alt: 'Black History Month - Secular Democratic Republic Logo'
        },
        pride: {
            url: 'sources/logo/images/phoenix_pride.png',
            alt: 'Pride Month - Secular Democratic Republic Logo'
        }
    };
    
    // Month mapping (0 = January, 1 = February, etc.)
    const MONTH_MAP = {
        1: 'bhm',  // February
        5: 'pride' // June
    };
    
    /**
     * Get the appropriate logo configuration for the current month
     * @returns {Object} Logo configuration object
     */
    function getLogoForCurrentMonth() {
        const currentMonth = new Date().getMonth();
        const logoKey = MONTH_MAP[currentMonth] || 'default';
        return LOGO_CONFIG[logoKey];
    }
    
    /**
     * Update the logo element with the appropriate image
     */
    function updateLogo() {
        const logoElement = document.querySelector('.logo');
        
        if (!logoElement) {
            console.warn('[LogoSwitcher] Logo element not found');
            return false;
        }
        
        const logoConfig = getLogoForCurrentMonth();
        const currentSrc = logoElement.src;
        const newSrc = logoConfig.url;
        
        // Only update if the src is different
        if (currentSrc !== newSrc) {
            logoElement.src = newSrc;
            logoElement.alt = logoConfig.alt;
            
            // Add a data attribute for styling/identification
            logoElement.dataset.logoType = Object.keys(MONTH_MAP).find(
                month => MONTH_MAP[month] === (MONTH_MAP[new Date().getMonth()] || 'default')
            ) ? MONTH_MAP[new Date().getMonth()] : 'default';
            
            console.log(`[LogoSwitcher] Logo updated to: ${logoConfig.alt}`);
            return true;
        }
        
        return false;
    }
    
    /**
     * Initialize the logo switcher
     */
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updateLogo);
        } else {
            updateLogo();
        }
        
        console.log('[LogoSwitcher] Initialized');
    }
    
    /**
     * Public API for testing and manual control
     */
    window.LogoSwitcher = {
        /**
         * Manually set logo by month number (0-11)
         * @param {number} month - Month number (0 = January, 1 = February, etc.)
         */
        setLogoByMonth: function(month) {
            const logoElement = document.querySelector('.logo');
            if (!logoElement) return false;
            
            const logoKey = MONTH_MAP[month] || 'default';
            const logoConfig = LOGO_CONFIG[logoKey];
            
            if (logoConfig) {
                logoElement.src = logoConfig.url;
                logoElement.alt = logoConfig.alt;
                logoElement.dataset.logoType = logoKey;
                return true;
            }
            
            return false;
        },
        
        /**
         * Set logo by type
         * @param {string} type - 'default', 'bhm', or 'pride'
         */
        setLogoByType: function(type) {
            const logoElement = document.querySelector('.logo');
            if (!logoElement) return false;
            
            const logoConfig = LOGO_CONFIG[type];
            if (logoConfig) {
                logoElement.src = logoConfig.url;
                logoElement.alt = logoConfig.alt;
                logoElement.dataset.logoType = type;
                return true;
            }
            
            return false;
        },
        
        /**
         * Reset to default logo
         */
        resetToDefault: function() {
            const logoElement = document.querySelector('.logo');
            if (!logoElement) return false;
            
            logoElement.src = LOGO_CONFIG.default.url;
            logoElement.alt = LOGO_CONFIG.default.alt;
            logoElement.dataset.logoType = 'default';
            return true;
        },
        
        /**
         * Get current logo configuration
         */
        getCurrentLogo: function() {
            const logoElement = document.querySelector('.logo');
            if (!logoElement) return null;
            
            const currentSrc = logoElement.src;
            for (const [key, config] of Object.entries(LOGO_CONFIG)) {
                if (config.url === currentSrc) {
                    return { type: key, ...config };
                }
            }
            
            return null;
        },
        
        /**
         * Get logo configuration for a specific month
         * @param {number} month - Month number (0-11)
         */
        getLogoForMonth: function(month) {
            const logoKey = MONTH_MAP[month] || 'default';
            return LOGO_CONFIG[logoKey];
        }
    };
    
    // Auto-initialize
    init();
    
})();
