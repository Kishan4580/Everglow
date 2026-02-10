
const dimBody = document.getElementsByClassName("img-container")[0];

dimBody.addEventListener("mousemove", (e) => {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;

    dimBody.style.setProperty("--x", `${x}px`);
    dimBody.style.setProperty("--y", `${y}px`);
});