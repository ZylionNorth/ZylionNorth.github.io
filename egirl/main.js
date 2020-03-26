const egirlThreshold = 20;
const questionHTML = `
<label class="checkbox-container">
    {}
    <input type="checkbox" class="question" onclick="updateScore();">
    <span class="checkmark"></span>
</label>`;

function updateScore(updateLink) {
    var questionsDiv = document.getElementById("questions");
    var totalQuestions = questionsDiv.children.length;
    var result = 0;
    for (var question of questionsDiv.getElementsByClassName("question")) {
        if (question.checked) {
            result++;
        }
    }

    var percentage = Math.round((result / egirlThreshold) * 100);
    document.getElementById("percent").innerText = percentage + "%";
    document.getElementById("score").innerText = result;

    if (percentage >= 100) {
        document.getElementById("egirl-img").classList.remove("hidden");
    } else {
        document.getElementById("egirl-img").classList.add("hidden");
    }

    encodeAnswers();
}

function encodeAnswers() {
    var questionsDiv = document.getElementById("questions");
    var answers = "";
    for (var question of questionsDiv.getElementsByClassName("question")) {
        if (question.checked) {
            answers += "1";
        } else {
            answers += "0";
        }
    }
    var result = parseInt(answers, 2).toString(16);

    var url = new URL(window.location.href);
    url.searchParams.set("results", result);
    document.getElementById("share-link").value = url.href;
}

function decodeAnswers() {
    var url = new URL(window.location.href);
    result = url.searchParams.get("results");
    if (result != null) {
        var questionsDiv = document.getElementById("questions");
        var totalQuestions = questionsDiv.children.length;
        var answers = (parseInt(result, 16).toString(2)).padStart(totalQuestions, "0");
        var questionList = questionsDiv.getElementsByClassName("question")
        for (var i = 0; i < totalQuestions; i++) {
            if (answers[i] == "0") {
                questionList[i].checked = false;
            } else {
                questionList[i].checked = true;
            }
        }
    }
}

function copyLink() {
    var linkBox = document.getElementById("share-link");
    linkBox.removeAttribute("disabled");
    linkBox.select();
    linkBox.setSelectionRange(0, 99999);
    document.execCommand("copy");
    linkBox.setAttribute("disabled", "disabled");
}

function main() {
    var questionsDiv = document.getElementById("questions");
    var questionsSplit = questions.split("\n");
    for (var question of questionsSplit) {
        questionsDiv.innerHTML += questionHTML.replace("{}", question);
    }
    document.getElementById("total").innerText = questionsSplit.length;

    decodeAnswers();
    updateScore();
}

window.addEventListener("load", main);
