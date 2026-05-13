let inventory = []
let count = 0

const btn = document.getElementById("search4")
const inputForm = document.getElementById("porm")
const productNameInput = document.getElementById("search1")
const productPriceInput = document.getElementById("search2")
const productStockInput = document.getElementById("search3")

btn.addEventListener("click", addProductToInventory)
inputForm.addEventListener("submit", addProductToInventory)

function addProductToInventory(event) {
    event.preventDefault()
    let productName = productNameInput.value.trim()
    let productPrice = parseFloat(productPriceInput.value.trim())
    let productStock = parseInt(productStockInput.value.trim())

    if (productName && productPrice > 0 && productStock >= 0) {
        let newProduct = {
            id: count + 1,
            name: productName,
            price: productPrice,
            stock: productStock
        }
        inventory.push(newProduct)
        count++

        renderTable()
        productNameInput.value = ""
        productPriceInput.value = ""
        productStockInput.value = ""
    } else {
        alert("Invalid input. Please enter a valid product name, price, and stock.")
    }
}

function renderTable() {
    const tbody = document.querySelector("#tabs tbody")
    tbody.innerHTML = ""

    inventory.forEach(product => {
        const row = document.createElement("tr")

        const idCell = document.createElement("td")
        idCell.textContent = product.id
        row.appendChild(idCell)

        const nameCell = document.createElement("td")
        nameCell.textContent = product.name
        row.appendChild(nameCell)

        const priceCell = document.createElement("td")
        priceCell.textContent = `$${product.price.toFixed(2)}`
        row.appendChild(priceCell)

        const stockCell = document.createElement("td")
        if (product.stock === 0) {
            stockCell.textContent = "Out of Stock"
            stockCell.style.color = "red"
        } else {
            stockCell.textContent = product.stock
        }
        row.appendChild(stockCell)

        tbody.appendChild(row)
    })
}