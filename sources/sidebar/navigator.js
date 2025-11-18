// Navigation handler - uses the file loader
document.addEventListener('DOMContentLoaded', function() {
    // Initialize document loader
    initDocumentLoader();
    
    // Get elements
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    
    // Mobile sidebar toggle
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
            sidebarOverlay.classList.toggle('active');
        });
        
        // Close sidebar when overlay is clicked
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('mobile-open');
            sidebarOverlay.classList.remove('active');
        });
    }
    
    // Dropdown functionality for ALL dropdowns
    dropdownToggles.forEach((dropdownToggle, index) => {
        const dropdownMenu = dropdownMenus[index];
        
        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all other dropdowns
                dropdownToggles.forEach((otherToggle, otherIndex) => {
                    if (otherToggle !== this) {
                        otherToggle.classList.remove('active');
                        dropdownMenus[otherIndex].classList.remove('active');
                    }
                });
                
                // Toggle this dropdown
                this.classList.toggle('active');
                dropdownMenu.classList.toggle('active');
            });
        }
    });
    
    // Prevent dropdown menu clicks from closing the dropdowns
    dropdownMenus.forEach(dropdownMenu => {
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Close dropdowns when clicking outside of them
    document.addEventListener('click', function(e) {
        let clickedOutsideAllDropdowns = true;
        
        dropdownToggles.forEach((dropdownToggle, index) => {
            const dropdownMenu = dropdownMenus[index];
            const isClickInsideDropdown = dropdownToggle.contains(e.target) || dropdownMenu.contains(e.target);
            
            if (isClickInsideDropdown) {
                clickedOutsideAllDropdowns = false;
            } else {
                dropdownToggle.classList.remove('active');
                dropdownMenu.classList.remove('active');
            }
        });
    });
    
    // Set up sidebar click handlers for all links (including dropdown items)
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Handle dropdown toggle separately
            if (this.classList.contains('dropdown-toggle')) {
                return; // Already handled above
            }
            
            e.preventDefault();
            const docId = this.getAttribute('href').substring(1);
            
            // Use the file loader to load the document
            if (loadDocument(docId)) {
                // Update active state for all links
                document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
                
                // If this is a dropdown item, also activate the dropdown toggle
                if (this.closest('.dropdown-menu')) {
                    const parentDropdown = this.closest('.dropdown');
                    const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
                        // Also open the dropdown menu
                        const dropdownMenu = parentDropdown.querySelector('.dropdown-menu');
                        if (dropdownMenu) {
                            dropdownMenu.classList.add('active');
                        }
                    }
                }
                
                // Close mobile sidebar if on mobile (but NOT for dropdown toggle)
                if (window.innerWidth <= 768 && !this.classList.contains('dropdown-toggle')) {
                    if (sidebar && sidebarOverlay) {
                        sidebar.classList.remove('mobile-open');
                        sidebarOverlay.classList.remove('active');
                    }
                }
            }
        });
    });

    // Set initial active state based on URL hash
    const initialDoc = window.location.hash.substring(1);
    if (initialDoc) {
        document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="#${initialDoc}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // If active link is in dropdown, open the dropdown
            const parentDropdown = activeLink.closest('.dropdown-menu');
            if (parentDropdown) {
                const dropdown = parentDropdown.closest('.dropdown');
                if (dropdown) {
                    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownToggle && dropdownMenu) {
                        dropdownToggle.classList.add('active');
                        dropdownMenu.classList.add('active');
                    }
                }
            }
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (sidebar && sidebarOverlay) {
                sidebar.classList.remove('mobile-open');
                sidebarOverlay.classList.remove('active');
            }
        }
    });
    
    // Wrap tables for mobile scrolling
    function wrapTablesForMobile() {
        document.querySelectorAll('#markdown-output table').forEach(table => {
            if (!table.parentElement.classList.contains('table-container')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-container';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
    }
    
    // Observe for content changes to wrap new tables
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                wrapTablesForMobile();
            }
        });
    });
    
    const markdownOutput = document.getElementById('markdown-output');
    if (markdownOutput) {
        observer.observe(markdownOutput, {
            childList: true,
            subtree: true
        });
        
        // Initial wrap
        wrapTablesForMobile();
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const docId = window.location.hash.substring(1);
    if (docId) {
        loadDocument(docId);
        document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="#${docId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // If active link is in dropdown, open the dropdown
            const parentDropdown = activeLink.closest('.dropdown-menu');
            if (parentDropdown) {
                const dropdown = parentDropdown.closest('.dropdown');
                if (dropdown) {
                    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownToggle && dropdownMenu) {
                        dropdownToggle.classList.add('active');
                        dropdownMenu.classList.add('active');
                    }
                }
            }
        }
    }
});