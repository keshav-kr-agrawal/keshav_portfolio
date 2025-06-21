document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Initialize EmailJS - Replace with your actual keys
        emailjs.init("ll94S6r0aTGj2-Lst"); 

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const submitBtn = document.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Replace with your actual Service ID and Template ID
            emailjs.send("service_29byjjm", "template_vnmv3la", {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_name: "Keshav Kumar Agrawal",
                to_email: "keshavagrawal2004@gmail.com"
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'Thank you for reaching out. I will get back to you soon.',
                    confirmButtonColor: '#6be766',
                    background: '#343a40',
                    color: '#ffffff'
                });
                contactForm.reset();
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again.',
                    confirmButtonColor: '#6be766',
                    background: '#343a40',
                    color: '#ffffff'
                });
                console.error('EmailJS Error:', error);
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
}); 