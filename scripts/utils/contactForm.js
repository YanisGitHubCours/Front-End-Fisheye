async function displayModal() {
    const data = await getOnePhotographers();
    const {name} = data.photographer;
    const modal = document.querySelector(".modal");
    const parentModal = document.getElementById("contact_modal")
    parentModal.style.display = "block"
	modal.style.display = "block";

    const contactText = document.getElementById("textCM")
    contactText.textContent = "Contactez-moi " + name;
  
    const lastNameLabel = document.createElement("label");
    lastNameLabel.textContent = "Nom";
    const lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("type", "text");
  
    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email";
    const emailInput = document.createElement("input");
    emailInput.setAttribute("type", "email");
  
    const messageLabel = document.createElement("label");
    messageLabel.textContent = "Votre message";
    const messageInput = document.createElement("textarea");
  

    modal.appendChild(lastNameLabel);
    modal.appendChild(lastNameInput);
    modal.appendChild(emailLabel);
    modal.appendChild(emailInput);
    modal.appendChild(messageLabel);
    modal.appendChild(messageInput);
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
