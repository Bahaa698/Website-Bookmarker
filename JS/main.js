var bookmarkName = document.getElementById("name");
var bookmarkURL = document.getElementById("url");
var update = document.getElementById("updateBtn");
var submit = document.getElementById("submitBtn");
var initialIndex;
var bookmarks = [];


if (localStorage.getItem("bookmarks") != null) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayData();
}

function addData() {

    if (validateSite() == true) {
        var bookmark = {
            name: bookmarkName.value,
            url: bookmarkURL.value,
        };
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        displayData();
        clearData();
    } else {
        validateSite();
    }
}

function validateSite() {
    var nameRegex = /^[A-Za-z]{2,8}$/;
    var urlRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;
    if (nameRegex.test(bookmarkName.value) == false) {
        return (document.getElementById("invalidName").classList.remove("d-none"))
    } else if (urlRegex.test(bookmarkURL.value) == false) {
        return (document.getElementById("wrongURL").classList.remove("d-none"))
    }
    return true;
}

function clearData() {
    bookmarkName.value = "";
    bookmarkURL.value = "";
}

function displayData() {
    var cartona = "";
    for (var i = 0; i < bookmarks.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${bookmarks[i].name}</td>
        <td>${bookmarks[i].url}</td>
        <td><a href="https://${bookmarks[i].url}" target="_blank"><button onclick="visitLink(${i})" class="btn btn-info" data-index="0"><i class="fa-solid fa-link pe-2"></i>Visit</button></a></td>
        <td><button onclick="updateData(${i})" class="btn btn-success" data-index="0"><i class="fa-solid fa-eye pe-2"></i>Update</button></td>
        <td><button onclick="deleteData(${i})" class="btn btn-danger pe-2" data-index="0"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableData").innerHTML = cartona;
}

function deleteData(i) {
    bookmarks.splice(i, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayData();
}

function searchData(searchTerm) {
    var cartona = "";
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
            cartona += `<tr>
                <td>${i + 1}</td>
                <td>${bookmarks[i].name}</td>
                <td>${bookmarks[i].url}</td>
                <td><a href="https://${bookmarks[i].url}" target="_blank"><button onclick="visitLink(${i})" class="btn btn-info" data-index="0"><i class="fa-solid fa-link pe-2"></i>Visit</button></a></td>
                <td><button onclick="updateData(${i})" class="btn btn-success" data-index="0"><i class="fa-solid fa-eye pe-2"></i>Update</button></td>
                <td><button onclick="deleteData(${i})" class="btn btn-danger pe-2" data-index="0"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                </tr>`;
        }
    }
    document.getElementById("tableData").innerHTML = cartona;
}

function updateData(i) {
    initialIndex = i;
    var updateIndex = bookmarks[i];
    bookmarkName.value = updateIndex.name;
    bookmarkURL.value = updateIndex.url;
    submit.classList.add("d-none");
    update.classList.remove("d-none");
}

function updateInfo() {
    var bookmark = {
        name: bookmarkName.value,
        url: bookmarkURL.value,
    };
    bookmarks.splice(initialIndex, 1, bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayData();
    clearData();
    submit.classList.remove("d-none");
    update.classList.add("d-none");
}

