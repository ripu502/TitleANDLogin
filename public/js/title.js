btn = document.getElementById('add');
btn.addEventListener("click", () => {
    var container = document.getElementById("container");
    var input = document.createElement("input");
    input.type = "text";
    input.name = "title";
    input.placeholder = "Add Title here";
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
});