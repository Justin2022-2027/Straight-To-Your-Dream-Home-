// feedback.js

// Add click events to stars
document.querySelectorAll('.stars span').forEach((star) => {
    star.addEventListener('click', (e) => {
      const rating = e.target.getAttribute('data-value');
      document.querySelectorAll('.stars span').forEach((s, index) => {
        s.classList.toggle('active', index < rating);
      });
    });
  });
  
  function submitFeedback() {
    const selectedStars = document.querySelectorAll('.stars span.active').length;
    const feedbackText = document.getElementById('feedback').value;
  
    if (selectedStars === 0) {
      alert('Please select a star rating.');
      return;
    }
  
    if (!feedbackText.trim()) {
      alert('Please provide feedback in the text area.');
      return;
    }
  
    // Display thank you message
    document.getElementById('thankYouMessage').classList.remove('hidden');
  
    // Clear inputs after submission
    document.getElementById('feedback').value = '';
    document.querySelectorAll('.stars span').forEach((star) => star.classList.remove('active'));
  }
  