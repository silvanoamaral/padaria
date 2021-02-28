function getProduct(ean) {
  return axios({
    method: 'get',
    url: `https://locatestore.intellibrand.ai/product/${ean}`,
    headers: {'Authorization': brand.token}
  })
}

function fillProductDetails(data) {
  let productDetails = document.querySelector('#prod-details')
  productDetails.getElementsByTagName('h1')[0].innerText = data.name
  firstImage = data.images[0]
  if (firstImage) {
    imgSrc = firstImage.urls.big
    productDetails.getElementsByTagName('img')[0].src = imgSrc
  }
  productDetails.getElementsByTagName('p')[0].innerText = data.description
}

function fillProductOffers(data) {
  let offersList = document.querySelector('.offers')
  let offerItem = document.querySelector('.offer')

  if (data.offers) {
    data.offers.forEach(offer => {
      cloneItem = offerItem.cloneNode(true) 
      cloneItem.classList.remove('d-none')
      cloneItem.classList.add('d-flex')
      cloneItem.classList.add('new')
      cloneItem.getElementsByTagName('img')[0].src = offer.retailerLogo
      cloneItem.getElementsByTagName('a')[0].href = offer.url
      cloneItem.querySelector('.price').innerText = `R$ ${offer.price.toLocaleString('pt-br')}`
      cloneItem.querySelector('.available').innerText = (offer.available) ? 'Disponivel' : 'Indisponivel'
      cloneItem.querySelector('.available').style.color = (offer.available) ? 'Green' : 'Red'
      offersList.appendChild(cloneItem)
    })
  }
}

function fillModalInfo(elem) {
  let ean = elem.firstElementChild.id.split('-')[1]
  getProduct(ean).then(function (response) {
    
    let data = response.data.data
    fillProductDetails(data)
    fillProductOffers(data)
    enableModal()

  }).catch(function (response) {
    console.log(response)
  })
}

function clearOffers() {
  document.querySelectorAll('.new').forEach(offer => {
    offer.remove()
  })
}