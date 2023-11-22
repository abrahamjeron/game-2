document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting in the traditional way

    // Your data retrieval and storage logic (as in the previous example)
    var username = document.getElementById('username').value;
    var dob = document.getElementById('dob').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;

    var userData = {
        username: username,
        dob: dob,
        gender: gender
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect to another page
    window.location.href = 'brief.html';
});