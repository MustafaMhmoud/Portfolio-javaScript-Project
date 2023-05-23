        // (1) Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    // Stop propagation وقفت اني لما ادوس على icone يتنفز الشرط اللى في الكلك تحت 
    e.stopPropagation();

    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    // toggle Class "open" on links
    tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        // Check If Menu Is Open 
        if (tLinks.classList.contains("open")) { // الشرط ده هاشوف بيه هل menu مفتوحة ولا لا باني ادوس على اي مكان في الصفحة غير menu نفسها 

            // Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");

            // toggle Class "open" on links
            tLinks.classList.toggle("open");

        }

    }

});

// Stop propagation on menu
tLinks.onclick = function (e) {
    e.stopPropagation();
}


            // (2) Color Option
// Check If There Is Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

// If There's Color Item In Local Storage
if (mainColors !== null) {

    document.documentElement.style.setProperty('--main--color',localStorage.getItem("color_option")); // documentElement  بيستدعي او بيعدل حاجة في root in css

    // Remve Active Class From All Colors List Item
    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");

        // Add Active Class On Element With Data Color === local Storage Item
        if (element.dataset.color === mainColors) {
            // Add Active Class
            element.classList.add("active");
        }

    });
}

            // (3) Random Background Option 

let backgroudOption = true; // الاثنين دول خاصين بتغيير الخلفية 

// Variable To Control The Background Interval
let backgroudInterval; // الاثنين دول خاصين بتغيير الخلفية 

// Check If Ther's Local Strage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is NOt EMpty
if (backgroundLocalItem !== null) {
console.log(typeof(backgroundLocalItem)); // string

    if (backgroundLocalItem === 'true') { // حطيت true بين علمتين '' علشان هو string
        backgroudOption = true;
    }
    else {
        backgroudOption = false;
    }

    // Remove Active Class From All Spans 
    document.querySelectorAll(".random-backgrounds span").forEach(element =>{
        element.classList.remove("active");
    });

    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

}

            // (4) Select Landing Page Element
let landingpage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = [ "../imgs/s1.png.jpg",  "../imgs/s2.jpg", "../imgs/s3.jpg", "../imgs/s4.jpg", "../imgs/s5.jpg", "../imgs/s6.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {

    if (backgroudOption === true) {

        backgroudInterval = setInterval(() => {

            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            // Change Background Image Url
            landingpage.style.backgroundImage = 'url("../imgs/' + imgsArray[randomNumber] + '")';
        
        }, 10000);
    }
}

randomizeImgs();



    // Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {  // دي علشان لما ادوس على علامة الاعدادات تقف 

    // Toggle Class Fa-spin For Rotation on Self
    this.classList.toggle("fa-spin"); // بيلف gear

    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open"); // بيضيف class Open 
};

// Switch Colors
const colorsLi = document.querySelectorAll(".color-list li");

// Loop on All List Items
colorsLi.forEach(li => {

    // Click On Every List Items
    li.addEventListener("click", (e) => {

        // set color On Root 
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color)
        // document.querySelector(".settings-box .active").style.setProperty('width', "30px");

        // Set color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        handeActive(e);  // بدال ما اعمل الكلام اللى تحت ده كزا مرة عملت function واحدة تحت وباستدعيها هنا 

    // // Remove Active Class From All Childrens  // هيشيل class active من كل العناصر 
    // e.target.parentElement.querySelectorAll(".active").forEach(element => {
    //     element.classList.remove("active");
    // });

    // // Add Active Class On Self  // اضافة class active على العنصر اللى هتختاره  
    // e.target.classList.add("active");

    });

});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop on All Spans
randomBackEl.forEach(span => {

    // Click On Every Span
    span.addEventListener("click", (e) => {


        handeActive(e); // زي اختها اللى فوق 
    // // Remve Active Class From All Spans 
    // e.target.parentElement.querySelectorAll(".active").forEach(element => {

    //     element.classList.remove("active");
    // });

    // // Add Active Class On Self  // اضافة class active على العنصر اللى هتختاره  
    // e.target.classList.add("active");

    if (e.target.dataset.background === 'yes') {
        backgroudOption = true;

        randomizeImgs();

        localStorage.setItem("background_option", true);

    } else {
        backgroudOption = false;
        clearInterval(backgroudInterval);

        localStorage.setItem("background_option", false);

    }
    });

});


// Handle Active Sttate
function handeActive(ev) {

    // Remove Active Class From All Childrens  // هيشيل class active من كل العناصر 
    ev.target.parentElement.querySelectorAll(".active").forEach(elele => {
        elele.classList.remove("active");
    });

    // Add Active Class On Self  // اضافة class active على العنصر اللى هتختاره  
    ev.target.classList.add("active");

}


// select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    // console.log(skillsOffsetTop)

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight; // offsetHeight بتحسب height بتاع العنصر اللى انت محدده 

    // Window Height
    let windwHeight = this.innerHeight;   // innerHeight بيجيبلك height بتاع window اللى انت فيها 

    // window ScrollTop
    let windowScrollTop = this.pageYOffset; // بيجيبلك المكان اللى انت عملت فيه scrole 

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windwHeight)) { // لما توصر بالموس على سيكشن skills هيتنفز

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress; 
        })
    }
};

// Create popup With The Image
let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

    // create Overlay Element  هننشئ طبقة فوق الصور علشان تطلع فيها الصورة لما نعمل عليها clicke
    let Overlay = document.createElement("div");

    // add class To Overlay  عطيت ل div class
    Overlay.className = 'popup-overlay';

    // Append Overlay To Body هيضيف class ده ل img لما تعمل click
    document.body.appendChild(Overlay);

    // Create The popup
    let popupBox = document.createElement("div");

    // add Class To The popupBox
    popupBox.className = 'popup-box';

    if (img.alt !== null) {
        // Create Heding
        let imgHeding = document.createElement("h3");

        // Create Text For Heading 
        let imgText = document.createTextNode(img.alt);

        // Append The Text To The Heading
        imgHeding.appendChild(imgText);

        // Append The Heading To The popup Box
        popupBox.appendChild(imgHeding);

    // } else {   // مش عارف مش نافعة ليه  هبحث عنها 

    //     // Create Heding
    //     let unknonImg = document.createElement("h3");

    //     // Create The Text
    //     unknonImg.appendChild.createTextNode("Unknon Img");

    //     // Add Class To Text
    //     unknonImg.className = 'unknon';

    //     // Append The Text To The Heading
    //     // unknonImg.appendChild(imagText);

    //     // Append The Heading To The popup Box
    //     popupBox.appendChild(unknonImg);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // set Image Source   عرفت img بال src cood بتاعها علشان هاستدعيها منه
    popupImage.src = img.src;

    // add Image To popup Box  كدح حطينا الصورة اللى هتعمل عليها click جوه popupe
    popupBox.appendChild(popupImage);

    // Append The popup Box To body 
    document.body.appendChild(popupBox);

    // Create The Close Span اللى هتقفل الصورة بعد ما تفتحها  
    let closeButton = document.createElement("span");

    // Create The Close Button Text 
    let closeButtonText = document.createTextNode("x");

    // Append Text To Close Button 
    closeButton.appendChild(closeButtonText);

    // Add Class To Close Button
    closeButton.className = 'close-button';

    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);

    });
});

// Close Popup
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button'){

        // Remove The current Popup
        e.target.parentNode.remove();  // بتشيل popup بعد ما تدوس عليها 

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});




// select All Bullets
const allBullets = document.querySelectorAll(".nev-bulets .bullet"); // دي بتاع nev اللى علي المين 

// select All Links
const allLinks = document.querySelectorAll(".links a"); // دي بتاع ال links اللى فوق 

function scrollToEnyWhere(ele) { // عملت FUNCTION دي مرة واحدة وهاستدعيها عند nev-bulets وعند links  

    ele.forEach(e => {

        e.addEventListener("click", (e) =>{
    
            e.preventDefault(); // لمنع behevear الافتراضي للنك 
    
            document.querySelector(e.target.dataset.section).scrollIntoView({ 
    
                behavior: 'smooth'
    
            });
    
        });
    
    });

};

scrollToEnyWhere(allBullets); // واستدعيت function هنا عليهم 
scrollToEnyWhere(allLinks);


// bullets اللى ظاهرة على اليمين 
let bulletesSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nev-bulets");

// localStorage
let bulletLocalItem = localStorage.getItem("bullets_option");

if(bulletLocalItem !== null) {

    bulletesSpan.forEach(span => {  // شيل class active من الاثنين  

        span.classList.remove("active");

    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");

    }
}

// bullets اللى ظاهرة على اليمين 
bulletesSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.display === 'yes') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", 'block');

        } else {
            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option", 'none');
        }

        handeActive(e); // دي function بتاع active 

    });

});

// Reset Button 
document.querySelector(".reset_options").onclick = function () {

    // الطريقة (1) لو انت مش عايز تحفظ حاجة كنت محددها 
    // localStorage.clear(); // .clear() بتحزف اي حاجة انت كنت مختارها من localstorage 

    // الطريقة (2) لو انت عايز تحزف حاجة معينة كنت محددها بتكتب removeItem(اسم الحاجة اللى عايز تحزفها فقط )
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");

    window.location.reload();
};


// مكتبى head rome.js
//  بتخلي nev ينزل معاك بشكل جميل





// والحمد لله 