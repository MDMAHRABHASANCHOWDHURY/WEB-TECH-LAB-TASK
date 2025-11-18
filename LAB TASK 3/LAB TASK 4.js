function validateForm() 
{
const firstName = document.getElementById("firstname").value.trim();
const lastName = document.getElementById("lastname").value.trim();
const email = document.getElementById("email").value.trim();
const donationAmount = document.querySelector('input[name="donation"]:checked');

    if(!firstName || !lastName || !email || !donationAmount) 
        {
            alert("Please fill in all required fields (First Name, Last Name, Email, Donation Amount).");
            return false;
        }
    if(!validateEmail(email)) 
        {
            alert("Please enter a valid email address.");
            return false;
        }
    return true;
}

function validateEmail(email) 
{
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

document.querySelectorAll('input[name="donation"]').forEach((radio) => 
{
    radio.addEventListener("change", function () 
    {
        const otherAmountField = document.getElementById("customAmount");
        if(this.value === "other") 
        {
            otherAmountField.style.display = "inline-block";
        } 
        else 
        {
            otherAmountField.style.display = "none";
            otherAmountField.value = "";
        }
    });
});

document.getElementById("rdonation").addEventListener("change", function () 
{
    const creditField = document.getElementById("creditcard");
    const monthsField = document.getElementById("months");
    if(this.checked) 
    {
        creditField.style.display = "inline-block";
        monthsField.style.display = "inline-block";
    } 
    else 
    {
        creditField.style.display = "none";
        monthsField.style.display = "none";
        creditField.value = "";
        monthsField.value = "";
    }
});

window.onload = function () 
{
    const state = document.getElementById("state");
    const country = document.getElementById("country");
    if(state) state.value = "Dhaka";
    if(country) country.value = "Bangladesh";
};

function validatePassword() 
{
    const password = document.getElementById("password")?.value;
    const confirmPassword = document.getElementById("confirm_password")?.value;
    if(password && confirmPassword && password !== confirmPassword) 
    {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}

document.querySelector('input[type="reset"]').addEventListener("click", function (event) 
{
    const confirmation = confirm("Are you sure you want to reset the form?");
    if(!confirmation) event.preventDefault();
    });

document.querySelectorAll('input[name="donationType"]').forEach((radio) => 
{
    radio.addEventListener("change", function () 
    {
        const hmName = document.getElementById("hmName");
        const acknowledge = document.getElementById("adonateto");
        if(this.value === "honor") 
        {
            hmName.placeholder = "Name to honor";
            acknowledge.parentElement.style.display = "block";
        } 
        else if(this.value === "memory") 
        {
            hmName.placeholder = "Name in memory of";
            acknowledge.parentElement.style.display = "block";
        } 
        else 
        {
            hmName.placeholder = "";
            acknowledge.parentElement.style.display = "none";
        }
    });
});

const comments = document.getElementById("comments");

if (comments) 
{
    comments.addEventListener("input", function () 
    {
        const charLimit = 200;

        if (this.value.length > charLimit) 
        {
            alert("Character limit reached (200 characters max).");
            this.value = this.value.substring(0, charLimit);
        }
    });
}

const monthlyAmountInput = document.getElementById("creditcard");
const monthsInput = document.getElementById("months");

if (monthlyAmountInput && monthsInput) 
{
    function updateTotalDonation()
    {
        const monthlyAmount = parseFloat(monthlyAmountInput.value) || 0;
        const months = parseInt(monthsInput.value) || 0;
        const total = monthlyAmount * months;
        let totalDisplay = document.getElementById("totalDonation");

        if (!totalDisplay) 
        {
            totalDisplay = document.createElement("p");
            totalDisplay.id = "totalDonation";
            totalDisplay.style.fontWeight = "bold";
            totalDisplay.style.color = "#007b00";
            monthsInput.parentElement.appendChild(totalDisplay);
        }
        if (months > 0 && monthlyAmount > 0) 
        {
            totalDisplay.textContent = `Total recurring donation for ${months} months: $${total.toFixed(2)}`;
        } 
        else 
        {
            totalDisplay.textContent = "";
        }
    }
    
    monthlyAmountInput.addEventListener("input", updateTotalDonation);
    monthsInput.addEventListener("input", updateTotalDonation);
}
