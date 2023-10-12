function processPromptOne() {
  document.getElementById("prompt-one-container").style.display = "none";
  document.getElementById("prompt-two-container").style.display = "block";
}

function processPromptTwo(message) {
  var productResult = document.getElementById("product_result");

  if (productResult) {
    productResult.textContent = message;
  } else {
    console.error("Element with ID 'tpidResultMessage' not found.");
  }

  document.getElementById("prompt-two-container").style.display = "none";
  document.getElementById("prompt-three-container").style.display = "block";
}

function processPromptThree() {
  var productResult = document.getElementById("product_result");
  var selectedProduct = document.getElementById("selected_product");

  if (selectedProduct) {
    selectedProduct.textContent = productResult.textContent;
  } else {
    console.error("Element with ID 'tpidResultMessage' not found.");
  }

  // Array to store selected options
  var selectedOptions = [];

  // Get all checkboxes on the page
  var checkboxes = document.querySelectorAll("input[type='checkbox']");

  // Loop through checkboxes and add the selected options to the array
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedOptions.push(checkbox.value);
    }
  });

  // Display the selected options as a comma-separated string in the HTML element
  var selectedOptionsElement = document.getElementById("the_prompt");
  if (selectedOptions.length > 0) {
    selectedOptionsElement.textContent = selectedOptions.join(", ");
  } else {
    selectedOptionsElement.textContent = "No options selected.";
  }

  document.getElementById("prompt-three-container").style.display = "none";
  document.getElementById("prompt-four-container").style.display = "block";
}

function processPromptFour() {
  var selectedProductElement = document.getElementById("selected_product");
  var selectedOptionsElement = document.getElementById("the_prompt");
  var versionElement = document.getElementById("form_prompt_version");
  var errorElement = document.getElementById("form_prompt_error");
  var issueElement = document.getElementById("form_prompt_issue");
  var specificElement = document.getElementById("form_prompt_specific");

  var selectedProduct = selectedProductElement.textContent;
  var selectedOptions = selectedOptionsElement.textContent;
  var version = versionElement.value;
  var error = errorElement.value;
  var issue = issueElement.value;
  var specific = specificElement.value;

  // Create a new object to store the form data
  var formData = {
    selectedProduct: selectedProduct,
    selectedOptions: selectedOptions,
    version: version,
    error: error,
    issue: issue,
    specific: specific,
  };

  //build prompt
  var prompt =
    "I am looking for information regarding " +
    formData.selectedProduct +
    ". I am having issues with " +
    formData.selectedOptions +
    ". I am using version " +
    formData.version +
    ". I am getting the following error: " +
    formData.error +
    ". I am having the following issue: " +
    formData.issue +
    ". I am looking for the following specific information: " +
    formData.specific +
    ".";

  document.getElementById("message").value = prompt;
  document.getElementById("prompt-four-container").style.display = "none";
  document.getElementById("prompt-five-container").style.display = "block";
}

const chatMessages = [];

const renderMessages = () => {
  const messages = document.getElementById("messages");
  messages.innerHTML = [
    ...chatMessages.map((message) => {
      return document
        .getElementById(`${message.sender}-message`)
        .innerHTML.replace("##Text#", message.text);
    }),
    ...(chatMessages[chatMessages.length - 1].sender === "user"
      ? [document.getElementById("processing").innerHTML]
      : []),
  ].join("");

  setTimeout(() => {
    const scroller = document.getElementById("scroller");
    scroller.scroll({ top: scroller.scrollHeight, behavior: "smooth" });
  }, 300);
};

const sendMesage = (message, dlg = "anonymous") => {
  fetch(`/response`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, dlg }),
  })
    .then((response) => response.json())
    .then((data) => {
      chatMessages.push({
        text: data.choices[0].message.content,
        sender: "system",
      });
      renderMessages();
    });
};

const onMessage = () => {
  const lsKey = "room";
  let room = localStorage.getItem(lsKey);
  if (!room) {
    room =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem(lsKey, room);
  }

  const el = document.getElementById("message");
  const message = el.value;

  sendMesage(message, room);

  chatMessages.push({ text: message, sender: "user" });

  renderMessages();
  el.value = "";
};

(() => {
  const messages = document.getElementById("messages");
  document.getElementById("send").addEventListener("click", (event) => {
    onMessage();
  });
  document.getElementById("message").addEventListener("keyup", (event) => {
    if (event.key === "Enter") onMessage();
  });
})();
