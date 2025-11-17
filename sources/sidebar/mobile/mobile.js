// Mobile navigation handler
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if (mobileMenuToggle && sidebar) {
        // Toggle sidebar on mobile
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
            sidebarOverlay.classList.toggle('active');
        });
        
        // Close sidebar when overlay is clicked
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('mobile-open');
            sidebarOverlay.classList.remove('active');
        });
        
        // Close sidebar when a link is clicked (on mobile) - EXCEPT dropdown toggle
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't close sidebar if clicking dropdown toggle
                if (this.classList.contains('dropdown-toggle')) {
                    e.stopPropagation(); // Prevent the click from closing the sidebar
                    return;
                }
                
                // Only close sidebar for regular links (not dropdown items)
                if (!this.closest('.dropdown-menu') && window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-open');
                    sidebarOverlay.classList.remove('active');
                }
            });
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('mobile-open');
            sidebarOverlay.classList.remove('active');
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
