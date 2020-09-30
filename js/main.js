const mySwiper = new Swiper(".swiper-container", {
  sliderPerView: 1,
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
});

function changeTab(event, tab) {
  let tabsBlock = document.getElementsByClassName("tabs__block");
  Array.from(tabsBlock).forEach((tab) => {
    tab.className = tab.className.replace("tabs__block-active", "");
  });

  let tabActive = document.getElementById(tab);
  tabActive.classList.add("tabs__block-active");

  let tabsLink = document.getElementsByClassName("tabs__link");
  Array.from(tabsLink).forEach((tab) => {
    tab.className = tab.className.replace("tabs__link-active", "");
  });
  event.currentTarget.classList.add("tabs__link-active");

  let indicator = document.getElementsByClassName("indicator__h1")[0];
  if (tab == "tab1")
    indicator.className = indicator.className.replace(
      "indicator__h1-right",
      ""
    );
  if (tab == "tab2") indicator.classList.add("indicator__h1-right");
}

function loadImageOnClick(button) {
  handleFileSelect = (event) => {
    let files = event.target.files;
    let file = files[0];
    if (!file.type.match("image.*")) {
      alert("Image only please...");
    }
    let reader = new FileReader();
    reader.onload = (event) =>
      (document.getElementById("form-contact__img").src = event.target.result);
    reader.readAsDataURL(file);
  };
  let input = document.getElementById("form-contact__img-input");
  input.addEventListener("change", handleFileSelect, false);

  button.onclick = () => {
    input.click();
  };
}

function openModelOnClick(button) {
  let modal = document.getElementById("modal");
  let close = document.getElementById("modal__close");

  button.onclick = () => {
    modal.style.display = "block";
  };
  close.onclick = () => (modal.style.display = "none");
  document.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
function makePhoneMask(elements) {
  Array.from(elements).forEach((element) =>
    IMask(element, {
      mask: "+{7}(000)000-00-00",
    })
  );
}
function isNotEmptyString(string) {
  if(string.length > 1) return true;
}
function isPhone(string) {
  if(string.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)) return true;

}
function isEmail(string) {
  if(string.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) return true;
}
function isNotChooseSex(string) {
  if(string == "не выбран") return true;
}
function sendQuestion() {
  let user = {
    name: document.getElementById('modal__form-name').value,
    phone: document.getElementById('modal__form-phone').value,
    email: document.getElementById('modal__form-email').value,
    question: document.getElementById('modal__form-question').value,
  };

  
  if(!isNotEmptyString(user.name)) { alert('введите имя'); return 0;}
  if(!isPhone(user.phone)) { alert('введите номер телефона'); return 0;}
  if(!isEmail(user.email)) { alert('введите email'); return 0;}
  if(!isNotEmptyString(user.name)) { alert('введите вопрос'); return 0;}
  
  fetch("https://localhost", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "content-type": "application/json" },
  }).then(function (res) {
    if (res.ok) {
      console.log("OK " + res.statusText);
    } else {
      console.log("Request failed.  Returned status of " + res.status);
    }
  });
  let modal = document.getElementById("modal");
  modal.style.display = "none";
}
function sendPersonalData() {
  let user = {
    src: document.getElementById('form-contact__img').src,
    sex: document.getElementById('form-contact__select').value,
    name: document.getElementById('form-contact__name').value,
    surname: document.getElementById('form-contact__surname').value,
    phone: document.getElementById('form-contact__phone').value,
    email: document.getElementById('form-contact__email').value,
  };

  if(!isNotEmptyString(user.src)) { alert('выберите картинку'); return 0;}
  if(isNotChooseSex(user.sex)) { alert('выберите пол'); return 0;}
  if(!isNotEmptyString(user.name)) { alert('введите имя'); return 0;}
  if(!isNotEmptyString(user.surname)) { alert('введите фамилию'); return 0;}
  if(!isPhone(user.phone)) { alert('введите номер телефона'); return 0;}
  if(!isEmail(user.email)) { alert('введите email'); return 0;}
  
  fetch("https://localhost", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "content-type": "application/json" },
  }).then(function (res) {
    if (res.ok) {
      console.log("OK " + res.statusText);
    } else {
      console.log("Request failed.  Returned status of " + res.status);
    }
  });
}

loadImageOnClick(document.getElementById("form-contact__img-button"));
openModelOnClick(document.getElementById("menu__button"));
makePhoneMask(document.getElementsByClassName("phone-mask"));
