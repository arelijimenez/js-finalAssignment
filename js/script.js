const form = document.getElementById('form');
const userName = document.getElementById('userName');
const addressType = document.getElementById('addressType');
const whatOther = document.getElementById('whatOther');
const other = document.getElementById('other');
const streetAddress = document.getElementById('streetAddress');
const address2 = document.getElementById('address2');
const city = document.getElementById('city');
const state = document.getElementById('state');
const zipCode = document.getElementById('zipCode');
const phoneNumber = document.getElementById('phoneNumber');
const email = document.getElementById('email');
const errorElement = document.getElementById('error');

const doughSizes = {
    handTossed: {
        small: 9.99,
        medium: 12.99,
        large: 14.99
    },
    thinCrust: {
        medium: 11.99,
        large: 13.99
    },
    newYorkStyle: {
        large: 16.99,
        extraLarge: 19.99
    },
    glutenFree: {
        small: 10.99
    }
};

window.addEventListener('load', () => {
    document.getElementById("userName").focus();

    document.getElementsByName("dough").forEach(e => {
        e.addEventListener("click", e => {
            let dough = e.target.value;
            let sizes = doughSizes[dough];
            let options = Object.entries(sizes).map((size,i) => {
                let description = `${size[0]}: \$${size[1]}`;
                return `<option value="${size}">${description}</option>`;
            });
            options.unshift(`<option value="">(Please select a size)</option>`);
            let div = document.getElementById('sizeOption');
            div.innerHTML = options.join('\n');

            document.getElementById('sizeOptions').style.visibility = "visible";
            document.getElementById('chooseCheese').style.visibility = "hidden";
            document.getElementById('chooseSauce').style.visibility = "hidden";
            document.getElementById('chooseTopings').style.visibility = "hidden";
        });
    });
});

document.getElementById('sizeOptions').addEventListener('change', (e) => {
    var visibility = "visible";
    if(e.target.value == "") {
        visibility = "hidden";
    }
    document.getElementById('chooseCheese').style.visibility = visibility;
    document.getElementById('chooseSauce').style.visibility = visibility;
    document.getElementById('chooseTopings').style.visibility = visibility;
});


addressType.addEventListener('change', (e) => {
    if (addressType.value === 'Other' ) {
        whatOther.style.visibility = 'visible';
    } else {
        whatOther.style.visibility = 'hidden'; 
    }
});


//NEW
//get entries from checked radio buttons. Display an error if nothing was selected.
var selectDough = document.querySelector('input[name="dough"]:checked');
var selectToppings = document.querySelector('input[name="toppings"]:checked');

console.log("selectDough:", selectDough);
console.log("selectToppings:", selectToppings);


if (selectDough === '' || selectDough == null) {
    setErrorFor(doughOptions, 'Please, select Type of Address');
} else {
    setSuccessFor(doughOptions);
}

// CALC TOTAL 
// price arrays
var cheese = [
    { price: 0 }, 
    { price: 0 },	
    { price: 2.99 },
    { price: 3.99 }
]
var sauce = [
    { price: 0 },
    { price: .99 },
    { price: 1.99 }
]
var toppings = [
    { price: .99 }
]

var cheesePrice =  cheeseOptions;
let sum = 0;

 console.log("dough:", doughSizes);
 console.log("cheese:", cheese);
 console.log("sauce:", sauce);
 console.log("toppings:", toppings);

for (let i = 0; i < cheese.length; i++) {
    if (cheese !== '' || cheese !== null) {
        
        setSuccessFor(email);
    }
}

if (cheese)

//var total = doughSizes + cheeseOptions + sauceOptions + toppingsPrice;
//console.log("Total = $" + total);







form.addEventListener('submit', (e) => { 
    e.preventDefault();
    console.log("Form has been submitted");
    checkInputs(); 
});

function checkInputs() {
    //GET THE VALUES FROM THE INPUTS
    const userNameValue = userName.value.trim();
    const addressTypeValue = addressType.value.trim();
    const otherValue = other.value.trim();
    const streetAddressValue = streetAddress.value.trim();
    const cityValue = city.value.trim();
    const stateValue = state.value.trim();
    const zipCodeValue = zipCode.value.trim();
    const phoneNumberValue = phoneNumber.value.trim();
    const emailValue = email.value.trim();
    

    let x = document.getElementById("userName").autofocus;
    let checkedOptions = [];
    checkedOptions = addressType;
    const letters = /^[A-Za-z -]+$/;
    const zipPattern = /^\d{5}$/;
    const phoneNumberPattern = /^\d{3}[\-]\d{3}[\-]\d{4}$/;
    var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

    if (userNameValue === '' || userNameValue == null) {
        setErrorFor(userName, 'Name is required');
    } else if ( !letters.exec(userNameValue)  ) {
        setErrorFor(userName, 'Please input alphabet characters only');
    } else {
        setSuccessFor(userName);
    }

    if (addressTypeValue === '' || addressTypeValue == null) {
        setErrorFor(addressType, 'Please, select Type of Address');
    } else {
        setSuccessFor(addressType);
    }

    if (otherValue === '' || otherValue == null) {
        setErrorFor(other, 'What other is required');
    } else {
        setSuccessFor(other);
    }
        
    if (streetAddressValue === '' || streetAddressValue == null) {
        setErrorFor(streetAddress, 'Street Address is required');
    } else {
        setSuccessFor(streetAddress);
    }

    if (cityValue === '' || cityValue == null) {
        setErrorFor(city, 'City is required');
    } else {
        setSuccessFor(city);
    }

    if (zipCodeValue === '' || zipCodeValue == null) {
        setErrorFor(zipCode, 'Zip Code is required');
    } else if ( !zipPattern.exec(zipCodeValue)) {
        setErrorFor(zipCode, 'Must be a valid Zip Code format');
    } else {
        setSuccessFor(zipCode);
    }

    if (phoneNumberValue === '' || phoneNumberValue == null) {
        setErrorFor(phoneNumber, 'Phone Number is required');
    } else if ( !phoneNumberPattern.test(phoneNumberValue)) {
        setErrorFor(phoneNumber, 'Must be a valid Phone Number format');
    } else {
        setSuccessFor(phoneNumber);
    }

    if (emailValue === '' || emailValue == null) {
        setErrorFor(email, 'Email is required');
    } else if ( !emailPattern.test(emailValue)) {
        setErrorFor(email, 'Must be a valid Email format');
    } else {
        setSuccessFor(email);
    }
    
}
 
function setErrorFor(input, message) {
    const formControl = input.parentElement; 
    const small = formControl.querySelector('small');
    //ADD ERROR MESSAGE INSIDE SMALL
    small.innerText = message;
    //ADD ERROR CLASS
    formControl.className = 'Form-control Error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'Form-control Success';
}

