const socket = io();

var encryption, room, name;

document.querySelector(".connect-btn").addEventListener("click", (e) => {
    let id = document.querySelector("#roomID").value.trim();
    let name = document.querySelector("#uName").value.trim();

    encryption = document.querySelector("#encrypt").value
    room = id
    name = name

    if (!id || !name || !encryption) return

    socket.emit("join-room", {
        id: id,
        name: name
    })

    document.querySelectorAll("input[type=text]").forEach(el => el.value = '')
    document.querySelector(".connect").innerHTML = "<h1 style='animation: bounce 1s infinite ease-in; cursor: default !important; user-select: none;'>CONNECTING...</h1>"
})

socket.on("connect_success", () => {
    document.querySelector(".connect").remove()
    document.querySelector(".voice").style.display = "flex"
    document.querySelector(".log").style.display = "block"
})

socket.on("join", (name) => {
    const upvb = document.createElement("div")
    upvb.innerHTML = name;
    upvb.classList.add("up-vb")

    document.querySelector(".voice").appendChild(upvb);

    const lmsg = document.createElement("p")
    lmsg.innerHTML = name + " joined the room..."
})