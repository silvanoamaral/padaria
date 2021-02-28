function getCategoryProducts(category) {
    return axios({
        method: 'get',
        url: 'https://locatestore.intellibrand.ai/products',
        headers: { 'Authorization': brand.token, 'products': brand.categories[category] }
    })
}

function getBrandProducts() {
    return axios({
        method: 'get',
        url: 'https://locatestore.intellibrand.ai/products',
        headers: { 'Authorization': brand.token, 'brand': brand.name }
    })
}

function fillRandomLists() {
    getBrandProducts().then(function(response) {
        let data = response.data.data
        let carouselProducts = getRandom(data, 6)

        // Carousel
        let carouselLists = document.querySelectorAll('.carousel')
        carouselLists.forEach(carouselList => {
            let carouselCard = document.querySelector('.carousel-card')
            fillList(carouselList, carouselCard, carouselProducts, 6)
        })
        startCarousel()

    }).catch(function(response) {
        console.log(response)
    })
}

function fillProductsCategoriesLists(category) {
    getCategoryProducts(category).then(function(response) {
        let data = response.data.data
        let categoryList = document.querySelector(`#${category}`)
        let categoryCard = document.querySelector(`.${category}-card`)
        fillList(categoryList, categoryCard, data, 3)
    }).catch(function(response) {
        console.log(response)
    })
}

function fillList(list, card, data, quantity) {
    data.slice(0, quantity).forEach(product => {
        let cloneCard = card.cloneNode(true)
        cloneCard.classList.remove('d-none')
        firstImage = product.images[0]
        if (firstImage) {
            imgSrc = firstImage.urls.big
            cloneCard.getElementsByTagName('img')[0].src = imgSrc
        }
        cloneCard.getElementsByClassName('prod-name')[0].firstElementChild.innerText = product.name
        cloneCard.firstElementChild.id = `ean-${product.ean}`
        list.appendChild(cloneCard)
    })
    card.remove()
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len)
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available")
    while (n--) {
        var x = Math.floor(Math.random() * len)
        result[n] = arr[x in taken ? taken[x] : x]
        taken[x] = --len in taken ? taken[len] : len
    }
    return result
}