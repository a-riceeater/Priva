const socket = io();

var encryption, room, uname, roomReg;

document.querySelector(".connect-btn").addEventListener("click", (e) => {
    encryption = document.querySelector("#encrypt").value
    //let id = CryptoJS.AES.encrypt(, encryption || "blank").toString();
    let id = String(CryptoJS.MD5(document.querySelector("#roomID").value.trim()))
    roomReg = document.querySelector("#roomID").value.trim();
    let name = document.querySelector("#uName").value.trim();

    room = id
    uname = name

    if (!id || !name || !encryption) return

    socket.emit("join-room", {
        id: id,
        name: name
    })

    document.querySelectorAll("input[type=text]").forEach(el => el.value = '')
    document.querySelector(".connect").innerHTML = "<h1 style='animation: bounce 1s infinite ease-in; cursor: default !important; user-select: none;'>CONNECTING...</h1>"
})

socket.on("connect_success", (users) => {
    document.querySelector(".connect").remove()
    document.querySelector(".voice").style.display = "flex"
    document.querySelector(".log").style.display = "block"

    for (let i = 0; i < users.length; i++) {
        const ele = document.createElement("div")
        ele.innerHTML = users[i].name
        ele.classList.add("up-vb")
        document.querySelector(".voice").appendChild(ele)
    }
})

socket.on("join", (n) => {
    const upvb = document.createElement("div")
    upvb.innerHTML = n;
    upvb.classList.add("up-vb")

    document.querySelector(".voice").appendChild(upvb);

    const lmsg = document.createElement("p")
    lmsg.innerHTML = n + " joined the room..."
    document.querySelector(".log").appendChild(lmsg);
    
    document.title = "Priva - " + room;
    document.querySelector("#room").innerHTML = `${room} (${roomReg}) - ${uname} (you)`
})

socket.on("pong", (d1) => {
    const date = new Date().getTime()
    console.log(date - d1)
})

setInterval(() => {
    socket.emit("ping", new Date().getTime())
}, 500)