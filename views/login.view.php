<?php require "views/components/header.php" ?>
<?php require "views/components/navbar.php" ?>

<main class="auth-container">
    <h1>Ienākt</h1>
    <form id="loginForm">
        <input type="text" name="username" placeholder="Lietotājvārds" required><br><br>
        <input type="password" name="password" placeholder="Parole" required><br><br>
        <button type="submit">Ienākt</button>
    </form>
    <p>Vai nēsi reģistrējies? <a href="/register">Reģistrējies šeit</a></p>
</main>

<script>
const form = document.getElementById("loginForm");
form.addEventListener("submit", function(e){
    e.preventDefault();
    const data = new FormData(form);
    
    // Sūtām pieprasījumu uz maršrutu, nevis pa tiešo uz failu
    fetch("/login", {
        method: "POST",
        body: data
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "success") {
            window.location.href = "/"; // Uz sākumlapu
        } else {
            alert(data.message);
        }
    });
});
</script>

<?php require "views/components/footer.php" ?>