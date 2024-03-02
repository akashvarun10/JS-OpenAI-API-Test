import dotenv from 'dotenv';
dotenv.config();

const submitIcon = document.querySelector("#submit-icon")

const getImages = () => {
    try{

    } catch (error) {
        
        console.error("Error: ", error)
    }
}

submitIcon.addEventListener("click", getImages)

