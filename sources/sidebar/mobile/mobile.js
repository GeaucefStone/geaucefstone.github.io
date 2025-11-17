// Mobile table wrapping only - all navigation moved to navigator.js
document.addEventListener('DOMContentLoaded', function() {
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
