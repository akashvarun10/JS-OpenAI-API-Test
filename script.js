import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

document.addEventListener("DOMContentLoaded", function () {
    // Your existing JavaScript code here
    const submitIcon = document.querySelector("#submit-icon")
    const inputElement = document.querySelector("input")
    const imageSection = document.querySelector(".image-section")

    const getImages = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer${apiKey}'
            },
            body: JSON.stringify({
                prompt: inputElement.value,
                n: 4,
                size: "1024x1024"
            })
        }

        try {
            const response = await fetch('https://api.openai.com/v1/images/generations', options)
            const data = await response.json()
            console.log(data)

            data?.data.forEach(imageObject => {
                const imageContainer = document.createElement("div")
                imageContainer.classList.add("image-container")
                imageElement = document.createElement("img")
                imageElement.setAttribute('src', imageObject.url)
                imageContainer.append(imageElement)
                imageSection.append(imageContainer)
            })
        } catch (error) {
            console.error("Error: ", error)
        }
    }

    submitIcon.addEventListener("click", getImages)
});
