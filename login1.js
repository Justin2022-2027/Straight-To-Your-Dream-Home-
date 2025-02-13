document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Validate Email
    function validateEmail(email) {
        // Comprehensive email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!email.trim()) {
            return 'Email is required';
        }
        
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        
        return '';
    }

    // Validate Password
    function validatePassword(password) {
        // Basic password validation
        if (!password.trim()) {
            return 'Password is required';
        }
        
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        
        return '';
    }

    // Create or get error message element
    function getOrCreateErrorElement(inputElement) {
        let errorElement = inputElement.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '5px';
            inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }
        return errorElement;
    }

    // Remove error styling
    function clearError(inputElement) {
        inputElement.style.borderColor = '#ddd';
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    }

    // Show error
    function showError(inputElement, message) {
        inputElement.style.borderColor = 'red';
        const errorElement = getOrCreateErrorElement(inputElement);
        errorElement.textContent = message;
    }

    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        clearError(this);
        const error = validateEmail(this.value);
        if (error) {
            showError(this, error);
        }
    });

    // Real-time validation for password
    passwordInput.addEventListener('input', function() {
        clearError(this);
        const error = validatePassword(this.value);
        if (error) {
            showError(this, error);
        }
    });

    // Form submission validation
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate email and password
        const emailError = validateEmail(emailInput.value);
        const passwordError = validatePassword(passwordInput.value);

        // Clear previous errors
        [emailInput, passwordInput].forEach(clearError);

        // Show errors if any
        if (emailError) {
            showError(emailInput, emailError);
        }
        
        if (passwordError) {
            showError(passwordInput, passwordError);
        }

        // Check if form is valid
        if (!emailError && !passwordError) {
            // Simulate login process
            // In a real application, you would typically send a request to a backend server
            try {
                // Simulated login logic
                console.log('Login attempt with:', {
                    email: emailInput.value,
                    password: passwordInput.value
                });

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.textContent = 'Login Successful!';
                successMessage.style.color = 'green';
                successMessage.style.marginTop = '10px';
                form.appendChild(successMessage);

                // Optional: redirect after successful login
                // window.location.href = 'dashboard.html';
            } catch (error) {
                // Handle login error
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'Login Failed. Please try again.';
                errorMessage.style.color = 'red';
                errorMessage.style.marginTop = '10px';
                form.appendChild(errorMessage);
            }
        }
    });
});