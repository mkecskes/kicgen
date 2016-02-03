window.onload = function() {
    var world = document.getElementById("world");
    
    document.getElementById("csInit").addEventListener("change", getCode);
    world.addEventListener("change", world4);
    world.addEventListener("change", getCode);
    document.getElementById("stage").addEventListener("change", getCode);
    document.getElementById("score").addEventListener("change", getCode);
    document.getElementById("hearts").addEventListener("change", getCode);
    document.getElementById("mallets").addEventListener("change", getCode);
    document.getElementById("feathers").addEventListener("change", getCode);
    document.getElementById("bottles").addEventListener("change", getCode);
    document.getElementById("barrel").addEventListener("change", getCode);
    document.getElementById("strength").addEventListener("change", getCode);
    document.getElementById("endurance").addEventListener("change", getCode);
    document.getElementById("cc").addEventListener("change", getCode);   
};

function world4() {
    var world = document.getElementById("world"),
        stage = document.getElementById("stage");
    if (world.options[world.selectedIndex].value === "3") {
        stage.value = "0";
        stage.disabled = 1;
    } else {
        stage.disabled = 0;
    }
}

function getCode() {
    var worldSelect = document.getElementById("world"),
        stageSelect = document.getElementById("stage"),
        strengthSelect = document.getElementById("strength"),
        enduranceSelect = document.getElementById("endurance"),
        values = getValues({
            csInit: Number(document.getElementById("csInit").value),
            world: Number(worldSelect.options[worldSelect.selectedIndex].value),
            stage: Number(stageSelect.options[stageSelect.selectedIndex].value),
            score: Number(document.getElementById("score").value),
            hearts: Number(document.getElementById("hearts").value),
            mallets: Number(document.getElementById("mallets").value),
            feathers: Number(document.getElementById("feathers").value),
            bottles: Number(document.getElementById("bottles").value),
            barrel: Number(document.getElementById("barrel").checked),
            strength: Number(strengthSelect.options[strengthSelect.selectedIndex].value),
            endurance: Number(enduranceSelect.options[enduranceSelect.selectedIndex].value),
            cc: Number(document.getElementById("cc").checked)
        });
    document.getElementById("code").textContent = getAsc(values);
}

function getValues(wParams) {
    var checksum = ((wParams.csInit & 32) << 2 | 64 | (wParams.csInit & 31) << 1) +
        ((wParams.world & 3) << 5) +
        (wParams.stage & 31) +
        (wParams.mallets & 127) +
        (wParams.feathers & 127) +
        (wParams.bottles & 15) +
        ((wParams.barrel & 1) << 6) +
        (wParams.score & 16777215) + (wParams.score >>> 8 & 65535) + (wParams.score >>> 16 & 255) +
        (wParams.hearts & 1023) + (wParams.hearts >>> 8 & 3) +
        ((wParams.strength & 7) << 4) +
        (wParams.endurance & 7) +
        (wParams.cc & 1);
    
    return [
        0,
        0,
        0,
        0,
        wParams.score & 63,
        wParams.score >>> 6 & 63,
        
        wParams.score >>> 12 & 63,
        wParams.score >>> 18 & 63,
        wParams.hearts & 63,
        wParams.hearts >>> 6 & 15,
        0,
        0,
        
        (wParams.csInit & 16 ^ 16 | wParams.csInit & 15) << 1 | wParams.cc & 1,
        (wParams.mallets & 15) << 2 | wParams.csInit >> 4 & 3,
        (wParams.feathers & 3) << 4 | wParams.mallets >>> 4 & 7,
        wParams.feathers >>> 2 & 31,
        wParams.bottles & 15,
        (wParams.endurance & 7) << 2 | wParams.barrel & 1,
        
        wParams.strength & 7,
        0,
        0,
        (wParams.stage & 3) << 2,
         (checksum & 3) << 4 | (wParams.world + 1 & 7) << 1 | (wParams.stage & 16) >>> 4,
        checksum >>> 2 & 63];
}

function getAsc(words) {
    var asc = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?!",
        code = asc[words[0]];
    for (var i = 1; i < 24; i++) {
        if (i % 12 === 0) {
            code += "\n";
        } else if (i % 6 === 0) {
            code += " ";
        }
        code += asc[words[i]];
    }
    return code;
}
