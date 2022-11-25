const API =
  'https://youtube-v31.p.rapidapi.com/search?channelId=UCFnXTeBpJRPSN6QmWz_uDgQ&part=snippet%2Cid&order=date&maxResults=50';

const content = null || document.getElementById('content');

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '33f6ae68acmsh14d2115aa02455fp147ec8jsn0c68e81d1434',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
    ${videos.items
      .map(
        (video) => `
        <div class="group relative cursor-pointer">
          <a href="https://youtu.be/${video.id.videoId}" target="_blank">
            <div
              class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
            >
              <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
              </h3>
            </div>
          </a>
        </div>
      `
      )
      .slice(0, 8)
      .join('')}
    `;
    content.innerHTML = view;
  } catch (err) {
    console.error(err);
  }
})();
