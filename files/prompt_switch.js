var styles;
var whats;
var what_times;
var wheres;

var cur_style = 0;
var cur_what = 0;
var cur_what_time = 0;
var cur_where = 0;
var image;


function changeImage(){
    let style = styles[cur_style].innerHTML;
    let what = whats[cur_what].innerHTML;
    let what_time = what_times[cur_what_time].innerHTML;
    let where = wheres[cur_where].innerHTML;

    image.src = "./files/prompt_switch/" + style + "+" + what + "+" + what_time + "+" + where + "_0.png"
    console.log('Image source:')
    console.log(image.src)
}

function clearStyle(elem){
    elem.style.color = '#8e8e8e';
    elem.style.backgroundColor = null;
}

function setStyle(elem){
    elem.style.color = '#000000';
    elem.style.backgroundColor = '#f88000';
}

function modifyStyle(i){
    console.log('modify style', i)
    function inner_(){
        if (cur_style !== i){
            clearStyle(styles[cur_style]);
            cur_style = i;
            setStyle(styles[cur_style]);
            changeImage();
        }
    }
    return inner_
}

function modifyWhat(i){
    function inner_(){
        if (cur_what !== i){
            clearStyle(whats[cur_what]);
            cur_what = i;
            setStyle(whats[cur_what]);
            changeImage();
        }
    }
    return inner_
}

function modifyWhatTime(i){
    function inner_(){
        if (cur_what_time !== i){
            clearStyle(what_times[cur_what_time]);
            cur_what_time = i;
            setStyle(what_times[cur_what_time]);
            changeImage();
        }
    }
    return inner_
}

function modifyWhere(i){
    function inner_(){
        if (cur_where !== i){
            clearStyle(wheres[cur_where]);
            cur_where = i;
            setStyle(wheres[cur_where]);
            changeImage();
        }
    }
    return inner_
}

function set_alpha(slider, fluffy){
    let alpha = 1 - (slider.value - 16) / 52;
    let red = Math.round(248 + 7 * alpha);
    let green = Math.round(128 + 127 * alpha);
    let blue = Math.round(255 * alpha);
    fluffy.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function init() {
    image = document.getElementById("prompt-sweep-img");
	styles = document.getElementsByClassName("prompt-sweep-button_a");
	whats = document.getElementsByClassName("prompt-sweep-button_b");
	what_times = document.getElementsByClassName("prompt-sweep-button_c");
	wheres = document.getElementsByClassName("prompt-sweep-button_d");

    setStyle(styles[cur_style]);
    setStyle(whats[cur_what]);
    setStyle(what_times[cur_what_time]);
    setStyle(wheres[cur_where]);

    var prompt_parts = [styles, whats, what_times, wheres];
    var actions = [modifyStyle, modifyWhat, modifyWhatTime, modifyWhere];

    for (let i_pp = 0; i_pp < prompt_parts.length; ++i_pp){
        let prompt_part = prompt_parts[i_pp];
        for (let i = 0; i < prompt_part.length; ++i){
            console.log()
            prompt_part[i].addEventListener("click", actions[i_pp](i));
        }        
    }

    // let slider = document.getElementById("range_bunny");
    // let image_bunny = document.getElementById("bunny-img");
    // let fluffy  = document.getElementById("fluffy");
    // set_alpha(slider, fluffy)
    // slider.oninput = function() {
    //     // 248, 128, 0
    //  image_bunny.src = "./ptp_files/bunny_seq/fluffy_bunny_" + String(slider.value).padStart(2, '0') + ".png";
    //  set_alpha(slider, fluffy)

    // }
}
document.addEventListener("DOMContentLoaded", () => {
  init();
});
