const form = document.getElementById("contact-form")
form.addEventListener("submit",(event)=>{
    event.preventDefault(); //Dont send form
    const prenom = document.getElementById('prenom').value;     
    const nom = document.getElementById('nom').value;     
    const email = document.getElementById('email').value;     
    const message = document.getElementById('message').value;      
    console.log('Prénom:', prenom);     
    console.log('Nom:', nom);     
    console.log('E-mail:', email);     
    console.log('Message:', message);      
    document.getElementById('contact-form').reset();
})
function displayModal() {
    const parentModal = document.getElementById("contact_modal");
    parentModal.style.display = "flex"
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
