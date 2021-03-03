$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    loadCategoryProducts(category);

    function addTitle(e) {
        $('.category-title').html(e)
    }

    switch (category) {
        case 'lancamentos':
            addTitle('Lançamentos');
            break;
        case 'destaques':
            addTitle('Destaques');
            break;
        case 'paes':
            addTitle('Pães Especiais');
            $('#banner .container img.d-md-block').attr('src', 'assets/img/banner/padaria_pullman_especiais_V2.jpg');
            break;
        case 'bolos':
            addTitle('Bolos');
            $('#banner .container img.d-md-block').attr('src', 'assets/img/banner/padaria_pullman_bolos_V2.jpg');
            break;
        case 'bolinhos':
            $('#banner .container img.d-md-block').attr('src', 'assets/img/banner/padaria_pullman_bolinhos_V3.jpg');
            addTitle('Bolinhos');
            break;
        case 'lanches':
            $('#banner .container img.d-md-block').attr('src', 'assets/img/banner/padaria_pullman_lanches_V2.jpg');
            addTitle('Pães de Lanche');
            break;
        case 'paesBrancos':
            addTitle('Pães Tradicionais');
            $('#banner .container img.d-md-block').attr('src', 'assets/img/banner/padaria_pullman_tradicionais_V2.jpg');
            break;
        case 'artesano':
            addTitle('Artesano');
            break;
        case 'farinha':
            addTitle('Farinha de Rosca');
            $('#banner .container img.d-md-block').attr('src', 'assets/img/banner/padaria_pullman_farinha_V2.jpg');
            break;
        default:
            return;
    }
})

function loadCategoryProducts(category) {
    loadFunction = getCategoryProducts(category)

    loadFunction.then(function(response) {
        let data = response.data.data
        let categoryList = document.querySelector('#category')
        let categoryCard = document.querySelector('.category-card')
        fillList(categoryList, categoryCard, data, data.lenght)
    }).catch(function(response) {
        console.log(response)
    })
}