const toggleSpinner = (display) => {
    const spinnerDiv = document.getElementById('spinner');
    spinnerDiv.style.display = display;

}
const toggleNoResult = (display) => {
    const spinner = document.getElementById('no-result');
    spinner.style.display = display;
}

toggleSpinner('none');
toggleNoResult('none');


document.getElementById('search-button').addEventListener('click', function () {
    const searchBox = document.getElementById('search-box');
    searchValue = searchBox.value;
    searchBox.value = '';
    getResult(searchValue);
});


const getResult = async (searchValue) => {
    toggleSpinner('block');
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
    const detailsModal = document.getElementById('details-section');
    searchResults.innerHTML = '';
    const newData = data.data.slice(0, 20);
    if (!data.status) {
        toggleNoResult('block');
        toggleSpinner('none');
    }
    else {
        toggleNoResult('none');
        newData.forEach(async (element) => {
            const singleData = await getSingleResult(element.slug);
            const div = document.createElement('div');
            const modalDiv = document.createElement('div');
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
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#${element.slug}">
                            Explore
                        </button>
                        </div>
                        
                    </div>
        `;
            const modals = `
                <div class="modal fade" id="${element.slug}" tabindex="-1" aria-labelledby="${element.slug}Label"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${element.slug}Label">${element.brand} ${element.phone_name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                                <div class="row">
                                    <div class="col-5 justify-content-center align-items-center">
                                        <img src="${element.image}"
                                            class="card-img-top w-75 mx-auto py-3 img-fluid" alt="...">
                                    </div>
                                    <div class="col-7">
                                        <h5>Specifications</h5>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Features</th>
                                                    <th scope="col">Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Chipset</th>
                                                    <td>${singleData.data.mainFeatures.chipSet}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Display</th>
                                                    <td>${singleData.data.mainFeatures.displaySize}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Memory</th>
                                                    <td>${singleData.data.mainFeatures.memory}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Storage</th>
                                                    <td>${singleData.data.mainFeatures.storage}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Sensors</th>
                                                    <td>${singleData.data.mainFeatures.sensors}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Wi-Fi</th>
                                                    <td>${singleData.data.others.WLAN}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Bluetooth</th>
                                                    <td>${singleData.data.others.Bluetooth}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">GPS</th>
                                                    <td>${singleData.data.others.GPS}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">NFC</th>
                                                    <td>${singleData.data.others.NFC}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Radio</th>
                                                    <td>${singleData.data.others.Radio}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">USB</th>
                                                    <td>${singleData.data.others.USB}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
            div.innerHTML = searchResult;
            modalDiv.innerHTML = modals;
            searchResults.appendChild(div);
            detailsModal.appendChild(modalDiv);
        });
    }
    toggleSpinner('none');
}