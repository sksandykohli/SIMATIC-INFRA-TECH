// Projects Filter Functionality

// Get all filter buttons and project cards
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Add click event to each filter button
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Animation for fade in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// View Details Button Functionality (Optional)
const viewBtns = document.querySelectorAll('.view-btn');
viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Add your modal or detail page functionality here
        alert('Project details will open here. You can implement a modal or redirect to detail page.');
    });
});