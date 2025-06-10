
const API_KEY =  'AIzaSyDM3Ve3MgtW44jf26AVBlOe-aHh9Dz6DMY';
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Load on page
window.onload = fetchPopularVideos;

async function fetchPopularVideos() {
  try {
    const res = await fetch(`${BASE_URL}/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=12&key=${API_KEY}`);
    const data = await res.json();

    if (!data.items) {
      console.error("API Error:", data);
      document.getElementById("video-container").innerHTML = "<p class='text-danger'>Unable to fetch videos. Check your API key and quota.</p>";
      return;
    }

    displayVideos(data.items);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}


function displayVideos(videos) {
  const container = document.getElementById("video-container");
  container.innerHTML = "";
  videos.forEach(video => {
    const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
    const views = video.statistics?.viewCount;
    const videoId = video.id;

    const videoCard = `
      <div class="col-md-4 col-sm-6">
        <div class="card video-card" onclick="playVideo('${videoId}')">
          <img src="${thumbnails.high.url}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text text-muted">${channelTitle}</p>
            <p class="card-text">${views ? views + ' views • ' : ''}${new Date(publishedAt).toDateString()}</p>
          </div>
        </div>
      </div>`;
    container.innerHTML += videoCard;
  });
}

function playVideo(videoId) {
  const container = document.getElementById("video-container");
  container.innerHTML = `
    <div class="col-12">
      <div class="ratio ratio-16x9">
        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>`;
}

async function searchVideos() {
  const query = document.getElementById("search-input").value;
  const res = await fetch(`${BASE_URL}/search?part=snippet&q=${query}&type=video&maxResults=12&key=${API_KEY}`);
  const data = await res.json();
  const videos = data.items.map(item => ({
    id: item.id.videoId,
    snippet: item.snippet,
    statistics: {}
  }));
  displayVideos(videos);
}

// Debounced suggestions
let debounceTimer;
document.getElementById("search-input").addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetchSuggestions(e.target.value);
  }, 300);
});

async function fetchSuggestions(query) {
  if (!query.trim()) {
    document.getElementById("suggestions").innerHTML = "";
    return;
  }
  const res = await fetch(`https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${query}`);
  const data = await res.json();
  const suggestionsBox = document.getElementById("suggestions");
  suggestionsBox.innerHTML = data[1]
    .map(s => `<div onclick="useSuggestion('${s}')">${s}</div>`)
    .join('');
}

function useSuggestion(value) {
  document.getElementById("search-input").value = value;
  document.getElementById("suggestions").innerHTML = "";
  searchVideos();
}
