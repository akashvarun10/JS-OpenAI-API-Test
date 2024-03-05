const apiKey = "YOUR_API_KEY";

document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.querySelector("#submit-btn");
    const inputElement = document.querySelector("input");
    const imageSection = document.querySelector(".images-section");

    const getImages = async () => {
        // Change the button text to "Generating"
        submitBtn.textContent = "Generating";

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: inputElement.value,
                n: 4,
                size: "1024x1024"
            })
        };

        try {
            const response = await fetch('https://api.openai.com/v1/images/generations', options);

            if (response.status === 429) {
                console.error('Too Many Requests. Please wait before making another request.');
                return;
            }

            const data = await response.json();

            if (!data || !data.data || !Array.isArray(data.data)) {
                console.error('Invalid response format from the API.');
                return;
            }

            console.log(data);

            data.data.forEach(imageObject => {
                const imageContainer = document.createElement("div");
                imageContainer.classList.add("image-container");
                const imageElement = document.createElement("img");
                imageElement.setAttribute('src', imageObject.url);
                imageContainer.appendChild(imageElement);
                imageSection.appendChild(imageContainer);
            });

            // Change the button text back to "Generate" after images are loaded
            submitBtn.textContent = "Generate";
        } catch (error) {
            console.error("Error: ", error);
            // Change the button text back to "Generate" in case of an error
            submitBtn.textContent = "Generate";
        }
    };

    submitBtn.addEventListener("click", getImages);
});
