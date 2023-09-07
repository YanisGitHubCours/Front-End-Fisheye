async function displayModal() {
    console.log("model")
    const parentModal = document.getElementById("contact_modal");
    parentModal.style.display = "flex"



    /*const data = await getOnePhotographers();
    const { name } = data.photographer;
    const modal = document.querySelector(".modal");
    const parentModal = document.getElementById("contact_modal");
    parentModal.style.display = "block";
    modal.style.display = "block";

    const contactText = document.getElementById("textCM");
    contactText.textContent = "Contactez-moi " + name;

    //vider le modal avant d'ajouter de nouveau elements
    //modal.innerHTML = "";*/

}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
