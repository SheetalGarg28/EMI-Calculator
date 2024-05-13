
let loanAmount = document.getElementById('amount');
let interestRate = document.getElementById('interest');
let loanDuration = document.getElementById('loanTenure');
let submit = document.getElementById('Calculate'); // Corrected id

submit.addEventListener('click', (event) => {
    //preventDefault ka use isliye krte hai taki page refresh na ho
    event.preventDefault();
    calculateEMI();
})

function calculateEMI() {
    let isYear = document.getElementById('year').checked;
    let isMonth = document.getElementById('month').checked;
    let noOfMonths = 0;
    if (isYear || isMonth) {
        noOfMonths = parseFloat(loanDuration.value);
    } else {
        alert('Please select loan tenure type: Month or Year');
        return;
    }

    if (noOfMonths <= 0) {
        alert('Loan tenure should be a positive number.');
        return;
    }

    let r = parseFloat(interestRate.value) / (isYear ? 12 : 100); // Convert kr rahe hai yearly interest rate to monthly 

    let p = parseFloat(loanAmount.value);

    // Check for invalid inputs
    if (isNaN(p) || isNaN(r) || isNaN(noOfMonths)) {
        alert('Please enter valid numeric values for loan amount, interest rate, and loan tenure.');
        return;
    }

    // Formula: EMI = (p*r*(1+r)^n)/((1+r)^n-1)
    let EMI = (p * r * Math.pow((1 + r), noOfMonths)) / (Math.pow((1 + r), noOfMonths) - 1);
    let totalInterest = EMI * noOfMonths - p;
    let totalPayment = totalInterest + p;
    document.getElementById('emi').innerText = "₹" + Math.round(EMI);
    document.getElementById('totalInterest').innerText = "₹" + Math.round(totalInterest);
    document.getElementById('totalPayment').innerText = "₹" + Math.round(totalPayment);
}


