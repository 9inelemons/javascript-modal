let fruits = [
    {id: 1, title: 'Apples', price: 20, img: 'https://chudesalegko.ru/wp-content/uploads/2013/07/yabloko.jpg'},
    {id: 2, title: 'Bananas', price: 30, img: 'https://vtorrevieje.com/wp-content/uploads/2019/01/banan.jpg'},
    {id: 3, title: 'Cherries', price: 40, img: 'https://calorizator.ru/sites/default/files/imagecache/product_512/product/cherry.jpg'}
]

const toHTML = fruit => `
    <div class="col">
            <div class="card">
                <img style="height: 300px;" src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
                <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Get price</a>
                    <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
                </div>
            </div>
    </div>
`

function render() {
    document.querySelector('#fruits').innerHTML = fruits.map(toHTML).join('')
}

render()

const priceModal = $.modal({
    title: 'Price',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Close', type: 'primary', handler() {
                priceModal.close()
            }
        }
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn

    if(btnType === 'price') {
        const fruit = findFruit(event)

        priceModal.setContent(`
            <p>Price for ${fruit.title}: <b>${fruit.price}$</b></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        const fruit = findFruit(event)

        $.confirm({
            title: 'Are you sure?',
            content: `<p>You are about remove <b>${fruit.title}</b></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== fruit.id)
            render()
        }).catch(() => {

        })
    }
})

const findFruit = (event) => {
    const id = +event.target.dataset.id
    return fruits.find(f => f.id === id)
}