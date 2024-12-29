const api = 'AIzaSyADj8nY1JheHT0BhF7zadkX9hMavNWolYc';

// פונקציה כללית לעדכון נתוני ערוץ
function updateChannelData(channelId, prefix) {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${api}`;

    window.fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`הבעיה היא: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const stats = data.items[0].statistics;
            const snippet = data.items[0].snippet;

            document.getElementById(`subscribers${prefix}`).textContent = stats.subscriberCount;
            document.getElementById(`views${prefix}`).textContent = stats.viewCount;
            document.getElementById(`videos${prefix}`).textContent = stats.videoCount;

            document.getElementById(`channelName${prefix}`).textContent = snippet.title;
            document.getElementById(`channelDescription${prefix}`).textContent = snippet.description;
            document.getElementById(`channelImage${prefix}`).src = snippet.thumbnails.default.url;
        })
        .catch(error => {
            console.error(`Error fetching YouTube API data for ${prefix}:`, error);

            // עדכון השגיאות לכל האלמנטים של הערוץ
            document.getElementById(`subscribers${prefix}`).textContent = 'Error';
            document.getElementById(`views${prefix}`).textContent = 'Error';
            document.getElementById(`videos${prefix}`).textContent = 'Error';
            document.getElementById(`channelName${prefix}`).textContent = 'Error';
            document.getElementById(`channelDescription${prefix}`).textContent = 'Error';
            document.getElementById(`channelImage${prefix}`).src = 'Error';
        });
}

// קריאה לפונקציה עבור הערוץ
updateChannelData('UCrE9ET5Uuteg8mw5oVCxP6w', 'OferSheli');
