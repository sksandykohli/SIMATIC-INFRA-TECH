// Contact Form Handling

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Form submission handler
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        industry: document.getElementById('industry').value,
        message: document.getElementById('message').value,
        consent: document.getElementById('consent').checked
    };
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-button');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (Replace with actual backend API call)
    try {
        // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success message
        showMessage('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Send email using mailto (temporary solution)
        // This will open user's email client
        // sendEmailFallback(formData);
        
    } catch (error) {
        // Error message
        showMessage('error', 'Oops! Something went wrong. Please try again or contact us directly via phone/email.');
        console.error('Form submission error:', error);
    } finally {
        // Reset button
        btnText.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Form validation
function validateForm(data) {
    // Check required fields
    if (!data.name.trim()) {
        showMessage('error', 'Please enter your name');
        return false;
    }
    
    if (!data.email.trim()) {
        showMessage('error', 'Please enter your email address');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showMessage('error', 'Please enter a valid email address');
        return false;
    }
    
    if (!data.phone.trim()) {
        showMessage('error', 'Please enter your phone number');
        return false;
    }
    
    if (!data.subject) {
        showMessage('error', 'Please select a subject');
        return false;
    }
    
    if (!data.message.trim()) {
        showMessage('error', 'Please enter your message');
        return false;
    }
    
    if (!data.consent) {
        showMessage('error', 'Please agree to receive communications');
        return false;
    }
    
    return true;
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show message
function showMessage(type, message) {
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = message;
    formMessage.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Fallback email send (opens email client)
function sendEmailFallback(data) {
    const subject = encodeURIComponent(`${data.subject} - ${data.name}`);
    const body = encodeURIComponent(`
Name: ${data.name}
Company: ${data.company || 'N/A'}
Email: ${data.email}
Phone: ${data.phone}
Industry: ${data.industry || 'N/A'}

Message:
${data.message}
    `);
    
    // This will open the user's default email client
    // window.location.href = `mailto:simaticinfratch@gmail.com?subject=${subject}&body=${body}`;
}

// Phone number formatting (optional)
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Format: +91 XXXXX XXXXX
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    if (value.length > 5) {
        value = value.substring(0, 5) + ' ' + value.substring(5);
    }
    
    e.target.value = value;
});

// Real-time validation feedback
const formInputs = contactForm.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary)';
        formMessage.style.display = 'none';
    });
});

// ======================================
// BACKEND INTEGRATION GUIDE
// ======================================
/*
To connect this form to your backend:

1. PHP Backend Example:
   - Create contact.php file
   - Use $_POST to get form data
   - Send email using mail() or PHPMailer
   - Return JSON response

2. Node.js Backend Example:
   - Create Express route
   - Use nodemailer to send email
   - Return JSON response

3. Replace the fetch call above with:

fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        showMessage('success', data.message);
        contactForm.reset();
    } else {
        showMessage('error', data.message);
    }
})
.catch(error => {
    showMessage('error', 'Something went wrong. Please try again.');
});

4. Email Services:
   - SendGrid
   - Mailgun
   - Amazon SES
   - Gmail SMTP

5. Form Services (No Backend Required):
   - Formspree.io
   - Netlify Forms
   - Web3Forms
   - Basin

Example with Formspree:
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
*/