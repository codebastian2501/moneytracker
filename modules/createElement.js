function createElement({ elementType, type, content }) {
  let element = document.createElement(`${elementType}`);
  type === "input"
    ? (element.placeholder = content)
    : (element.textContent = "llll");

  container.appendChild(element);
}

// createElement({ elementType: "input", type: "input", content: "lol" });
