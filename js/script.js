document.getElementById('search-button').addEventListener('click', function () {
    const searchBox = document.getElementById('search-box');
    searchValue = searchBox.value;
    searchBox.value = '';
    getResult(searchValue);
});

const getResult = async (searchValue) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();
    displayResult(data);
}

const getSingleResult = async (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    return data;
}

const displayResult = data => {
    const searchResults = document.getElementById('search-results');
    data.data.forEach(async (element) => {
        const singleData = await getSingleResult(element.slug);
        const div = document.createElement('div');
        div.classList.add('col');
        let releaseDate;
        if (!singleData.data.releaseDate || singleData.data.releaseDate == '') {
            releaseDate = 'No Release Date Availbale';
        }
        else {
            releaseDate = singleData.data.releaseDate;
        }
        const searchResult = `
                    <div class="card h-100">
                        <img src="${element.image}"
                            class="card-img-top w-50 mx-auto py-3" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${element.brand} ${element.phone_name}</h5>
                            <p class="text-black-50">${releaseDate}</p>
                            <p class="card-text">
                            <b>Chipset:</b> ${singleData.data.mainFeatures.chipSet}<br>
                            <b>Display:</b> ${singleData.data.mainFeatures.displaySize}<br>
                            <b>Memory:</b> ${singleData.data.mainFeatures.memory}<br>
                            <b>Storage:</b> ${singleData.data.mainFeatures.storage}<br>
                            </p>
                        </div>
                        <div class="m-3 text-end">
                            <button id="details-button" class="btn btn-primary">Explore</button>
                        </div>
                    </div>
        `;
        div.innerHTML = searchResult;
        searchResults.appendChild(div);
    });
}