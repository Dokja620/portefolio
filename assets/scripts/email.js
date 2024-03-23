document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contact-form');
    const successPopup = document.getElementById('success-popup');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('service_ykwpmys', 'template_lvki7vp', form)
            .then(
                () => {
                    successPopup.style.display = 'flex';
                    setTimeout(() => {
                        successPopup.style.display = 'none';
                    }, 3000);
                    form.reset(); // Reset the form after 3 seconds
                },
                error => console.log('FAILED...', error)
            );
    });
});

// Initialize EmailJS with your public key
emailjs.init({
    publicKey: "WdmigWlXIQIc_Vsc1",
});