
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Validation Functions
    function validateName(name) {
        // Require full name with at least two words, each starting with a capital letter
        const nameRegex = /^(?=[^@]*[a-zA-Z]{3,})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!name.trim()) {
            return 'Name is required';
        }
        if (name.trim().split(' ').length < 2) {
            return 'Please enter your full name (first and last name)';
        }
        if (!nameRegex.test(name)) {
            return 'Name should be in format: First Last or First Middle Last';
        }
        return '';
    }

    function validateEmail(email) {
        // Comprehensive email validation with domain corrections
        const commonEmailDomains = {
            'gmail': ['gmail.com', 'gamil.com', 'gmal.com', 'gmial.com', 'gmai.com'],
            'outlook': ['outlook.com', 'outloo.com', 'outlok.com', 'outloot.com'],
            'yahoo': ['yahoo.com', 'yaho.com', 'yahooo.com', 'yahho.com']
        };
    
        // Trim and convert to lowercase
        email = email.trim().toLowerCase();
    
        // Basic empty check
        if (!email) {
            return 'Email is required';
        }
    
        // Standard email regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        // If email passes standard validation, return success
        if (emailRegex.test(email)) {
            return '';
        }
    
        // Extract domain parts
        const parts = email.split('@');
        if (parts.length !== 2) {
            return 'Please enter a valid email address';
        }
    
        const [localPart, domain] = parts;
    
        // Check for common domain misspellings
        for (const [baseDomain, variations] of Object.entries(commonEmailDomains))
        {
            if (variations.includes(domain)) {
                // Suggest correction
                const correctedEmail = `${localPart}@${baseDomain}.com`;
                return `Did you mean: ${correctedEmail}? Please check your email address.`;
            }
        }
    
        // If no correction found
        return 'Please enter a valid email address';
    }
    
    // Example usage in form validation
    document.getElementById('email').addEventListener('blur', function() {
        const emailInput = this;
        const errorDiv = document.getElementById('emailError');
        const validationResult = validateEmail(emailInput.value);
        
        if (validationResult) {
            errorDiv.textContent = validationResult;
            emailInput.setCustomValidity(validationResult);
        } else {
            errorDiv.textContent = '';
            emailInput.setCustomValidity('');
        }
    });
    function validatePhone(phone) {
        // Phone validation for Indian numbers
        // Must start with +91 or 91, followed by a number starting with 9, 8, or 6
        const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
        
        if (!phone.trim()) {
            return 'Phone number is required';
        }
        
        // Remove any spaces or dashes
        const cleanedPhone = phone.replace(/[\s-]/g, '');
        
        if (!phoneRegex.test(cleanedPhone)) {
            return 'Please enter a valid Indian phone number (starts with 9, 8, or 6)';
        }
        return '';
    }

    function validatePassword(password) {
        // Strong password requirements
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!password.trim()) {
            return 'Password is required';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!passwordRegex.test(password)) {
            return 'Password must include uppercase, lowercase, number, and special character';
        }
        return '';
    }

    function validateConfirmPassword(password, confirmPassword) {
        if (!confirmPassword.trim()) {
            return 'Please confirm your password';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
        return '';
    }

    // Real-time Validation
    function addValidation(input, errorElement, validationFunction) {
        input.addEventListener('input', function() {
            const errorMessage = validationFunction(input.value);
            errorElement.textContent = errorMessage;
            
            if (errorMessage) {
                input.classList.add('input-error');
            } else {
                input.classList.remove('input-error');
            }
        });
    }

    // Add real-time validations
    addValidation(nameInput, nameError, validateName);
    addValidation(emailInput, emailError, validateEmail);
    addValidation(phoneInput, phoneError, validatePhone);
    addValidation(passwordInput, passwordError, validatePassword);
    addValidation(confirmPasswordInput, confirmPasswordError, 
        () => validateConfirmPassword(passwordInput.value, confirmPasswordInput.value)
    );

    // Form Submission Validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const nameErrorMsg = validateName(nameInput.value);
        const emailErrorMsg = validateEmail(emailInput.value);
        const phoneErrorMsg = validatePhone(phoneInput.value);
        const passwordErrorMsg = validatePassword(passwordInput.value);
        const confirmPasswordErrorMsg = validateConfirmPassword(
            passwordInput.value, 
            confirmPasswordInput.value
        );

        // Display errors
        nameError.textContent = nameErrorMsg;
        emailError.textContent = emailErrorMsg;
        phoneError.textContent = phoneErrorMsg;
        passwordError.textContent = passwordErrorMsg;
        confirmPasswordError.textContent = confirmPasswordErrorMsg;

        // Add/remove error classes
        nameInput.classList.toggle('input-error', !!nameErrorMsg);
        emailInput.classList.toggle('input-error', !!emailErrorMsg);
        phoneInput.classList.toggle('input-error', !!phoneErrorMsg);
        passwordInput.classList.toggle('input-error', !!passwordErrorMsg);
        confirmPasswordInput.classList.toggle('input-error', !!confirmPasswordErrorMsg);

        // Check if form is valid
        if (!nameErrorMsg && !emailErrorMsg && !phoneErrorMsg && 
            !passwordErrorMsg && !confirmPasswordErrorMsg) {
            // Form is valid - you can submit to backend here
            alert('Form submitted successfully!');
            // Typically, you would send the data to a server
            console.log('Form Data:', {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                password: passwordInput.value
            });
        }
    });
});