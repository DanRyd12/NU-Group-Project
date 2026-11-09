let api_ok = 200;

let myElement = document.getElementById('test_button');
myElement.addEventListener("click", function (e) {
  test();
});


async function test() {
    let response = 0;
    try {
        response = await fetch("/api/quiz");

        if (response.status != api_ok) {
            document.getElementById('test_field').innerText = "Error" + " " + response.status;
        } else {
            response = await response.json();
            document.getElementById('test_field').innerText = JSON.stringify(response);
        }
    } catch {
        document.getElementById('test_field').innerText = "Error";
    }
}