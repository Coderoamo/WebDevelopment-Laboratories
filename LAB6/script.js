let inventory = [];
let count = 1;

document.getElementById("porm").addEventListener("submit", function(e) {
    e.preventDefault();

    const Prodname = document.getElementById("name").value;
    const Prodprice = parseFloat(document.getElementById("proice").value).toFixed(2); 
    const quantity = parseFloat(document.getElementById("quants").value).toFixed(2); 
    addProd(Prodname, Prodprice, quantity);
    this.reset();
});

function addProd(name, price, quantity) {
    const id = count++;
    const fullProd = {
        id,
        name,
        price,
        quantity
    }
    inventory.push(fullProd);
    rendertable();
}

function rendertable() {
    const tabsb = document.getElementById("taby");
    tabsb.innerHTML = "";

    for(const item of inventory) {
        const row = `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
        </tr>
        `;

        tabsb.innerHTML += row;
    }
}