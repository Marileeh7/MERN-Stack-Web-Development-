var likes=[9,12,9];
var like1 = document.querySelector("#like1");
var like2 = document.querySelector("#like2");
var like3 = document.querySelector("#like3");


function addlike(id){
    if (id==='like1') {
        likes[0]=likes[0]+1;
        like1.innerHTML = likes[0]+' like(s)';
    }
    else if (id==='like2') {
        likes[1]=likes[1]+1;
        like2.innerHTML = likes[1]+' like(s)';
    }
    else if (id==='like3') {
        likes[2]=likes[2]+1;
        like3.innerHTML = likes[2]+' like(s)';
    }
}