document.getElementById('search').addEventListener('click', function() {
    const artist = document.getElementById('artist').value.trim();
    const song = document.getElementById('song').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (!artist || !song) {
        resultDiv.innerHTML = '<div class="error">Please enter both artist and song name</div>';
        return;
    }
    
    // Show loading animation
    resultDiv.innerHTML = `
        <div class="loading">
            <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="loading-text">Searching for lyrics...</div>
        </div>
    `;
    
    fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Lyrics not found');
            }
            return response.json();
        })
        .then(data => {
            if (data.lyrics) {
                resultDiv.innerHTML = `
                    <h2 class="lyrics-title">${song} by ${artist}</h2>
                    <div>${data.lyrics.replace(/\n/g, '<br>')}</div>
                `;
            } else {
                throw new Error('Lyrics not found');
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<div class="error">${error.message}</div>`;
        });
});

document.getElementById('song').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('search').click();
    }
});
