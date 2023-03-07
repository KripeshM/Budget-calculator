function Register() {
    accno = reg_acno.value;
    u_name = reg_name1.value;
    mob_no = reg_mobno.value;
    password = reg_pswd.value;
    re_password = reg_repswd.value;
    if (accno == '' || u_name == '' || mob_no == '' || password == '' || re_password == '') {
        alert("Enter complete details");
    }
    else {
        if (password == re_password) {
            var user = {
                ACCNO: accno,
                USERNAME: u_name,
                MOBILE: mob_no,
                PASSWORD: password
            };
            if (user.ACCNO in localStorage) {
                alert("Acccount number already exist");
            }
            else {
                localStorage.setItem(accno, JSON.stringify(user));
                alert("Register successfull");
                window.location = "./login.html";
            }
        }
        else {
            alert("Passwords do not match");
        }
    }
}

function Login() {
    accno = log_acno.value;
    password = log_pswd.value;
    if (accno in localStorage) {
        u_details = JSON.parse(localStorage.getItem(accno));
        if (password == u_details.PASSWORD) {
            alert("Login successfull");
            localStorage.setItem("welcome", u_details.USERNAME);
            window.location = "./home.html"
        }
        else {
            alert("Incorrect password");
        }
    }
    else {
        alert("Invalid account number");
    }
}
username = localStorage.getItem("welcome");
welcome_txt.innerHTML = username;

var accBalance = 0;
// balance.innerHTML=`&#x20b9;${accBalance}/-`


function addIncome() {
    income_amnt = incm_amnt.value;
    income_des = incm_des.value;
    if (income_amnt == '' || income_des == '') {
        alert("Enter proper data")
    }
    else {
        localStorage.setItem(income_des, income_amnt)
        accBalance = parseFloat(Number(accBalance) + Number(income_amnt));
        balance.innerHTML = `&#x20b9;${accBalance}/-`
        if (accBalance => 5000) {
            document.getElementById("balance_div").style.boxShadow = "0 0 30px #95ECB0"
        }
        i_table = `
        <tr>
        <td class="border border-2 border-dark ">${income_des}</td>
        <td class="border border-2 border-dark ">${income_amnt}</td>
        </tr>
    `
        income.innerHTML += i_table;
        incm_amnt.value = '';
        incm_des.value = '';
    }

}

function addExpense() {
    expense_amnt = expns_amnt.value;
    expense_des = expns_des.value;
    if (expense_amnt == '' || expense_des == '') {
        alert("Enter proper data")
    }
    else {
        if (expense_amnt > accBalance) {
            alert("Your expense amount is greater than your balance");
        }
        else {
            localStorage.setItem(expense_des, expense_amnt);
            accBalance = parseFloat(Number(accBalance) - Number(expense_amnt));
            balance.innerHTML = `&#x20b9;${accBalance}/-`
            if (accBalance < 5000) {
                document.getElementById("balance_div").style.boxShadow = "0 0 30px #ef3d47"
            }
            e_table = `
            <tr>
            <td class="border border-2 border-dark ">${expense_des}</td>
            <td class="border border-2 border-dark ">${expense_amnt}</td>
            </tr>
        `
            expense.innerHTML += e_table;
            expns_amnt.value = '';
            expns_des.value = '';
        }

    }

}

function Logout() {
    window.location = "./login.html"
}