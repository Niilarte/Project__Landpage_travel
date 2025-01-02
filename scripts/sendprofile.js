document.getElementById("settings-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const profilePicture = document.getElementById("profile-picture").files[0];

    const profileData = {
        username: username,
        email: email,
        profilePicture: profilePicture ? URL.createObjectURL(profilePicture) : null
    };

    localStorage.setItem("userProfile", JSON.stringify(profileData));
    alert("Configurações salvas com sucesso!");
});