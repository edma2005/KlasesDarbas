const filterColor = document.querySelector('#filterColor');
const filterSearch = document.querySelector('#filterSearch');
const products = document.querySelector('#products');
const mainIndex = document.querySelector('#mainIndex');
const suit = document.querySelector('#suit');
const shirt = document.querySelector('#shirt');
const boot = document.querySelector('#boot');
const hat = document.querySelector('#hat');
const title = document.querySelector('title');
const liked = document.querySelector('#liked');
const cart = document.querySelector('#cart');
const dropdownCart = document.querySelector('#cartsDp');
const cartDropdownItem = document.querySelector('#cartDropdownItem');
const cartTotal = document.querySelector('#cartTotal');
const mobileNav = document.querySelector('#mobileNav');
const mobileList = document.querySelector('#mobileList');
const closeBtn = document.querySelector('#closeBtn');

const mainIndex1 = document.querySelector('#mainIndex1');
const suit1 = document.querySelector('#suit1');
const shirt1 = document.querySelector('#shirt1');
const boot1 = document.querySelector('#boot1');
const hat1 = document.querySelector('#hat1');
const liked1 = document.querySelector('#liked1');
const cart1 = document.querySelector('#cart1');

mainIndex1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'all');
  window.location.href = 'index.html';
})

suit1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'suit');
  window.location.href = 'categories.html';
})

shirt1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'shirt');
  window.location.href = 'categories.html';
})

boot1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'boot');
  window.location.href = 'categories.html';
})

hat1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hat');
  window.location.href = 'categories.html';
})

liked1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'like');
  window.location.href = 'categories.html';
})

cart1.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = 'cart.html';
})

mobileNav.addEventListener('click', () => {  
    mobileList.style.right= '0px';
    mobileList.style.top= '-20px';
})

closeBtn.addEventListener('click', () => {
  mobileList.style.right='-180px';
  mobileList.style.top='-500px'
})



const getData = () => {
  fetch('https://testapi.io/api/edma2005/resource/EdmaShop',
{
  method: 'GET',
  headers: {
    'Content-Type':
    'application/json'
  }
})
.then((response) => {
  if (response.ok) {
    return response.json()
  }
})
.then((result) => {
	return result.data
})
.then((data) => {
  cartDropdownItem.innerHTML='';
  products.innerHTML='';
	filteredCategorie(data);
  cartCheck(data);
  filtring(data);
})
}

let likedArr = JSON.parse(localStorage.getItem('liked')) || [];

getData()

const filteredCategorie = (data) => {
  let value=localStorage.getItem('categorie');
  if(value=== 'like'){
    let likeArr=[];
    data.forEach(element => {
      likedArr.forEach(like => {
        if(like===element.id) {
          likeArr.push(element);
        }
      })
    })
    if (likeArr.length<1) {
      console.log('no liked items')
      noLiked()
    } 
    
    draw(likeArr);
    search(likeArr);
    colorSearch(likeArr);
  } else {
  title.textContent = `Eshop ${value}s`;
  const fCategorie = data.filter((element) => {
    return (
      element.type ===value
    );
  })
  if (value) {
    draw(fCategorie);
    search(fCategorie);
    colorSearch(fCategorie);
  } 
  }
}


const noLiked = () => {
  const h1 = document.createElement('h1');
  h1.setAttribute('class', 'noliked');
  h1.textContent='Sorry,there is no LIKED items in the cart';
  h1.style.margin="100px";
  h1.style.textAlign="center";
  products.appendChild(h1);
}

const cartCheck = (data) => {
  data.forEach(element => {
    let b = JSON.parse(element.reserve);
    b.forEach((x) => {
      if (x>0){
        cart.style.color= '#F68E5F';
      } 
    })
  })
}


const draw = (data) => {
  const itemSizeArr = JSON.parse(localStorage.getItem('itemId&size')) || [];
  if (itemSizeArr.length>0){
  cart.style.color= '#F68E5F';
  } 
  data.forEach(element => {
    const div = document.createElement('div');
    div.setAttribute('class', 'product');

    const likedBtn = document.createElement('i');
    likedBtn.setAttribute('class', 'fa-solid fa-heart-circle-plus');
    if (likedArr.includes(element.id)) {
      likedBtn.setAttribute('class', 'liked fa-solid fa-heart-circle-plus');
    }

    if (likedArr.length>0) {
      liked.style.color= 'red'
    } else {
      liked.style.color= 'black'
    }

    const pic = JSON.parse(element.picUrl);
    const img = document.createElement('img');
    img.setAttribute('class', 'productImg');
    img.src= pic[0]

    const name = document.createElement('h3');
    name.setAttribute('class', 'productName');
    name.textContent= element.name;

    const price = document.createElement('h4');
    price.setAttribute('class', 'productPrice');
    price.textContent= `${element.price}$`

    div.appendChild(likedBtn)
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(price);
   
    products.appendChild(div);

    img.addEventListener('click', (e) => {
      e.preventDefault();
      pushUser(element);
      window.location.href = 'item.html';
    })

    likedBtn.addEventListener('click', (e) => {
      e.preventDefault()
      
      if (likedArr.includes(element.id)) {
        let i = likedArr.indexOf(element.id);
        likedArr.splice(i,1);
        let jsonLiked = JSON.stringify(likedArr);
        localStorage.setItem('liked', jsonLiked);
      } else {
        likedArr.push(element.id);
        let jsonLiked = JSON.stringify(likedArr);
        localStorage.setItem('liked', jsonLiked);
      }
      getData()
    })
  });
}

const search = (data) => {
filterSearch.addEventListener('keyup', (e) => {
const b = e.target.value.toLowerCase();
const filteredProducts = data.filter((products) => {
  return (
    products.name.toLowerCase().includes(b)
  );
})
if (b){
  products.innerHTML=null;
  draw(filteredProducts);
  } else {
  products.innerHTML=null;
  getData()
  }
})
}

const colorSearch = (data) => {
  filterColor.addEventListener('change', (e) => {
    e.preventDefault();
    console.log(filterColor.value);
    const value = filterColor.value;
    const filteredColor = data.filter((products) => {
      return (
        products.color.includes(value)
      );
    })
    if (value) {
      products.innerHTML=null;
      draw(filteredColor);
    } else {
      products.innerHTML=null;
      getData()
    }
  })
}

const pushUser = (item) => {
  let id =item.id;
  localStorage.setItem('item_id', id);
}


mainIndex.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'all');
  window.location.href = 'index.html';
})

suit.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'suit');
  window.location.href = 'categories.html';
})

shirt.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'shirt');
  window.location.href = 'categories.html';
})

boot.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'boot');
  window.location.href = 'categories.html';
})

hat.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hat');
  window.location.href = 'categories.html';
})

liked.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'like');
  window.location.href = 'categories.html';
})

cart.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = 'cart.html';
})

const filtring = (data) => {
  let totalPrice = [];
  data.forEach(element => {
    let b = JSON.parse(element.reserve)
    b.forEach((x, index) => {
      
      if (x>0){
        cartDraw(element, index, x ,totalPrice);
        cartPeaklook();
      } else {
      }
    })
  })
}

const cartDraw = (product, index, x, totalPrice) => {
  const pic = JSON.parse(product.picUrl);
  
  const img = document.createElement('img');
  img.src=pic[0];

  const name = document.createElement('h3');
  name.textContent=product.name;

  const numberOfItems = document.createElement('span');

  const productSize = document.createElement('span');
  numberOfItems.textContent= ` pcs. ${x}`;
  if (index == 0){
    productSize.textContent= 'Size : S'
   
  } else if (index == 1) {
    productSize.textContent= 'Size : M';
  } else if (index == 2) {
    productSize.textContent= 'Size : L';
  } else if (index == 3) {
    productSize.textContent= 'Size : XL';
  }
 
  const price = document.createElement('span');
  price.textContent= `${x*product.price}$`;

  let multipPrice = x*product.price;
  totalPrice.push(multipPrice);

  const li = document.createElement('li')
  li.appendChild(img);
  li.appendChild(name);
  li.appendChild(productSize);
  li.appendChild(numberOfItems);
  li.appendChild(price);

  cartDropdownItem.appendChild(li);

  sum = totalPrice.reduce((a, b) => a + b, 0);
  cartTotal.textContent= `Total ${sum}$`;
}

const cartPeaklook = () => {
  cart.addEventListener('mouseover', () => {
    dropdownCart.style.display = 'block';
  })
  
  cart.addEventListener('mouseout', () => {
      dropdownCart.style.display = 'none';
  })
}