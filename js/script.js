/* 
 ---------------  Elements ------------- 
*/

/* 
 ---------------  Components ------------- 
*/
const WelcomeComponents = document.querySelector(".welcome_page");
const PageComponent = document.querySelector(".background_page");
const loginComponent = document.querySelector(".login_page");
const registerComponent = document.querySelector(".register_page");
const VerifyComponent = document.querySelector(".verification_page");
const VerifiedComponent = document.querySelector(".verified_page");
const mainComponent = document.querySelector(".main");
/*
 --------------------- BUttons    -----------------
*/
const registerBtn = document.querySelector("#Register_btn");
const registerSubmitBtn = document.querySelector("#registerBtn");
const verifySubmitBtn = document.querySelector("#verifySubmitBtn");
const backToLoginBtn = document.querySelector("#backToLoginBtn");
const backToRegisterBtn = document.querySelector("#backtoRegister");
const reSendOTPBtn = document.querySelector("#resend_Btn");
const regToLoginBtn = document.querySelector("#RegToLogin_btn");
const loginSubmitBtn = document.querySelector("#login_Submit_Btn");
const showPassBtn = document.getElementById("show_pass_btn");

/*
 ------------------------- Inputs ---------------------
*/
const registerNameInput = document.getElementById("registerName");
const registerSurnameInput = document.getElementById("registerSurname");
const registerEmailInput = document.getElementById("register_email");
const registPasswordInput = document.getElementById("register_password");
const regConfirmPassInput = document.getElementById(
  "register_confirm_password"
);
const verifyInputs = document.getElementById("veridy_inputs");
const logEmailInput = document.getElementById("LoginEmail");
const logPasswordInput = document.getElementById("LoginPassword");



/*
 --------------- Random for Verification --------------
*/
let randomNum;

const createRandomOTP = () => {
  let randomNum = "";
  const Numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 5; i++) {
    randomNum += Numbers[Math.floor(Math.random() * 10)];
  }
  console.log(randomNum);
  return randomNum;
};

/*
 --------------- clear inputs when we do not need them --------------
*/

const clearInputValues = (inputName = "verify") => {
  if (inputName === "login") {
    logEmailInput.value = "";
    logPasswordInput.value = "";
  } else if (inputName === "register") {
    registPasswordInput.value = "";
    registerEmailInput.value = "";
    registerNameInput.value = "";
    registerSurnameInput.value = "";
    regConfirmPassInput.value = "";
  } else {
    for (let i = 0; i < 5; i++) {
      verifyInputs.children[i].value = "";
    }
  }
};

/*
  ----------------- Preloader -----------------
*/

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".preloader").style.display = "none";
});

(function () {
  setTimeout(() => {
    WelcomeComponents.classList.add("hide");
    // if (localStorage.getItem("userInfo")) {
    //   PageComponent.classList.add("hide");
    //   loginComponent.classList.add("hide");
    //   mainComponent.classList.remove("hide");
    // } else {
    //   PageComponent.classList.remove("hide");
    //   loginComponent.classList.remove("hide");
    // }
    PageComponent.classList.remove("hide");
    loginComponent.classList.remove("hide");
  }, 1000);
})();

loginSubmitBtn.addEventListener("click", () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (
    logEmailInput.value === user.Email &&
    logPasswordInput.value === user.Password
  ) {
    loginComponent.classList.add("hide");
    setTimeout(() => {
      PageComponent.classList.add("hide");
      mainComponent.classList.remove("hide");
    }, 500);
  }
});

registerBtn.addEventListener("click", () => {
  clearInputValues("login");
  loginComponent.classList.add("hide");
  registerComponent.classList.remove("hide");
});

registerSubmitBtn.addEventListener("click", () => {
  const Userinfo = {};
  if (
    registerNameInput.value === "" ||
    registerSurnameInput.value === "" ||
    registerEmailInput.value === "" ||
    registPasswordInput.value === "" ||
    regConfirmPassInput.value === ""
  ) {
    alert("Iltimos Berilgan kategoriyalarni to'ldiring");
  } else if (registPasswordInput.value !== regConfirmPassInput.value) {
    alert("Siz kiritgan parolni pastda to'gri kiritmadingiz");
  } else {
    Userinfo.Name = registerNameInput.value;
    Userinfo.Surname = registerSurnameInput.value;
    Userinfo.Email = registerEmailInput.value;
    Userinfo.Password = registPasswordInput.value;
    localStorage.setItem("userInfo", JSON.stringify(Userinfo));
    randomNum = createRandomOTP();

//////////// Function Send email ///////
Email.send({
  SecureToken : "C973D7AD-F097-4B95-91F4-40ABC5567812",
  To : registerEmailInput.value,
  From : "ganiyevjasur7@gmail.com",
  Subject : "OTP Code",
  Body : randomNum
}).then(
message => alert(message)
);





    registerComponent.classList.add("hide");
    VerifyComponent.classList.remove("hide");
  }
});
regToLoginBtn.addEventListener("click", () => {
  clearInputValues("register");
  registerComponent.classList.add("hide");
  loginComponent.classList.remove("hide");
});
verifySubmitBtn.addEventListener("click", () => {
  let verifyInputValues = "";
  for (let i = 0; i < verifyInputs.children.length; i++) {
    verifyInputValues += verifyInputs.children[i].value;
  }
  if (+randomNum === +verifyInputValues) {
    // VerifyComponent.classList.add("hide");
    // VerifiedComponent.classList.remove("hide");
    for (let i = 0; i < verifyInputs.children.length; i++) {
      verifyInputs.children[i].style.borderBottomColor = "#7CFC00";
    }
    setTimeout(() => {
      VerifyComponent.classList.add("hide");
      VerifiedComponent.classList.remove("hide");
    }, 1000);
  } else if ((verifyInputValues = "")) {
    alert("Siz hech narsa kiritmadingiz");
  } else {
    alert("Siz OTP kodini xato kiritdingiz");
  }
  clearInputValues("register");
  setTimeout(() => {
    clearInputValues();
  }, 1000);
});

backToLoginBtn.addEventListener("click", () => {
  VerifiedComponent.classList.add("hide");
  loginComponent.classList.remove("hide");
});

backToRegisterBtn.addEventListener("click", () => {
  VerifyComponent.classList.add("hide");
  registerComponent.classList.remove("hide");
});

reSendOTPBtn.addEventListener("click", () => {
  clearInputValues();
  randomNum = createRandomOTP();
});

// Assuming all child elements of "verify_inputs" are input elements
const verifyInputGroups = verifyInputs.querySelectorAll("input");

verifyInputGroups.forEach((input, i) => {
  if (i < verifyInputGroups.length - 1) {
    input.addEventListener("input", () => {
      // Move focus to the next input field when a character is entered
      setTimeout(() => {
        verifyInputGroups[i + 1].focus();
      }, 0);
    });

    // Prevent the default behavior for the Enter key
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });
  }
});

// function autoConfirm() {
//   let verifyInputValues = "";
//   for (let i = 0; i < verifyInputs.children.length; i++) {
//     verifyInputValues += verifyInputs.children[i].value;

//   }
//   console.log(verifyInputValues);
//   if (+randomNum === +verifyInputValues) {
//     for (let i = 0; i < verifyInputs.children.length; i++) {
//       verifyInputs.children[i].style.borderBottomColor = "green";
//     }
//     setTimeout(() => {
//       VerifyComponent.classList.add("hide");
//       VerifiedComponent.classList.remove("hide");
//     }, 500);
//   }
// }

/*  
  --------------- Show and Unshow Password value ----------------
*/

showPassBtn.addEventListener("click", () => {
  if (logPasswordInput.type === "password") {
    logPasswordInput.setAttribute("type", "text");
    showPassBtn.classList.add("active");
  } else {
    logPasswordInput.setAttribute("type", "password");
    showPassBtn.classList.remove("active");
  }
});
