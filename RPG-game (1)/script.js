var key = { "ArrowRight": 0, "ArrowLeft": 0, "ArrowUp": 0, "ArrowDown": 0 };
var moveSystem, x = -2140, y = -1150, speed = 10, movepos = 4, moveannimation, moveannimationclock = 0, keymoving = 0, Generate, entity = 0, attackdamage = 0, playerHP = 100, playerMaxHP = 100, playerMP = 80, playerMaxMP = 80, dataSystem, replySystem, playerXP = 0, playerMaxXP = 10, playerXPlevel = 1, coin = 0, wordsystem, wordbox, dialogboxappear = 0, HPrecoveryInterval = 0, playerSurvivalStatus = 1, pause = 0, attacking = 0, attackAnimationTimer, attackAnimationMove, dialogboxappearEnd = 0, wordtext, backpackopen = 0, inventoryBackpack = [], packbackSelectItemi,SelectEquipment,SelectEquipmentNum,SelectEquipmentID;
var skillArr = new Array();
var EquipmentArr = new Array();
var FoodArr = new Array();
var playerEquipmentSystem = { "ArmorHelmet": "", "ArmorChestplate": "", "ArmorLeggings": "", "ArmorBoots": "","skill":skillArr,"Equipment":EquipmentArr,"Food":FoodArr};
function get(id) {
  return document.getElementById(id);
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function keydown(ev) {
  if (playerSurvivalStatus) {
    //ev.preventDefault();
    if (key[ev.key] == 0) {
      key[ev.key] = 1;
      keymoving = 1;
    }
    if (ev.key == " ") {
      if (playerMP - 2 > 0) {
        attack(2);
        playerMP -= 2;
        HPrecoveryInterval = 3;
      }
    }
    if (ev.key == "e") {
      if (backpackopen == 0) {
        backpack();
        get("backpack").setAttribute("style", "");
        backpackopen = 1;
      } else if (backpackopen) {
        get("backpack").setAttribute("style", "display:none");
        get("inventory").remove();
        backpackopen = 0;
      }
    }
    if (ev.key == "w") {
      if (key["ArrowUp"] == 0) {
        key["ArrowUp"] = 1;
        keymoving = 1;
      }
    }
    if (ev.key == "a") {
      if (key["ArrowLeft"] == 0) {
        key["ArrowLeft"] = 1;
        keymoving = 1;
      }
    }
    if (ev.key == "s") {
      if (key["ArrowDown"] == 0) {
        key["ArrowDown"] = 1;
        keymoving = 1;
      }
    }
    if (ev.key == "d") {
      if (key["ArrowRight"] == 0) {
        key["ArrowRight"] = 1;
        keymoving = 1;
      }
    }
  }
}
function keyup(ev) {
  if (key[ev.key] == 1) {
    key[ev.key] = 0;
    keymoving = 0;
  }
  if (ev.key == "w") {
    if (key["ArrowUp"] == 1) {
      key["ArrowUp"] = 0;
      keymoving = 0;
    }
  }
  if (ev.key == "a") {
    if (key["ArrowLeft"] == 1) {
      key["ArrowLeft"] = 0;
      keymoving = 0;
    }
  }
  if (ev.key == "s") {
    if (key["ArrowDown"] == 1) {
      key["ArrowDown"] = 0;
      keymoving = 0;
    }
  }
  if (ev.key == "d") {
    if (key["ArrowRight"] == 1) {
      key["ArrowRight"] = 0;
      keymoving = 0;
    }
  }
}
function move() {
  if (key["ArrowRight"]) {
    if (x - speed > -2140) {
      movepos = 1;
      x -= speed;
      keymoving = 1;
    } else {
      movepos = 1;
      x = -2140;
      keymoving = 1;
    }
  } else if (key["ArrowLeft"]) {
    if (x + speed < 706) {
      movepos = 2;
      x += speed;
      keymoving = 1;
    } else {
      movepos = 2;
      x = 706;
      keymoving = 1;
    }
  } else if (key["ArrowUp"]) {
    if (y + speed < 400) {
      movepos = 3;
      y += speed;
      keymoving = 1;
    } else {
      movepos = 3;
      y = 400;
      keymoving = 1;
    }
  } else if (key["ArrowDown"]) {
    if (y - speed > -2432) {
      movepos = 4;
      y -= speed;
      keymoving = 1;
    } else {
      movepos = 4;
      y = -2432;
      keymoving = 1;
    }

  }
  get("background").style.backgroundPositionX = x + "px";
  get("background").style.backgroundPositionY = y + "px";
}
function walk() {
  if (attacking == 0) {
    if (movepos == 1) {
      get("player").style.backgroundPositionY = "-96px";
    } else if (movepos == 2) {
      get("player").style.backgroundPositionY = "-48px";
    } else if (movepos == 3) {
      get("player").style.backgroundPositionY = "-144px";
    } else if (movepos == 4) {
      get("player").style.backgroundPositionY = "0px";
    }
    if (moveannimationclock < 96) {
      moveannimationclock += 48;
    } else if (moveannimationclock == 96) {
      moveannimationclock = 0;
    }
    if (keymoving) {
      get("player").style.backgroundPositionX = "-" + moveannimationclock + "px";
    }
  }
}
function data() {
  get("HPbar").innerHTML = "HP:" + playerHP + "/" + playerMaxHP;
  get("MPbar").innerHTML = "MP:" + playerMP + "/" + playerMaxMP;
  get("HPbar").style.width = ((playerHP / playerMaxHP) * 400) + "px";
  get("MPbar").style.width = ((playerMP / playerMaxMP) * 300) + "px";
  get("XPlevel").innerHTML = playerXPlevel;
  get("XPbar").innerHTML = "XP:" + playerXP + "/" + playerMaxXP;
  get("XPbar").style.width = ((playerXP / playerMaxXP) * 200) + "px";
  get("coin").innerHTML = coin;
  if (playerXP >= playerMaxXP) {
    playerXP -= playerMaxXP;
    playerXPlevel++;
    if (playerXPlevel <= 10) {
      playerMaxXP += 10;
    } else if (playerXPlevel <= 20) {
      playerMaxXP += 20;
    } else {
      playerMaxXP += 50;
    }
  }
  if (playerXPlevel >= 100) {
    get("XPlevel").style.fontSize = "20pt";
  }
  if (playerHP <= 0) {
    die();
  }
}
function die() {
  playerSurvivalStatus = 0;
  get("player").style.backgroundImage = `url(${"player1attack.png"})`;
  get("player").style.backgroundPositionX = "-288px";
  get("player").style.backgroundPositionY = "-240px";
  talk("你死亡了!", 1000);
  clearInterval(moveSystem);
  clearInterval(moveannimation);
  clearInterval(replySystem);
  clearInterval(Generate);
  clearInterval(dataSystem);
  key["ArrowRight"] = 0;
  key["ArrowLeft"] = 0;
  key["ArrowUp"] = 0;
  key["ArrowDown"] = 0;
  keymoving = 0;
  entity = 0;
  var reborn = document.createElement("div");
  reborn.id = "rebornButton";
  reborn.addEventListener("click", rebornSystem);
  get("background").appendChild(reborn);
  get("rebornButton").innerHTML = "重生";
  if (backpackopen) {
    get("backpack").setAttribute("style", "display:none");
    get("inventory").remove();
    backpackopen = 0;
  }
}
function rebornSystem() {
  playerHP = playerMaxHP;
  playerMP = playerMaxMP;
  moveSystem = setInterval(move, 20);
  moveannimation = setInterval(walk, 100);
  replySystem = setInterval(reply, 250);
  Generate = setInterval(monsterGenerate, 2000);
  dataSystem = setInterval(data, 20);
  get("rebornButton").remove();
  x = -2140;
  y = -1150;
  get("background").style.backgroundPositionX = x + "px";
  get("background").style.backgroundPositionY = y + "px";
  key["ArrowRight"] = 0;
  key["ArrowLeft"] = 0;
  key["ArrowUp"] = 0;
  key["ArrowDown"] = 0;
  keymoving = 0;
  get("player").style.backgroundImage = `url(${"player.png"})`;
  get("player").style.backgroundPositionX = "0px";
  get("player").style.backgroundPositionY = "0px";
  playerSurvivalStatus = 1;
}
function reply() {
  if (playerHP > 0) {
    if (HPrecoveryInterval <= 0) {
      if (playerHP + 1 < playerMaxHP) {
        playerHP += 1;
      } else {
        playerHP = playerMaxHP;
      }
    }
    if (playerMP + 1 < playerMaxMP) {
      playerMP += 1;
    } else {
      playerMP = playerMaxMP;
    }
    if (HPrecoveryInterval > 0) {
      HPrecoveryInterval -= 0.25;
    }
  }
  attackdamage = 0;
}
function init() {
  get("background").focus();
  get("loding").remove();
  moveSystem = setInterval(move, 20);
  moveannimation = setInterval(walk, 100);
  dataSystem = setInterval(data, 20);
  replySystem = setInterval(reply, 250);
  Generate = setInterval(monsterGenerate, 2000);
}
function attack(damage) {
  attackdamage = damage;
  get("player").style.backgroundImage = `url(${"player1attack.png"})`;
  attackAnimationMove = 0;
  get("player").style.backgroundPositionX = attackAnimationMove + "px";
  get("player").style.backgroundPositionY = "0px";
  if (attacking == 0) {
    attacking = 1;
    attackAnimationTimer = setInterval(attackAnimation, 100);
  }
}
function attackAnimation() {
  get("player").style.backgroundPositionX = attackAnimationMove + "px";
  if (attackAnimationMove >= 384) {
    attacking = 0;
    get("player").style.backgroundImage = `url(${"player.png"})`;
    get("player").style.backgroundPositionX = "0px";
    clearInterval(attackAnimationTimer);
  }
  if (playerSurvivalStatus == 0) {
    attacking = 0;
    clearInterval(attackAnimationTimer);
  }
  attackAnimationMove += 48;
}
function monsterGenerate() {
  if (entity > 50) return;
  var GenerateX, GenerateY;
  if (random(0, 1)) {
    if (random(0, 1)) {
      if (x + 700 > 706) {
        GenerateX = random(x - 700, -2140);
      } else {
        GenerateX = random(x + 700, 706);
      }
    } else {
      if (x - 700 < -2140) {
        GenerateX = random(x + 700, 706);
      } else {
        GenerateX = random(x - 700, -2140);
      }
    }
    GenerateY = random(-2432, 400);
  } else {
    if (random(0, 1)) {
      if (y + 400 > 400) {
        GenerateY = random(y - 400, -2432);
      } else {
        GenerateY = random(y + 400, 400);
      }
    } else {
      if (y - 400 < -2432) {
        GenerateY = random(y + 400, 400);
      } else {
        GenerateY = random(y - 400, -2432);
      }
    }
    GenerateX = random(-2140, 706);
  }
  entity += 1;
  var mon = document.createElement("div");
  mon.className = "monster";
  mon.style.top = (400 - (GenerateY - y)) + "px";
  mon.style.left = (700 - (GenerateX - x)) + "px";
  mon.style.display = 'none';
  mon.monsterHP = 10;
  mon.GenX = GenerateX;
  mon.GenY = GenerateY;
  mon.tm = setInterval(monstermove, 50, mon);
  get("background").appendChild(mon);
}
function monstermove(mon) {
  if (400 - (mon.GenY - y) > 800 || 400 - (mon.GenY - y) < 0 || 700 - (mon.GenX - x) > 1400 || 700 - (mon.GenX - x) < 0) {
    mon.style.display = 'none';
    mon.GenX += random(-10, 10);
    mon.GenY += random(-10, 10);
  } else {
    mon.style.display = '';
    if (mon.GenX > x) {
      mon.GenX -= random(1, 10);
    } else if (mon.GenX < x) {
      mon.GenX += random(1, 10);
    }
    if (mon.GenY > y) {
      mon.GenY -= random(1, 10);
    } else if (mon.GenY < y) {
      mon.GenY += random(1, 10);
    }
    mon.style.top = (400 - (mon.GenY - y)) + "px";
    mon.style.left = (700 - (mon.GenX - x)) + "px";
  }
  if (Math.abs((400 - (mon.GenY - y)) - 400) < 30 && Math.abs((700 - (mon.GenX - x)) - 700) < 30) {
    if (playerHP > 0) {
      playerHP -= 1;
    }
  }
  if (Math.abs((400 - (mon.GenY - y)) - 400) < 35 && Math.abs((700 - (mon.GenX - x)) - 700) < 35) {
    if (attackdamage > 0) {
      mon.monsterHP -= attackdamage;
      if (mon.monsterHP <= 0) {
        clearInterval(mon.tm);
        entity -= 1;
        playerXP += 2;
        attackdamage = 0;
        coin += 5;
        mon.remove();
      }
    }
  }
  if (playerHP <= 0) {
    clearInterval(mon.tm);
    entity -= 1;
    mon.remove();
  }
}
function talk(word, time) {
  wordtext = word;
  if (dialogboxappear == 0) {
    var talkbox = document.createElement("div");
    talkbox.id = "dialogbox";
    talkbox.className = "overflow-auto";
    talkbox.addEventListener("click", talkfast);
    get("background").appendChild(talkbox);
  }
  if (dialogboxappear) {
    clearInterval(wordbox);
  }
  wordsystem = 1;
  if (dialogboxappearEnd) {
    dialogboxappearEnd = 0;
    get("dialogboxEnd").remove();
  }
  wordbox = setInterval(printword, time / word.length, word);
  dialogboxappear = 1;
}
function talkfast() {
  if (dialogboxappearEnd == 0) {
    get("dialogbox").innerHTML = wordtext;
    clearInterval(wordbox);
    var talkboxEnd = document.createElement("div");
    talkboxEnd.id = "dialogboxEnd";
    get("background").appendChild(talkboxEnd);
    talkboxEnd.addEventListener("click", talkboxover);
    dialogboxappearEnd = 1;
  }
}
function printword(word) {
  get("dialogbox").innerHTML = word.substr(0, wordsystem);
  if (wordsystem <= word.length - 1) {
    wordsystem++;
  } else {
    if (dialogboxappearEnd == 0) {
      var talkboxEnd = document.createElement("div");
      talkboxEnd.id = "dialogboxEnd";
      get("background").appendChild(talkboxEnd);
      talkboxEnd.addEventListener("click", talkboxover);
      dialogboxappearEnd = 1;
    }
    clearInterval(wordbox);
  }
}
function talkboxover() {
  dialogboxappear = 0;
  dialogboxappearEnd = 0;
  get("dialogbox").remove();
  get("dialogboxEnd").remove();
}
function backpack() {
  get("packbackSelectItem").style.backgroundImage = `url(${""})`;
  get("packbackSelectItemName").innerHTML = "";
  get("packbackSelectItemIntroduction").innerHTML = "";
  get("packbackSelectItemDressup").innerHTML = ""
  packbackSelectItemi = "";
  SelectEquipment = "";
  SelectEquipmentNum = "";
  SelectEquipmentID = "";
  var inventory = document.createElement("div");
  inventory.id = "inventory";
  inventory.className = "overflow-auto";
  inventory.style = "display:flex; flex-wrap:wrap; align-content:flex-start;";
  get("backpack").appendChild(inventory);
  for (i = 0; i < inventoryBackpack.length; i++) {
    var inventory_ = document.createElement("span");
    inventory_.id = "inventory_" + i;
    inventory_.className = "inventory_";
    inventory_.i = i;
    inventory_.addEventListener("click", clickInventory, inventory_);
    get("inventory").appendChild(inventory_);
    get("inventory_" + i).style.backgroundImage = `url(${"equipmentSystem/"+inventoryBackpack[i].img+".png"})`;
  }
}
function clickInventory(inventoryData) {
  get("packbackSelectItemDressup").innerHTML = "裝備";
  packbackSelectItemi = inventoryData.target.i;
  get("packbackSelectItem").style.backgroundImage = `url(${"equipmentSystem/" + inventoryBackpack[inventoryData.target.i].img + ".png"})`;
  get("packbackSelectItemName").innerHTML = inventoryBackpack[inventoryData.target.i].name;
  get("packbackSelectItemIntroduction").innerHTML = inventoryBackpack[inventoryData.target.i].info;
}
function check(type,id,num){
if(type=="ArmorHelmet"||type=="ArmorChestplate"||type=="ArmorLeggings"||type=="ArmorBoots"){
  get("packbackSelectItemDressup").innerHTML = "卸下";
  SelectEquipment = type;
  SelectEquipmentID = id;
  get("packbackSelectItem").style.backgroundImage = `url(${"equipmentSystem/" + playerEquipmentSystem[type].img + ".png"})`;
  get("packbackSelectItemName").innerHTML = playerEquipmentSystem[type].name;
  get("packbackSelectItemIntroduction").innerHTML = playerEquipmentSystem[type].info;
  }else if(type=="food"){
    
  }else{
    get("packbackSelectItemDressup").innerHTML = "卸下";
    SelectEquipment = type;
    SelectEquipmentID = id;
    SelectEquipmentNum = num;
    get("packbackSelectItem").style.backgroundImage = `url(${"equipmentSystem/" + playerEquipmentSystem[type][num-1].img + ".png"})`;
    get("packbackSelectItemName").innerHTML = playerEquipmentSystem[type][num-1].name;
    get("packbackSelectItemIntroduction").innerHTML = playerEquipmentSystem[type][num-1].info;
  }
}
class weapon {
  constructor(name, type, info, star,img) {
    this.name = name;
    this.type = type;
    this.info = info;
    this.star = star;
    this.img = img;
  }
}
var ns = new weapon('新手技能','ae','給新手用的技能',1,'0007')
inventoryBackpack.push(ns)
inventoryBackpack.push(ns)
inventoryBackpack.push(ns)
inventoryBackpack.push(ns)
var nw = new weapon('新手武器','af','給新手使用的武器',1,"0000")
inventoryBackpack.push(nw)
inventoryBackpack.push(nw)
inventoryBackpack.push(nw)
var nw = new weapon('新手裝備','aa','給新手使用的裝備',1,"0001")
inventoryBackpack.push(nw)
inventoryBackpack.push(nw)
var nw = new weapon('新手裝備','ab','給新手使用的裝備',1,"0002")
inventoryBackpack.push(nw)
inventoryBackpack.push(nw)
var nw = new weapon('新手裝備','ac','給新手使用的裝備',1,"0003")
inventoryBackpack.push(nw)
inventoryBackpack.push(nw)
var nw = new weapon('新手裝備','ad','給新手使用的裝備',1,"0004")
inventoryBackpack.push(nw)
inventoryBackpack.push(nw)
function ItemDressup() {
  if(get("packbackSelectItemDressup").innerHTML=="裝備"){
      if (packbackSelectItemi.length != 0) {
      if (inventoryBackpack[packbackSelectItemi].type == "aa") {
        if (playerEquipmentSystem["ArmorHelmet"] == "") {
          playerEquipmentSystem["ArmorHelmet"] = inventoryBackpack[packbackSelectItemi];
          get("packbackArmorHelmet").style.backgroundImage = `url(${"equipmentSystem/" + inventoryBackpack[packbackSelectItemi].img + ".png"})`;
          inventoryBackpack.splice(packbackSelectItemi , 1);
        } else {
          inventoryBackpack.push(playerEquipmentSystem["ArmorHelmet"]);
          playerEquipmentSystem["ArmorHelmet"] = inventoryBackpack[packbackSelectItemi];
          get("packbackArmorHelmet").style.backgroundImage = `url(${"equipmentSystem/" + inventoryBackpack[packbackSelectItemi].img + ".png"})`;
          inventoryBackpack.splice(packbackSelectItemi , 1);
        }
      } else if (inventoryBackpack[packbackSelectItemi].type == "ab") {
        if (playerEquipmentSystem["ArmorChestplate"] == "") {
          playerEquipmentSystem["ArmorChestplate"] = inventoryBackpack[packbackSelectItemi];
          get("packbackArmorChestplate").style.backgroundImage = `url(${"equipmentSystem/" + inventoryBackpack[packbackSelectItemi].img + ".png"})`;
          inventoryBackpack.splice(packbackSelectItemi , 1);
        } else {
          inventoryBackpack.push(playerEquipmentSystem["ArmorChestplate"]);
          playerEquipmentSystem["ArmorChestplate"] = inventoryBackpack[packbackSelectItemi];
          get("packbackArmorChestplate").style.backgroundImage = `url(${"equipmentSystem/" + inventoryBackpack[packbackSelectItemi].img + ".png"})`;
          inventoryBackpack.splice(packbackSelectItemi , 1);
        }
      } else if (inventoryBackpack[packbackSelectItemi].type == "ac") {
        if (playerEquipmentSystem["ArmorLeggings"] == "") {
          playerEquipmentSystem["ArmorLeggings"] = inventoryBackpack[packbackSelectItemi];
          get("packbackArmorLeggings").style.backgroundImage = `url(${"equipmentSystem/" + inventoryBackpack[packbackSelectItemi].img + ".png"})`;
          inventoryBackpack.splice(packbackSelectItemi , 1);
        } else {
          inventoryBackpack.push(playerEquipmentSystem["ArmorLeggings"]);
          playerEquipmentSystem["ArmorLeggings"] = inventoryBackpack[packbackSelectItemi];
          get("packbackArmorLeggings").style.backgroundImage = `url(${"equipmentSystem/" + inventoryBackpack[packbackSelectItemi].img + ".png"})`;
          inventoryBackpack.splice(packbackSelectItemi , 1);
        }
      } else if (inventoryBackpack[packbackSelectItemi].type == "ad") {
        if (playerEquipmentSystem["ArmorBoots"] == "") {
          playerEquipmentSystem["ArmorBoots"] = inventoryBackpack[packbackSelectItemi];
          get("packbackArmorBoots").style.backgroundImage = `url(${"equipmentSystem/" + inventoryBackpack[packbackSelectItemi].img + ".png"})`;
          inventoryBackpack.splice(packbackSelectItemi , 1);
        } else {
          inventoryBackpack.push(playerEquipmentSystem["ArmorBoots"]);
          playerEquipmentSystem["ArmorBoots"] = inventoryBackpack[packbackSelectItemi];
          get("packbackArmorBoots").style.backgroundImage = `url(${"equipmentSystem/" + inventoryBackpack[packbackSelectItemi].img + ".png"})`;
          inventoryBackpack.splice(packbackSelectItemi , 1);
        }
      } else if (inventoryBackpack[packbackSelectItemi].type == "ae") {
        if(playerEquipmentSystem.skill.length<3){
          playerEquipmentSystem.skill.push(inventoryBackpack[packbackSelectItemi]);
          get("packbackPlayerSkill"+(playerEquipmentSystem.skill.length)).style.backgroundImage = `url(${"equipmentSystem/" + inventoryBackpack[packbackSelectItemi].img + ".png"})`;
          inventoryBackpack.splice(packbackSelectItemi , 1);
        }
      }else if (inventoryBackpack[packbackSelectItemi].type == "af") {
        if(playerEquipmentSystem.Equipment.length<2){
          playerEquipmentSystem.Equipment.push(inventoryBackpack[packbackSelectItemi]);
          get("packbackPlayerWeapon"+(playerEquipmentSystem.Equipment.length)).style.backgroundImage = `url(${"equipmentSystem/" + inventoryBackpack[packbackSelectItemi].img + ".png"})`;
          inventoryBackpack.splice(packbackSelectItemi , 1);
        }
      }else if (inventoryBackpack[packbackSelectItemi].type == "ag") {
        if(playerEquipmentSystem.Food.length<10){
          playerEquipmentSystem.Food.push(inventoryBackpack[packbackSelectItemi]);
          get("packbackPlayerFood").style.backgroundImage = `url(${"equipmentSystem/" + inventoryBackpack[packbackSelectItemi].img + ".png"})`;
          inventoryBackpack.splice(packbackSelectItemi , 1);
        }
      }
    }
  }else if(get("packbackSelectItemDressup").innerHTML=="卸下"){
    if(SelectEquipment != ""){
      if(SelectEquipmentNum == "") {
        get(SelectEquipmentID).style.backgroundImage = `url(${SelectEquipmentID+".png"})`;
        inventoryBackpack.push(playerEquipmentSystem[SelectEquipment]);
        playerEquipmentSystem[SelectEquipment] = "";
      }else {
        if(SelectEquipment=="skill"){
          for(var i=1 ;i<=3;i++){
            get(SelectEquipmentID.substr(0,SelectEquipmentID.length-1) + i).style.backgroundImage = `url(${SelectEquipmentID.substr(0,SelectEquipmentID.length-1)+".png"})`;
          }
          inventoryBackpack.push(playerEquipmentSystem[SelectEquipment][SelectEquipmentNum-1]);
          playerEquipmentSystem[SelectEquipment].splice(SelectEquipmentNum-1 , 1);
          for(var i=1 ;i<=playerEquipmentSystem[SelectEquipment].length;i++){
            get(SelectEquipmentID.substr(0,SelectEquipmentID.length-1) + i).style.backgroundImage = `url(${"equipmentSystem/"+playerEquipmentSystem[SelectEquipment][i-1].img+".png"})`;
          }
        }else if(SelectEquipment=="Equipment"){
          for(var i=1 ;i<=2;i++){
            get(SelectEquipmentID.substr(0,SelectEquipmentID.length-1) + i).style.backgroundImage = `url(${SelectEquipmentID.substr(0,SelectEquipmentID.length-1)+".png"})`;
          }
          inventoryBackpack.push(playerEquipmentSystem[SelectEquipment][SelectEquipmentNum-1]);
          playerEquipmentSystem[SelectEquipment].splice(SelectEquipmentNum-1 , 1);
          for(var i=1 ;i<=playerEquipmentSystem[SelectEquipment].length;i++){
            get(SelectEquipmentID.substr(0,SelectEquipmentID.length-1) + i).style.backgroundImage = `url(${"equipmentSystem/"+playerEquipmentSystem[SelectEquipment][i-1].img+".png"})`;
          }
        }
      }
    }
  }
  get("inventory").remove();
  backpack();
}
function shop() {

}