const data =[
    {
        id:1,
        namecustomer:'Tuan Tung',
        address : 'Ha Noi'
    },
];

const tableBody = document.querySelector('#data');

function renderData(data){

    tableBody.innerHTML =''
    data.forEach((item) =>{
    const tr = document.createElement('tr');
    const thID = document.createElement('th');
    const thCustomer = document.createElement('th');
    const thAddress = document.createElement('th');
    const thDelete = document.createElement('th');

    thID.innerText = item.id;
    thCustomer.innerText = item.namecustomer;
    thAddress.innerText = item.address;

    const idRemove = item.id
    thDelete.innerHTML = `<span onclick = RemoveData(${idRemove})>Delete</span>`

    tr.appendChild(thID);
    tr.appendChild(thCustomer);
    tr.appendChild(thAddress);
    tr.appendChild(thDelete);

    tableBody.appendChild(tr);
})
}
renderData(data)

// -- add Data --

const NameCustomer = document.querySelector('.name--customer');
const NameAddress = document.querySelector('.name--address');

const Submit = document.querySelector('.submit');
Submit.addEventListener('click', (e)=>{
    (e).preventDefault();
    const listData ={
        id:'',
        namecustomer:'',
        address : ''
    }

    const nameCustomerValue = NameCustomer.value;
    const NameAddressValue = NameAddress.value;
    const ID = Math.floor(Math.random());

    listData.id = ID;
    listData.namecustomer = nameCustomerValue;
    listData.address = NameAddressValue;
    data.push(listData);

    
    PostData(listData)

    NameCustomer.value = '';
    NameAddress.value = '';
    renderData(data)
})

// -- delete DATA --

function searchData(data, id) {
    let index = -1;
    index = data.findIndex((item) => (item.id === id))
    return index;
}
function RemoveData(id){
    const result = searchData(data, id);
    if(result !== -1){
        data.splice(result,1);
        renderData(data);
    }
}

//  search Data

const SearchNamecustomer = document.querySelector('.search--name_customer');
const Search = document.querySelector('#search--data');

Search.addEventListener('click', (e)=>{
    (e).preventDefault();
    const check = SearchNamecustomer.value
    const DATA = data.filter((item) =>{
        return item.namecustomer.toLocaleLowerCase().includes(check.trim().toLocaleLowerCase());
    })
    renderData(DATA);
})

// const dataServer ={
//     'id': Math.floor(Math.ramdom()),
//     'namecustomer':''
// }

function PostData(itemData) {
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
    })
    .then(res => res.json())
    .then(data => console.log('sucesslly'))
    .catch(err => console.log(err + 'err'))
}