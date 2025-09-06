// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Add smooth scrolling to nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Gallery tabs functionality (simplified for single tab)
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Keep existing functionality for potential future expansion
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        const targetContent = document.getElementById(tabId + '-tab');
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// 3D Viewer Modal functionality
const modal = document.getElementById('viewer-modal');
const viewerContent = document.getElementById('viewer-content');
const viewerTitle = document.getElementById('viewer-title');
const room3D = document.getElementById('room-3d');

let currentRotation = 0;
let isWireframe = false;

function open3DViewer(roomType) {
    const roomNames = {
        's1': 'S1 - Modern Living Space 3D View',
        's2': 'S2 - Luxury Kitchen 3D View',
        's3': 'S3 - Master Bedroom 3D View',
        's4': 'S4 - Executive Office 3D View',
        's5': 'S5 - Dining Area 3D View'
    };
    
    viewerTitle.textContent = roomNames[roomType] || '3D Design Viewer';
    room3D.textContent = roomType.toUpperCase();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function rotateView(direction) {
    currentRotation += direction === 'left' ? -45 : 45;
    room3D.style.transform = `translateY(-20px) rotateY(${currentRotation}deg)`;
}

function toggleWireframe() {
    isWireframe = !isWireframe;
    if (isWireframe) {
        room3D.style.background = 'transparent';
        room3D.style.border = '2px solid #667eea';
        room3D.style.color = '#667eea';
    } else {
        room3D.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        room3D.style.border = 'none';
        room3D.style.color = 'white';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Before/After slider functionality
function initBeforeAfterSlider() {
    const slider = document.getElementById('slider1');
    const handle = document.getElementById('handle1');
    const after = slider.querySelector('.after');
    
    let isDragging = false;
    
    function updateSlider(x) {
        const rect = slider.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
        
        handle.style.left = percentage + '%';
        after.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
    
    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateSlider(e.clientX);
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    slider.addEventListener('click', (e) => {
        if (!isDragging) {
            updateSlider(e.clientX);
        }
    });
    
    // Touch events for mobile
    handle.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            updateSlider(e.touches[0].clientX);
        }
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// Contact functionality now handled by mailto links
// No form processing needed as we're using direct email links

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const service = card.getAttribute('data-service');
        if (service === '3d') {
            card.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))';
        } else if (service === '2d') {
            card.style.background = 'linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))';
        } else {
            card.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(245, 87, 108, 0.05))';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.background = 'white';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cube = document.getElementById('cube');
    const nav = document.querySelector('nav');
    
    // Parallax cube rotation
    if (cube) {
        cube.style.transform = `rotateX(${scrolled * 0.1}deg) rotateY(${scrolled * 0.1}deg)`;
    }
    
    // Navbar background opacity
    if (scrolled > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

function openImage(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = src;
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function initImageModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.image-modal-close');
    
    if (closeBtn) closeBtn.addEventListener('click', closeImageModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeImageModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeImageModal();
    });
}

// Initialize components when page loads
document.addEventListener('DOMContentLoaded', () => {
    initBeforeAfterSlider();
    initImageModal();
    
    // Add loading animation to gallery items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe gallery items for scroll animations
    document.querySelectorAll('.gallery-item, .service-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// Add some interactive 3D effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

// Easter egg: Konami code for special 3D effect
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Activate special 3D mode
        document.body.style.transform = 'perspective(1000px) rotateX(5deg)';
        document.body.style.transformStyle = 'preserve-3d';
        
        setTimeout(() => {
            document.body.style.transform = 'none';
            document.body.style.transformStyle = 'flat';
        }, 3000);
        
        alert('🎉 Special 3D mode activated! Interior ATS - Where design meets innovation!');
        konamiCode = [];
    }
});