
const API_URL = "http://localhost:5115/api/";

const TokenByLocalStorage = localStorage.getItem("Token");
const loggedInperson = localStorage.getItem("person");
// let Loginperson;
function Loginperson() {
    if (loggedInperson !== null) {
        const person = JSON.parse(loggedInperson);
        return person;
    } else {
        console.error("No person data found in localStorage");

        // Return a default person with id = 0 or handle it based on your requirements
        return { id: 0, name: "Default Person", /* other properties */ };
    }
}
export { API_URL, TokenByLocalStorage,loggedInperson, Loginperson };
