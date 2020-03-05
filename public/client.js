(async () => {
  await initUsername();
  initSocket();
})();

async function initUsername() {
  const response = await fetch("/user");
  const username = await response.text();
  document.querySelector("#username").innerText = "Hello " + username;
}

function initSocket() {
  const socket = io();

  socket.on("file", file => {
    console.log(file);
    enableButtons();
    document.querySelector("#dogPic").className = "";
    document.querySelector("#dogPic").src = file.url;
  });

  socket.on(
    "counter",
    counter => (document.querySelector("#counter").innerText = counter)
  );

  document.querySelector("#btnAdopt").addEventListener("click", function() {
    disableButtons();
    socket.emit("vote", { type: "adopt" });
  });

  document.querySelector("#btnDrop").addEventListener("click", function() {
    disableButtons();
    socket.emit("vote", { type: "drop" });
  });
}

function enableButtons() {
  document.querySelector("#btnAdopt").disabled = false;
  document.querySelector("#btnDrop").disabled = false;
}

function disableButtons() {
  document.querySelector("#btnAdopt").disabled = true;
  document.querySelector("#btnDrop").disabled = true;
}
