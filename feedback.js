// feedback.js
document.getElementById('feedbackForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const comment = document.getElementById('comment').value;

  // Simple check for abusive words
  const abusiveWords = ['f**up', 'fing', 'bulls***', 's***hole','b****','dumba','fuck you','bastard','fool','d***','c***']; // Add more words as needed
  const containsAbuse = abusiveWords.some(word => comment.toLowerCase().includes(word));

  if (containsAbuse) {
      alert('Your feedback contains inappropriate and abusive language. Please revise your comment.');
      return;
  }
  else {
      alert('Thank You for your valuable feedback!');
  }
  // Send data to server
  fetch('feedback.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Thank you for your feedback!');
          document.getElementById('feedbackForm').reset();
      } else {
          alert('There was an error submitting your feedback.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});