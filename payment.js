const cardHolderName = document.querySelector("#holderName");
const cardNumber = document.querySelector("#CardNumber");
const expiry = document.querySelector("#Expiry");
const cvc = document.querySelector("#CVC");
const myForm = document.getElementById("formData");
const discountInput = document.getElementById("Discount");
const discountApply = document.querySelector(".DiscountCode_btn");

//Keys inputs approved only

cardHolderName.addEventListener("keypress", function (e) {
  if ((e.which < 96 || e.which > 123) && e.which != 32) {
    e.preventDefault();
  }
});

cvc.addEventListener("keypress", function (e) {
  if (e.which < 48 || e.which > 57) {
    e.preventDefault();
  }
});

// Card number validation

cardNumber.addEventListener("input", function (e) {
  e.target.value = e.target.value
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();

  const card = cardNumber.value;

  let re = new RegExp('^4 || ""');
  if (card.match(re) != null) {
    cardNumber.style.backgroundImage = "url('imgs/visa.png')";
  }
  re = new RegExp("^6011");
  if (card.match(re) != null) {
    cardNumber.style.backgroundImage = "url('imgs/American_Express.png')";
  }
  re = new RegExp("^5[1-5]");
  if (card.match(re) != null) {
    cardNumber.style.backgroundImage = "url('imgs/mastercard 1.png')";
  }
});

// Card expiry validation

expiry.addEventListener("keypress", function (e) {
  e.target.value = e.target.value
    .replace(
      /^([1-9]\/|[2-9])$/g,
      "0$1/" // 3 > 03/
    )
    .replace(
      /^(0[1-9]|1[0-2])$/g,
      "$1/" // 11 > 11/
    )
    .replace(
      /^([0-1])([3-9])$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
      "$1/$2" // 141 > 01/41
    )
    .replace(
      /^([0]+)\/|[0]+$/g,
      "0" // 0/ > 0 and 00 > 0
    )
    .replace(
      /[^\d\/]|^[\/]*$/g,
      "" // To allow only digits and `/`
    )
    .replace(
      /\/\//g,
      "/" // Prevent entering more than 1 `/`
    );
});

//Discount code validation

function discountCode() {
  const discountInput = myForm.elements["DiscountCode"];
  const discountArray = discountInput.value.split("-");
  const firstRegex = /^[A-Z]{8}$/;
  const secondRegex = /^[0-9]{2}$/;
  const thirdRegex = /^[A-Z]{5}$/;

  let test1 = firstRegex.test(discountArray[0]);
  let test2 = secondRegex.test(discountArray[1]);
  let test3 = thirdRegex.test(discountArray[2]);

  if (!test1 || !test2 || !test3) {
    discountInput.style.borderBottomColor = "#066068";
    if (discountInput.value == "") {
      discountInput.style.borderBottomColor = "#71c2cb";
    }
  } else {
    discountInput.style.borderBottomColor = "#71c2cb";
    return true;
  }
}
const discountCalc = document.querySelector(".discountPercent");
const totalAmount = document.querySelector(".totalAmount");
const subTotal = document.querySelector(".subTotal");

function discountCalculator() {
  discountCalc.style.color = "#71c2cb";
  discountCalc.innerHTML = " 20 %";
  totalAmount.innerHTML = subTotal.innerHTML;
}

function totalAmountBilled(e) {
  e.preventDefault();
  discountCalculator();
  let total = totalAmount.innerHTML.substring(1);
  let subTot = subTotal.innerHTML.substring(1);
  let discount = discountCalc.innerHTML.slice(0, -1);

  let finalCharge = (subTot / 100) * discount;
  totalAmount.innerHTML = "$" + (total - finalCharge);
}

// Inputs conditions validation

function nameOnCard() {
  if (cardHolderName.value.length > 6 && cardHolderName.value.match(/^[a-zA-Z ]*$/)) {
    cardHolderName.style.borderBottomColor = "#71c2cb";
    return true;
  } else {
    cardHolderName.style.borderBottomColor = "#066068";
    return false;
  }
}
function numberOnCard() {
  if (cardNumber.value.length === 19) {
    cardNumber.style.borderBottomColor = "#71c2cb";
    return true;
  } else if (cardNumber.value.length < 19 || cardNumber.value === "" || cardNumber.value === null) {
    cardNumber.style.borderBottomColor = "#066068";
    return false;
  }
}
function expiryOnCard() {
  const mm = expiry.value.substring(0, 2);
  const yy = expiry.value.substring(3);

  if (yy > today_yy || (yy == today_yy && mm >= today_mm && expiry.value.length === 5)) {
    expiry.style.borderBottomColor = "#71c2cb";
    return true;
  } else if ((yy == today_yy && mm < today_mm) || expiry.value === "" || expiry.value === null) {
    expiry.style.borderBottomColor = "#066068";
    return false;
  }
}
function cvcOnCard() {
  if (cvc.value.length === 3 || cvc.value.length === 4) {
    cvc.style.borderBottomColor = "#71c2cb";
    return true;
  } else if (cvc.value.length < 3 || cvc.value === "" || cvc.value === null) {
    cvc.style.borderBottomColor = "#066068";
    return false;
  }
}

function validate(e) {
  e.preventDefault();

  if (nameOnCard() && numberOnCard() && expiryOnCard() && cvcOnCard()) {
    submitBtn.disabled = false;
    submitBtn.style.cursor = "pointer";
  } else {
    submitBtn.disabled = true;
  }
  if (discountCode()) {
    discountInput.style.borderBottomColor = "#71c2cb";
    discountApply.style.display = "block";
  } else {
    discountApply.style.display = "none";
  }
}

//complete porches
const container = document.querySelector(".container");
const completeMessage = document.querySelector(".completePorches");
const leftSideBox = document.querySelector(".left-side");
const rightSideBox = document.querySelector(".right-side");
const formBtn = document.getElementById("formButton");
formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  leftSideBox.style.display = "none";
  rightSideBox.style.display = "none";
  completeMessage.style.display = "block";
  container.style.alignItems = "center";
});

discountApply.addEventListener("click", totalAmountBilled);
discountInput.addEventListener("keyup", validate);
cvc.addEventListener("keyup", validate);
cardHolderName.addEventListener("keyup", validate);
expiry.addEventListener("keyup", validate);
cardNumber.addEventListener("keyup", validate);

const submitBtn = document.querySelector(".formBtn");
submitBtn.disabled = true;

const today = new Date();
const today_mm = today.getMonth() + 1;
const today_yy = today.getFullYear() % 100;
