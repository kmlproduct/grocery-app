var addInfo = document.getElementById('add-info');
var PareTable = document.getElementById('table-info');
var inputName = document.getElementById('input-name');
var inputPrice = document.getElementById('input-price');
var myTable = document.querySelector('#table tbody');
var totalSpending = document.getElementById('total-price')
var parentModal = document.getElementById('parent-modal')
var cancelChange = document.getElementById('cancel')
let = homePage = document.querySelector('.home-page')

function getData() {
    const storedItems = localStorage.getItem('localData');
    return storedItems ? JSON.parse(storedItems) : [];
}

function editfunction() {
    let editBtn = document.getElementsByClassName('edit')


    let editInputName = document.getElementById('edit-input-name')
    let editInputPrice = document.getElementById('edit-input-price')
    let saveInfo = document.getElementById('save-change')

    for (var i = 0; i < editBtn.length; i++) {


        editBtn[i].onclick = function () {
            let editLocalItem = JSON.parse(this.parentNode.getAttribute('id'))
            parentModal.style.display = 'block';
            homePage.style.opacity = '0.07'

            const groceryItems = getData();
            let groceryItem = groceryItems.find(item => item.id === editLocalItem);
            editInputName.value = groceryItem.name
            editInputPrice.value = groceryItem.price
            saveInfo.onclick = function () {

                groceryItem.name = editInputName.value
                groceryItem.price = editInputPrice.value,


                    localStorage.setItem('localData', JSON.stringify(groceryItems))

                parentModal.style.display = 'none'
                homePage.style.opacity = '1'
                const parent = document.getElementById(editLocalItem)
                parent.querySelector('.price').innerText = groceryItem.price
                parent.querySelector('.name').innerText = groceryItem.name
            }
            cancelChange.onclick = function () {
                parentModal.style.display = 'block'
                parentModal.style.display = 'none';
                homePage.style.opacity = '1'
            }

        }

    }
}



addInfo.addEventListener('click', function () {
    if (inputName.value == '' || inputPrice.value == '') {
        return
    }
    var groceryItem = {
        name: inputName.value,
        price: inputPrice.value,
        id: new Date().getTime(),
    }

    myTable.innerHTML += `<tr id="${groceryItem.id}">
    <td class='name'> ${groceryItem.name}  </td> 
    <td class='price'> ${groceryItem.price}</td> 
    <td class='delete'>delete</td> 
    <td class='edit'>edit</td>
    </tr>`

    // localStorage


    const groceryItems = getData();


    groceryItems.push(groceryItem)



    // localeStorage

    const sum = groceryItems.reduce((a, b) => a + parseInt(b.price), 0)
    totalSpending.innerText = sum.toFixed(2)
    localStorage.setItem('localData', JSON.stringify(groceryItems))
    let totalAmount = parseInt(totalSpending.innerText)

    if (totalAmount < 300) {
        document.getElementById('alert').innerText = ``
        totalSpending.style.background = '#00ff8c';
        totalSpending.style.color = 'black';
        document.getElementById('alert').style.background = 'none'
    } else if (totalAmount >= 300) {
        document.getElementById('alert').innerText = `you have to control your salary`
        totalSpending.style.background = '#eb911e';
        totalSpending.style.color = 'white';
        document.getElementById('alert').style.background = 'white'
    }
    var deleteBtns = document.querySelectorAll('.delete');



    deleteBtns[deleteBtns.length - 1].onclick = function () {


        let deleteLocalItem = parseInt(this.parentNode.getAttribute('id'))
        const removeIndex = groceryItems.findIndex(item => item.id === deleteLocalItem);
        const groceryItem = groceryItems.find(item => item.id === deleteLocalItem);

        groceryItems.splice(removeIndex, 1);
        localStorage.setItem('localData', JSON.stringify(groceryItems))
        totalSpending.textContent = parseInt(totalSpending.textContent) - groceryItem.price;

        if (totalSpending.textContent < 300) {
            console.log(totalAmount)
            document.getElementById('alert').innerText = ``
            totalSpending.style.background = '#00ff8c';
            totalSpending.style.color = 'black';
            document.getElementById('alert').style.background = 'none'
        }
        this.parentNode.remove();


    }
    editfunction()

    inputName.value = ''
    inputPrice.value = ''

})


window.onload = function () {

    var groceryItems = getData();
    groceryItems.forEach(element => {
        myTable.innerHTML +=
            `<tr id="${element.id}">
        <td class="name">${element.name}  </td> 
        <td class='price'>${element.price}  </td> 
        <td class ="delete">delete</td> 
        <td class ="edit" >edit</td> 
        </tr>`
    });


    // groceryItems = groceryItems.map(element => {
    //     return `<tr>
    //     <th>${element.name}  </th> 
    //     <th>${element.price}  </th> 
    //     <th class="delete">delete</th> 
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
    totalSpending.textContent = sum1.toFixed(2)

    if (sum1 >= 300) {
        document.getElementById('alert').innerText = `you have to control your salary`
        totalSpending.style.background = '#eb911e';
        totalSpending.style.color = 'white';
        document.getElementById('alert').style.background = 'white'
    } else if (totalSpending.textContent < 300) {
        document.getElementById('alert').innerText = ``
        totalSpending.style.background = '#00ff8c';
        totalSpending.style.color = 'black';
        document.getElementById('alert').style.background = 'none'
    }
    // calculate sum

    let deleteBtns = document.getElementsByClassName('delete');

    for (var i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].onclick = function () {

            let deleteLocalItem = JSON.parse(this.parentNode.getAttribute('id'))

            const removeIndex = groceryItems.findIndex(item => item.id === deleteLocalItem);

            groceryItems.splice(removeIndex, 1);

            localStorage.setItem('localData', JSON.stringify(groceryItems))



            this.parentNode.remove()
            var x = this.parentNode.childNodes[3].textContent
            x = JSON.parse(x);
            totalSpending.textContent = JSON.parse(totalSpending.textContent) - x;
            if (totalSpending.textContent < 300) {
                document.getElementById('alert').innerText = ``
                totalSpending.style.background = '#00ff8c';
                totalSpending.style.color = 'black';
                document.getElementById('alert').style.background = 'none'
            }
        }
    }

    editfunction()
}