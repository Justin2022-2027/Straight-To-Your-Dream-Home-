
document.getElementById('propertyImages').addEventListener('change', function(event) {
    const files = event.target.files;
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = ''; // Clear previous previews

    if (files.length > 10) {
        alert('You can upload a maximum of 10 images.');
        event.target.value = ''; // Clear the file input
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            imagePreview.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById('propertyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('submit_property.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Property submitted successfully!');
            document.getElementById('propertyForm').reset();
            document.getElementById('imagePreview').innerHTML = '';
        } else {
            alert('There was an error submitting the property.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});