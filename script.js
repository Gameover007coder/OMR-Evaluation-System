// Utility functions for drag and drop
function setupDragAndDrop(dropZone, fileInput, previewImage, processButton) {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#3498db';
        dropZone.style.backgroundColor = '#edf7fd';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#ccc';
        dropZone.style.backgroundColor = '#f9f9f9';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ccc';
        dropZone.style.backgroundColor = '#f9f9f9';
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            fileInput.files = e.dataTransfer.files;
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                processButton.disabled = false;
            }
            
            reader.readAsDataURL(e.dataTransfer.files[0]);
        }
    });
}

// Check authentication on page load
function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (!token && !window.location.href.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// Initialize tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Format score with color
function formatScore(score, max) {
    const percentage = (score / max) * 100;
    let color = 'danger';
    
    if (percentage >= 80) color = 'success';
    else if (percentage >= 60) color = 'warning';
    
    return `<span class="text-${color}">${score}/${max}</span>`;
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initTooltips();
});