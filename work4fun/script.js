 //  Part I
//  1. Get the main content container
var mainContainer = document.getElementById("main");
document.getElementById("main_container").innerHTML = mainContainer;

//  2. Get first post title
var postTitles = Array.from(document.getElementsByClassName("entry-title"));
document.getElementById("first_post_title").innerHTML = postTitles[0].innerText;

//  3. Get first post content
var postContents = document.getElementsByClassName("entry-content");
document.getElementById("first_post_content").innerHTML = postContents[0].innerHTML;

//  4. Get all post titles
var titles = ""
postTitles.forEach(element => {titles = (titles + element.innerText + '\n')})
document.getElementById("all_post_titles").innerHTML = titles

//  5. Change the value for the first title
postTitles[0].getElementsByTagName('a')[0].innerText = "New Title That Was Changed"

//  6. Change the URL for the first title link
postTitles[0].getElementsByTagName('a')[0].href = "#changed-link"

//  7. Change the background color for the body
document.body.style.backgroundColor = "#93C0A4"

//  8. Add a new class to the articles then add styles
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.new-class { background-color: #B6C4A2; }';
document.getElementsByTagName('head')[0].appendChild(style);

var articles = Array.from(document.getElementsByClassName("post"));
articles.forEach(article => {article.classList.add("new-class")})

//  Part II
//  1.  Select the parent element for the first post title
var parentFirst = document.getElementsByClassName("entry-title")[0].parentElement;
document.getElementById("parent-first-title").innerHTML = parentFirst;

//  2.  Select the first post and log the siblings
var siblings = []
var elem = document.getElementsByClassName("post")[0];
var sibling = elem.parentElement.firstChild;

console.log(sibling)
sibling = sibling.nextSibling;
console.log(sibling)
while(sibling){
    if(sibling.nodeType === 1 && sibling!=elem){
        siblings.push(sibling)
    }
    sibling = sibling.nextSibling;
}
document.getElementById("log-siblings-first-post").innerHTML = siblings;

//  3.  Select the #main container and log the children
var children = Array.from(document.getElementById("main").childNodes);
document.getElementById("log-children-main").innerHTML = children;



// Bonus Set the entry content with the curent date and time and update it every x (as parameter) seconds

function displayDateTime(){
    var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    document.getElementById("bonus").innerHTML = datetime
}
setInterval(displayDateTime, 1000)
