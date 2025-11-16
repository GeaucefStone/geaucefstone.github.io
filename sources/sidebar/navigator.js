// Navigation handler - uses the file loader
document.addEventListener('DOMContentLoaded', function() {
    // Initialize document loader
    initDocumentLoader();
    
    // Set up dropdown toggle functionality
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            dropdownMenu.classList.toggle('active');
        });
    }
    
    // Set up sidebar click handlers for all links (including dropdown items)
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default for dropdown toggle
            if (this.classList.contains('dropdown-toggle')) {
                return;
            }
            
            e.preventDefault();
            const docId = this.getAttribute('href').substring(1); // Remove #
            
            // Use the file loader to load the document
            if (loadDocument(docId)) {
                // Update active state for all links
                document.querySelectorAll('.sidebar-menu a').forEach(a => {
                    a.classList.remove('active');
                    // Remove active state from dropdown parent if this is a dropdown item
                    if (a.classList.contains('dropdown-toggle') && this.closest('.dropdown-menu')) {
                        a.classList.remove('active');
                    }
                });
                
                // Add active state to clicked link
                this.classList.add('active');
                
                // If this is a dropdown item, also activate the dropdown toggle
                if (this.closest('.dropdown-menu')) {
                    const parentDropdown = this.closest('.dropdown');
                    const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
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
                parentDropdown.classList.add('active');
                const dropdownToggle = parentDropdown.previousElementSibling;
                if (dropdownToggle && dropdownToggle.classList.contains('dropdown-toggle')) {
                    dropdownToggle.classList.add('active');
                }
            }
        }
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
                parentDropdown.classList.add('active');
                const dropdownToggle = parentDropdown.previousElementSibling;
                if (dropdownToggle && dropdownToggle.classList.contains('dropdown-toggle')) {
                    dropdownToggle.classList.add('active');
                }
            }
        }
    }
});
