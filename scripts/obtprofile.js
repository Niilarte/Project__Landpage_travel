document.addEventListener("DOMContentLoaded", function() {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (userProfile) {
        document.getElementById("profile-picture-img").src = userProfile.profilePicture || "default-profile.jpg";
        document.getElementById("username").textContent = "Nome: " + userProfile.username;
        document.getElementById("email").textContent = "Email: " + userProfile.email;
    } else {
        alert("Perfil não encontrado. Por favor, preencha suas informações.");
    }
});
