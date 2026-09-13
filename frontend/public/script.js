document.addEventListener("DOMContentLoaded", () => {

const quoteForm = document.getElementById("quote-form");

const modals = {
    receiptModal: document.getElementById("receipt-modal"),
    receiptModalClose: document.getElementById("close-receipt-btn"),

    portfolioModal: document.getElementById("portfolio-modal"),
    portfolioModalOpen: document.getElementById("open-portfolio-btn"),
    portfolioModalClose: document.getElementById("close-portfolio-btn"),

    guaranteeModal: document.getElementById("guarantee-modal"),
    guaranteeModalOpen: document.getElementById("open-guarantee-btn"),
    guaranteeModalClose: document.getElementById("close-guarantee-btn"),
};


// ================================
// GENERIC MODAL HANDLER
// ================================

function openModal(modal) {
    if(modal){
        modal.classList.add("is-open");
    }
}


function closeModal(modal) {
    if(modal){
        modal.classList.remove("is-open");
    }
}


function setupModal(openBtn, modal, closeBtn){

    if(openBtn){
        openBtn.addEventListener("click",()=>{
            openModal(modal);
        });
    }


    if(closeBtn){
        closeBtn.addEventListener("click",()=>{
            closeModal(modal);
        });
    }


    if(modal){

        modal.addEventListener("click",(e)=>{

            if(e.target === modal){
                closeModal(modal);
            }

        });

    }

}



// ================================
// RECEIPT DATA
// ================================

function populateReceipt(data, result) {


    const referenceId =
        "QR-" +
        Math.floor(1000 + Math.random() * 9000) +
        "-" +
        Math.random()
        .toString(36)
        .substring(2,6)
        .toUpperCase();


    document.getElementById("receipt-code")
    .textContent = referenceId;



    document.getElementById("receipt-name")
    .textContent = data.fullName;



    document.getElementById("receipt-contact")
    .textContent =
    `${data.email} | ${data.phone}`;



    const projectNames = {

        "kitchen":
        "Kitchen Remodel & Custom Cabinetry",

        "full-home":
        "Full Home Renovation",

        "bathroom":
        "Primary Bathroom & Spa Suite",

        "addition":
        "Architectural Addition",

        "basement":
        "Basement Finish & Guest Suite",

        "custom":
        "Custom Historic Restoration"

    };



    document.getElementById("receipt-project")
    .textContent =
    projectNames[data.projectType]
    ||
    data.projectType;



    document.getElementById("receipt-budget")
    .textContent =
    data.budget || "Not specified";



    const now = new Date();

    now.setHours(now.getHours()+2);



    document.getElementById("receipt-time")
    .textContent =
    "Today by " +
    now.toLocaleTimeString([],{
        hour:"numeric",
        minute:"2-digit"
    });


}



// ================================
// INITIALIZE OTHER MODALS
// ================================

setupModal(
    modals.portfolioModalOpen,
    modals.portfolioModal,
    modals.portfolioModalClose
);


setupModal(
    modals.guaranteeModalOpen,
    modals.guaranteeModal,
    modals.guaranteeModalClose
);



// ================================
// QUOTE FORM SUBMIT
// ================================

quoteForm.addEventListener("submit", async function(e){

    e.preventDefault();


    const formData = {

        fullName:
        document.getElementById("full-name")
        .value.trim(),


        email:
        document.getElementById("email")
        .value.trim(),


        phone:
        document.getElementById("phone")
        .value.trim(),


        projectType:
        document.getElementById("project-type")
        .value.trim(),


        budget:
        document.getElementById("budget")
        .value.trim(),


        details:
        document.getElementById("project-details")
        .value.trim()

    };



    const submitBtn =
    document.getElementById("submit-btn");


    const submitText =
    document.getElementById("submit-text");



    submitBtn.disabled=true;

    submitBtn.classList.add("loading");



    submitText.innerHTML=`

        <span class="submit-spinner"></span>
        Sending...

    `;



    try{


        const response = await fetch("http://localhost:3000/api/lead",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:
            JSON.stringify(formData)

        });



        if(!response.ok){

            throw new Error(
                "Network error"
            );

        }



        const result =
        await response.json();



        populateReceipt(
            formData,
            result
        );



        openModal(
            modals.receiptModal
        );



        quoteForm.reset();



    }


    catch(error){

        console.error(error);

        alert(
            "Something went wrong!"
        );

    }


    finally{


        submitBtn.disabled=false;

        submitBtn.classList.remove(
            "loading"
        );


        submitText.innerHTML =
        "Submit request";


    }


});



// ================================
// RECEIPT CLOSE BUTTON
// ================================

if(modals.receiptModalClose){

    modals.receiptModalClose
    .addEventListener("click",()=>{

        closeModal(
            modals.receiptModal
        );

    });

}



// ================================
// ESC KEY CLOSE ALL MODALS
// ================================

document.addEventListener(
"keydown",
function(e){

    if(e.key==="Escape"){

        document
        .querySelectorAll(".modal-backdrop")
        .forEach(modal=>{

            modal.classList.remove(
                "is-open"
            );

        });

    }

});


});