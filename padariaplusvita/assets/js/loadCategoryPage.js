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
            addTitle('Pães');
            break;
        case 'bolos':
            addTitle('Bolos');
            break;
        case 'bolinhos':
            addTitle('Bolinhos');
            break;
        case 'paesDeLanche':
            addTitle('Pães de Lanche');
            break;
        case 'paesBrancos':
            addTitle('Pães Brancos');
            break;
        case 'artesano':
            addTitle('Artesano');
            break;
        case 'farinha':
            addTitle('Farinha');
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