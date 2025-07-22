let allProducts = Array.from(JSON.parse(localStorage.getItem('allProducts'))) || [];

const productNameInput = document.getElementById('pname');
const productPriceInput = document.getElementById('pprice');
const productDescriptionInput = document.getElementById('pdescription');
const productImageInput = document.getElementById('pimage');
const addProductBtn = document.getElementById('addProductBtn');

const submitBtn = document.getElementById('submitBtn');
const closeFromIcon = document.getElementById('close-from-icon');
const addProdForm = document.getElementById('add-prod-form');
const productList = document.querySelector('.productList');

// slider icons
const sliderOfProducts = document.querySelector('.slider-of-products');
const closeIcon = document.getElementById('close-icon');
const arrowLeftIcon = document.getElementById('arrow-left-icon');
const arrowRightIcon = document.getElementById('arrow-right-icon');

// varables f
let currentIndexOfProduct = 0;
displayProducts(allProducts);

function addProduct() {

    const file = productImageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            let newProduct = {
                id: Math.floor(Math.random() * 1000),
                name: productNameInput.value,
                price: productPriceInput.value,
                description: productDescriptionInput.value,
                image: e.target.result // Data URL
            };
            allProducts.push(newProduct);
            localStorage.setItem('allProducts', JSON.stringify(allProducts));
            displayProducts(allProducts);
            clearForm();
            showAddProductForm('hide');
        };
        reader.readAsDataURL(file);
    } else {
        // No image selected, fallback
        let newProduct = {
            id: Math.floor(Math.random() * 1000),
            name: productNameInput.value,
            price: productPriceInput.value,
            description: productDescriptionInput.value,
            image: ''
        };
        allProducts.push(newProduct);
        localStorage.setItem('allProducts', JSON.stringify(allProducts));
        displayProducts(allProducts);
        clearForm();
        showAddProductForm('hide');
    }
    console.log('allProducts', allProducts);
}

function showAddProductForm(view) {
    // Show the form to add a new product
    if (view === 'hide') {
        addProdForm.classList.add('d-none');
    } else if (view === 'show') {
        addProdForm.classList.remove('d-none');
    }
}
addProductBtn.addEventListener('click', function () {
    showAddProductForm('show');
});
closeFromIcon.addEventListener('click', function () {
    showAddProductForm('hide');
});

function clearForm() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productDescriptionInput.value = '';
    productImageInput.value = '';
}






function displayProducts(products) {
    let containerOfChild = '';


    products.forEach(product => {
        const imgSrc = product.image ? product.image : './images/(7).jpg';
        containerOfChild += `
            <div class="my-2">
                
                    <figure class="prodct-image position-relative rounded-2">
                        <img src="${imgSrc}" alt="${product.name}">
                        <figcaption class="product-content">
                            <h3>${product.name} </h3>
                            <p> ${product.description}</p>
                            <p> ${product.price} $</p>
                            <div class="btns">
                                <button class="btn btn-primary" onclick="editProduct(${product.id})">Edit</button>
                                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                            </div>
                        </figcaption>
                    </figure>
                
            </div>
        `
    });

    productList.innerHTML = containerOfChild;
}

function deleteAllProducts() {
    allProducts = [];
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
    displayProducts(allProducts);
}
function deleteProduct(id) {
    allProducts = allProducts.filter(product => product.id !== id);
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
    displayProducts(allProducts);
}



function editProduct(id) {
    const product = allProducts.find(product => product.id === id);
    console.log('id', id);

    if (product) {
        productNameInput.value = product.name;
        productPriceInput.value = product.price;
        productDescriptionInput.value = product.description;
        // productImageInput.value = product.image;

        // Remove the product from the list
        deleteProduct(id);

        // Show the form to edit the product
        showAddProductForm('show');
    }
}
productList.addEventListener('click', function (e) {
    // Check if the clicked element is an image inside .prodct-image
    if (e.target.tagName === 'IMG') {
        sliderOfProducts.classList.remove('d-none');
        const imageSrc = e.target.getAttribute('src');

        if (imageSrc) {
            sliderOfProducts.style.backgroundImage = `url('${imageSrc}')`;
        }
    }
    currentIndexOfProduct = allProducts.findIndex(product => product.image === e.target.getAttribute('src'));
    // console.log('currentIndexOfProduct', currentIndexOfProduct);
});


function changeSliderImage(direction) {
    if (direction === 'right') {
        currentIndexOfProduct++;
        const imageSrc = allProducts[currentIndexOfProduct].image;
        sliderOfProducts.style.backgroundImage = `url('${imageSrc}')`;

        if (currentIndexOfProduct === allProducts.length -1) {
            currentIndexOfProduct = 0;
        }
    console.log('currentIndexOfProduct right', currentIndexOfProduct);

    }
    else if (direction === 'left') {
        currentIndexOfProduct--;
        if (currentIndexOfProduct < 0) {
            currentIndexOfProduct = allProducts.length - 1;
        }
        const imageSrc = allProducts[currentIndexOfProduct].image;
        sliderOfProducts.style.backgroundImage = `url('${imageSrc}')`;
        console.log('currentIndexOfProduct left', currentIndexOfProduct);
    }

}

// add event listeners for slider icons
closeIcon.addEventListener('click', function () {
    sliderOfProducts.classList.add('d-none');


});
arrowLeftIcon.addEventListener('click', function () {
    changeSliderImage('left');
});
arrowRightIcon.addEventListener('click', function () {
    changeSliderImage('right');

});



document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
        sliderOfProducts.classList.add('d-none');
    }
    else if (e.key === 'ArrowLeft') {
        changeSliderImage('left');
    }
    else if (e.key === 'ArrowRight') {
        changeSliderImage('right');
    }

});