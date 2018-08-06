var githubToken = "5c30ea7085318a5a25650ce94f433a1434ca16c7";
var gitUser = "zigolab";
var gitRepo = "techradar";

var githubToken = "3e91777694e31128a1837268d62e35d4d4ece441";
var gitUser = "TWItaly";
var gitRepo = "Communities-Tech-Radar";

var api_url = "https://api.github.com/repos/" + gitUser + "/" + gitRepo;

function createIssue(payload){
  var options = {
    "method": "POST",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  }
  UrlFetchApp.fetch(api_url + "/issues?access_token=" + githubToken, options);
}

function updateIssue(issue, payload){
  var options = {
    "method": "PATCH",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  }
  UrlFetchApp.fetch(api_url + "/issues/" + issue.number + "?access_token=" + githubToken, options);
}

function createComment(issue, payload){
  var options = {
    "method": "POST",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  }
  UrlFetchApp.fetch(api_url + "/issues/" + issue.number + "/comments?access_token=" + githubToken, options);
}

function updateComment(comment, payload){
  var options = {
    "method": "PATCH",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  }
  UrlFetchApp.fetch(api_url + "/issues/comments/" + comment.id + "?access_token=" + githubToken, options);
}

function findIssueByTitle(title){
  var options = {
    "method": "GET",
    "contentType": "application/json",
  };
  var issues = JSON.parse(UrlFetchApp.fetch(api_url + "/issues?access_token=" + githubToken, options).getContentText());
  var issue = findObjectByKey(issues, 'title', title);
  return issue;
}

function findCommentByPosition(issue, position){
  var options = {
    "method": "GET",
    "contentType": "application/json",
  };
  var comments = JSON.parse(UrlFetchApp.fetch(api_url + "/issues/" + issue.number + "/comments?state=open&access_token=" + githubToken, options).getContentText());
  var comment = comments.sort(function (a, b) {
    return a.id - b.id;
  })[0];
  return comment;
}

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}
