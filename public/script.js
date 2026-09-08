

const quoteForm = document.getElementById("quote-form");


quoteForm.addEventListener("submit", async function(e){

    e.preventDefault();


    const formData = {

        fullName: document.getElementById("full-name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        projectType: document.getElementById("project-type").value,

        budget: document.getElementById("budget").value,

        details: document.getElementById("project-details").value

    };


    console.log("Sending lead:", formData);


    try {

        const response = await fetch("/api/lead", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(formData)

        });


        const result = await response.json();


        console.log(result);


        alert("Request submitted successfully!");


        quoteForm.reset();


    } catch(error){

        console.error(error);

        alert("Something went wrong!");

    }


});

