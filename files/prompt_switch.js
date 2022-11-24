var prompts_parts = [NaN, NaN, NaN];
var cur_parts = [0, 0, 0];
var image;


function changeImage(){
    let p1 = prompts_parts[0][cur_parts[0]].innerHTML.replace(' ', '_').replace(' ', '_').replace(' ', '_');
    let p2 = prompts_parts[1][cur_parts[1]].innerHTML.replace(' ', '_').replace(' ', '_').replace(' ', '_');
    let p3 = prompts_parts[2][cur_parts[2]].innerHTML.replace(' ', '_').replace(' ', '_').replace(' ', '_');

    image.src = "./files/prompt_switch/" + p1 + "+" + p2 + "+" + p3 + "_0.png"
}

function clearStyle(elem){
    elem.style.color = '#8e8e8e';
    elem.style.backgroundColor = null;
}

function setStyle(elem){
    elem.style.color = '#000000';
    elem.style.backgroundColor = '#31DC62';
}

function modifyPrompt(prompt_indx, i){
    function inner_(){
        if (cur_parts[prompt_indx] !== i){
            clearStyle(prompts_parts[prompt_indx][cur_parts[prompt_indx]]);
            cur_parts[prompt_indx] = i;
            setStyle(prompts_parts[prompt_indx][cur_parts[prompt_indx]]);
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
    for (let i_pp = 0; i_pp < prompts_parts.length; ++i_pp){
        litera = "abcdefg"[i_pp]
        prompts_parts[i_pp] = document.getElementsByClassName("prompt-sweep-button_" + litera);
        setStyle(prompts_parts[i_pp][cur_parts[i_pp]])
    }

    for (let i_pp = 0; i_pp < prompts_parts.length; ++i_pp){
        let prompt_part = prompts_parts[i_pp];
        for (let i = 0; i < prompt_part.length; ++i){
            prompt_part[i].addEventListener("click", modifyPrompt(i_pp, i));
        }        
    }

    let slider = document.getElementById("range_fidelity");
    let image_fidelity = document.getElementById("fidelity-img");

    slider.oninput = function() {
        let val = String(slider.value)
        if (val == "0"){
            val = "0.0"
        }
        if (val == "1"){
            val = "1.0"
        }

        image_fidelity.src = "./files/fidelity_seq/seed-0_ps-8.0_es-1.6_gs-" + val + ".png";

    }
}
document.addEventListener("DOMContentLoaded", () => {
  init();
});
