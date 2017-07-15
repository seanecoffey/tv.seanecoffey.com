function submitRequest() {
  var POST_URL = "https://hooks.slack.com/services/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";
  var xhr = new XMLHttpRequest();
  var name = document.getElementById("Name").value;
  var note = document.getElementById("note").value;
  xhr.open("POST", POST_URL, false);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var date = new Date();
  var payload = {
    "channel": "#tv-requests",
    "attachments": [{
      "fallback": "New invite request",
      "color": "#f72020",
      "title": ":tv: New invite request",
      "text": "An invite request has been sent from tv.seanecoffey.com",
      "fields": [{
          "title": "User making request",
          "value": name,
          "short": false
        },
        {
          "title": "Request Content",
          "value": note,
          "short": false
        }
      ],
      "ts": date / 1000
    }]
  };
  if (name && note) {
    xhr.send(JSON.stringify(payload));
    succesfulSubmit();
  } else {
    failedSubmit();
  }
}

function failedSubmit() {
  'use strict';
  var snackbarContainer = document.querySelector('#submit-snackbar');
  var showSnackbarButton = document.querySelector('#submit-request');
  var handler = function(event) {};
  var data = {
    message: 'Cannot send empty message',
    timeout: 5000
  };
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
};

function succesfulSubmit() {
  'use strict';
  var snackbarContainer = document.querySelector('#submit-snackbar');
  var showSnackbarButton = document.querySelector('#submit-request');
  var frm = document.querySelector("#request-form");
  frm.reset();
  var handler = function(event) {};
  var data = {
    message: 'Submission received!',
    timeout: 5000
  };
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
  document.querySelector('#Requests').style.display = 'none';
  document.querySelector('#success').style.display = 'block';
};

function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  submitRequest();
  return false;
}

var requestForm = document.querySelector("#request-form");
if (requestForm.attachEvent) {
  requestForm.attachEvent("submit", processForm);
} else {
  requestForm.addEventListener("submit", processForm);
}
