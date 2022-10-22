var addInfo = document.getElementById('add-info');
var PareTable = document.getElementById('table-info');
var inputName = document.getElementById('input-name');
var inputPrice = document.getElementById('input-price');
var myTable = document.querySelector('#table tbody');
var myAmount = document.getElementById('total-price')

console.log(myTable)



addInfo.addEventListener('click', function () {

    var groceryItem = {
        name: `${inputName.value}`,
        price: `${inputPrice.value}`,
        id: new Date().getTime(),
    }

    myTable.innerHTML += `<tr id="${groceryItem.id}">
    <td class='name'>${groceryItem.name}  </td> 
    <td class='price'> ${groceryItem.price}</td> 
    <td class='delate'>delate</td> 
    </tr>`

    // localStorage


    var storedItems = localStorage.getItem('localData')

    const groceryItems = storedItems ? JSON.parse(storedItems) : [];

    groceryItems.push(groceryItem)

    localStorage.setItem('localData', JSON.stringify(groceryItems))

    // localeStorage
    let Amount = document.getElementsByClassName('price');

    let count1 = []


    for (var i = 0; i < Amount.length; i++) {
        var count = JSON.parse(Amount[i].textContent)
        count1.push(count)

    }
    let sum1 = count1.reduce((a, b) => a + b, 0)
    myAmount.innerText = `${sum1}.00`

    var delate = document.querySelectorAll('.delate');


    let totalAmount = JSON.parse(myAmount.innerText)


    delate[delate.length - 1].onclick = function () {
        // delate[delate.length - 1]

        let deleteLocalItem = JSON.parse(this.parentNode.getAttribute('id'))
        const removeIndex = groceryItems.findIndex(item => item.id === deleteLocalItem);
        groceryItems.splice(removeIndex, 1);
        localStorage.setItem('localData', JSON.stringify(groceryItems))


        this.parentNode.remove();
        var x = this.parentNode.childNodes[3].textContent
        x = JSON.parse(x);
        myAmount.textContent = JSON.parse(myAmount.textContent) - x;




    }
    if (totalAmount > 300) {

        document.getElementById('alert').innerText = `you have to control your salary`
        myAmount.style.background = '#eb911e';
        myAmount.style.color = 'white';
        document.getElementById('alert').style.background = 'white'


    } else {
        document.getElementById('alert').innerText = ``
        myAmount.style.background = 'none';
        document.getElementById('alert').style.background = 'none'
    }
})


window.onload = function () {

    var storedItems = localStorage.getItem('localData');
    var groceryItems = storedItems ? JSON.parse(storedItems) : [];
    groceryItems.forEach(element => {
        myTable.innerHTML +=
            `<tr id="${element.id}">
        <td class="name">${element.name}  </td> 
        <td class='price'>${element.price}  </td> 
        <td class ="delate">Delate</td> 
        </tr>`
    });

    // groceryItems = groceryItems.map(element => {
    //     return `<tr>
    //     <th>${element.name}  </th> 
    //     <th>${element.price}  </th> 
    //     <th class="delate">delate</th> 
    //     </tr>`
    // });

    // myTable.innerHTML += groceryItems.join('')

    // calculate sum
    let Amount = document.getElementsByClassName('price');
    let count = []
    for (var i = 0; i < Amount.length; i++) {
        var count1 = JSON.parse(Amount[i].textContent)
        count.push(count1)
    }
    let sum1 = count.reduce((a, b) => a + b, 0)
    myAmount.textContent = `${sum1}.00`
    // calculate sum

    let delate = document.getElementsByClassName('delate');
    let totalAmount = JSON.parse(myAmount.innerText)
    for (var i = 0; i < delate.length; i++) {
        delate[i].onclick = function () {

            let deleteLocalItem = JSON.parse(this.parentNode.getAttribute('id'))

            const removeIndex = groceryItems.findIndex(item => item.id === deleteLocalItem);

            groceryItems.splice(removeIndex, 1);

            localStorage.setItem('localData', JSON.stringify(groceryItems))



            this.parentNode.remove()
            var x = this.parentNode.childNodes[3].textContent
            x = JSON.parse(x);
            myAmount.textContent = JSON.parse(myAmount.textContent) - x;

        }

    }
    if (totalAmount > 300) {
        document.getElementById('alert').innerText = `you have to control your salary`
        myAmount.style.background = '#eb911e';
        myAmount.style.color = 'white';
        document.getElementById('alert').style.background = 'white'
    } else {
        document.getElementById('alert').innerText = ``
        myAmount.style.background = 'none';
        document.getElementById('alert').style.background = 'none'
    }
}