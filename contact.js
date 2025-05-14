document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
        .then(function() {
            // Show success message
            alert('Message sent successfully!');
            // Reset form
            document.getElementById('contact-form').reset();
        })
        .catch(function(error) {
            // Show error message
            alert('Failed to send message. Please try again.');
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
});