require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve frontend files
app.use(express.static("public"));





// Lead capture API
app.post("/api/lead", async (req, res) => {
    console.log("Received lead data:", req.body);

    try {

        const leadData = {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            projectType: req.body.projectType,
            budget: req.body.budget,
            details: req.body.details,
            source: "website",
            createdAt: new Date().toISOString()
        };

        console.log("New Lead:", leadData);


        // Send data to n8n
        await axios.post(
            process.env.N8N_WEBHOOK_URL,
            leadData
        );

        res.json({
            success: true,
            message: "Lead submitted successfully"
        });


    } catch(error) {

        console.error(
            "Webhook Error:",
            error.message
        );


        res.status(500).json({
            success:false,
            message:"Something went wrong"
        });

    }

});



// Start server
const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});