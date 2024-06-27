document.getElementById('capture').addEventListener('click', function() {
    const video = document.getElementById('video-feed');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.width;
    canvas.height = video.height;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL('image/jpeg');
    fetch('/detect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({image: dataURL})
    })
    .then(response => response.json())
    .then(data => {
        if (data.image) {
            const img = new Image();
            img.src = 'data:image/jpeg;base64,' + data.image;
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '';
            resultDiv.appendChild(img);
        } else {
            alert(data.posture);
        }
    })
    .catch(error => console.error('Error:', error));
});
