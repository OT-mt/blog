var size = 50;
var player = null;
var game = null;
var maps = null;
var barriers = [];
var enemys = [];
var bombs = [];
var fires = [];
var weapons = [];
var createFire = 1;
var createFireMax = 150;
function Rect(x, y, width, height, id) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
    this.viewContent = document.createElement('div'); //创建一个div
    this.viewContent.id = this.id; //id传递给该div
    this.parent = document.getElementById('box'); //该div的父类
}
Rect.prototype.create = function () {
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.parent.appendChild(this.viewContent); //把他添加到父容器中
}
Rect.prototype.remove = function () {
    this.parent.removeChild(this.viewContent); //删除
}
Rect.prototype.hit = function (r) {
    var hitJudge = !(this.y + this.height <= r.y) && !(this.y >= r.y + r.height) && !(this.x + this.width <= r.x) &&
        !(this.x >= r.x + r.width);
    return hitJudge;
}

//人物
function Person() {
    this.top = false, this.bottom = false, this.left = false, this.right = false;
    this.person;
    this.jumpstate = false;
    this.onfloor = true;
    this.g = 0.14;
    this.vy = 0;
    this.vx = 0;
    this.dir = "left";
    this.live = true;
    this.win=false;
}
Person.prototype.init = function () {
    person = new Rect(50, 350, 50, 50, 'person')
    person.create();

}
Person.prototype.move = function () {
    if (this.vy > 0) {
        this.onfloor = false;
    }
    if (this.left) {
        this.vx = -4;
        person.x += this.vx;
        person.viewContent.style.background = "url(images/yasuoleft.png)";
    }
    if (this.right) {
        this.vx = 4;
        person.viewContent.style.background = "url(images/yasuoright.png)";
        if (person.x <= 500) {
            person.x += this.vx;
            for (let j = 0; j < enemys.length; j++) {    //x小于500时向右敌人的地图速度
                enemys[j].mapv = 0;
                enemys[j].move();
            }
        }
        else {
            for (let i = 0; i < barriers.length; i++) {
                barriers[i].x -= this.vx;
                if (barriers[i].id == 'dropBrick') {
                    barriers[i].rightState = true;
                    barriers[i].move();
                }
                else {
                    barriers[i].create();
                }

                if (barriers[i].x < -500 && barriers[i].id != 'dropBrick') {
                    barriers[i].remove();
                    barriers.splice(i, 1);
                }
            }
            for (let j = 0; j < enemys.length; j++) {//x大于500向右时地图速度
                enemys[j].mapv = -4;
                enemys[j].move();
            }
            for (let z = 0; z < bombs.length; z++) {
                bombs[z].bombBody.x -= 4;
            }
            for (let k = 0; k < fires.length; k++) {
                fires[k].firebody.x -= 4;
            }
            for (let l = 0; l < weapons.length; l++) {
                weapons[l].weaponBody.x -= 4;
            }
        }
    }
    else {
        for (let j = 0; j < enemys.length; j++) {//敌人向左或静止时
            enemys[j].mapv = 0;
            enemys[j].move();
        }

    }
    for (let z = 0; z < weapons.length; z++) {
        weapons[z].move();
        if(weapons[z].weaponBody.x<-500){
            weapons[z].weaponBody.remove();
            weapons.splice(z,1);
        }
    }
    for (let k = 0; k < bombs.length; k++) {
        bombs[k].move();
        if(bombs[k].bombBody.x<-500){
          bombs[k].bombBody.remove();
          weapons.splice(k,1);
        }
    }
    for (let l = 0; l < fires.length; l++) {
        fires[l].move();
        if(fires[l].firebody.x<-500){
            fires[l].firebody.remove();
            fires.splice(l,1);
        }
    }
    for(let n=0;n<enemys.length;n++){
        if(enemys[n].enePerson.x<-500){
            enemys[n].enePerson.remove;
            enemys.splice(n,1);
        }
    }
    person.create(); //重新传递参数
    this.jump();
    this.crash();
    if (!this.live) {//死亡
        game.again();
        game.over();
    }
    if(this.win){
        game.again();
        game.over();
    }
}
Person.prototype.jump = function () {
    person.y += this.vy;
    this.vy += this.g;
    if (this.vy > 4) {
        this.vy = 4;
    }
}
Person.prototype.crash = function () {//碰撞检测
    for (let i = 0; i < barriers.length; i++) {
        if (barriers[i].id == 'dropBrick' && person.hit(barriers[i])) {
            this.live = false;
        }
        if (barriers[i].id == 'dropEnemy' && person.x - barriers[i].x > 5) {//产生敌人
            for (let z = 0; z < 3; z++) {
                var enemydrop = new Enemy(barriers[i].x + z * 50 + 150, -100, "left");
                enemydrop.init();
                enemys.push(enemydrop);
            }
            barriers[i].remove;
            barriers.splice(i, 1);
        }
        if (person.hit(barriers[i])) {
            if(barriers[i].id=="sign"){
                this.win=true;
            }
            if (barriers[i].y - person.y >= 45 && this.vy > 0 && barriers[i].x - person.x >= -barriers[i].width + 5
                && barriers[i].x - person.x <= 45 && barriers[i].id != 'whiteBrick') {//向下 
                this.onfloor = true;
                person.y = barriers[i].y - size;
                this.vy = 0;
            }
            if (person.y - barriers[i].y >= 45 && this.vy < 0 && barriers[i].x - person.x >= -barriers[i].width + 5
                && barriers[i].x - person.x <= 45) {//向上
                person.y = barriers[i].y + size;
                this.vy = 0;
                if (barriers[i].id == 'whiteBrick') {                //空白砖块
                    var barrier = new Rect(barriers[i].x, barriers[i].y, size, size, 'specialBrick');
                    barrier.create();
                    barriers[i].remove();
                    barriers.splice(i, 0, barrier);
                }
                if (barriers[i].id == 'on-off') {
                    barriers[i].viewContent.style.background = "url(images/offTwo.png)";
                    createFireMax = 20;
                    createFire = 1;
                }
                if (barriers[i].id == 'questionBrick') {    //敌人
                    var enemy = new Enemy(barriers[i].x, barriers[i].y - size, 'right');
                    enemy.init();
                    enemys.push(enemy);
                    barriers[i].id = 'specialBrick';
                    barriers[i].viewContent.style.background = "url(images/specialBrick.png)";
                }

            }
            if (barriers[i].x - person.x > 45 && barriers[i].y - person.y < 45
                && barriers[i].y - person.y > -barriers[i].height + 5 && barriers[i].id != 'whiteBrick') {//向右
                person.x = barriers[i].x - size;
            }
            if (barriers[i].x - person.x < -barriers[i].width + 5 && barriers[i].y - person.y < 45
                && barriers[i].y - person.y > -barriers[i].height + 5 && barriers[i].id != 'whiteBrick') {//向左

                person.x = barriers[i].x + barriers[i].width + 1;
            }
        }
        if (barriers[i].id == 'cannon') {//新建炮弹
            if (bombs.length == 0) {
                var bomb = new Bomb(barriers[i].x + size, barriers[i].y);
                bomb.init();
                bombs.push(bomb);
            }

        }
        if (barriers[i].id == 'dropBrick') {//坠落墙的下落条件判断及删除
            if (person.x - barriers[i].x >= 120)
                barriers[i].dropState = true;
            barriers[i].moveY();
            if (barriers[i].y >= 600) {
                barriers.splice(i, 1);
            }

        }
        for (let k = 0; k < bombs.length; k++) {//碰撞后删除炮弹
            if (barriers[i].id != 'cannon' && barriers[i].id != 'dropBrick' && barriers[i].hit(bombs[k].bombBody)) {
                bombs[k].dieState = true;
                bombs[k].die();
                bombs.splice(k, 1);
            }
        }
        if (barriers[i].id == 'pipeLong') {//新建火球
            createFire++;
            if (createFire == createFireMax) {
                var fire = new Fire(barriers[i].x + 25, barriers[i].y - 50);
                fire.init();
                fires.push(fire);
                createFire = 1;
            }
        }
        if (barriers[i].id != "dropBrick" && barriers[i].id != "whiteBrick") {
            for (let z = 0; z < weapons.length; z++) {
                if (barriers[i].hit(weapons[z].weaponBody)) {
                    weapons[z].die();
                    weapons.splice(z, 1);
                    continue;
                }
                for (let s = 0; s < enemys.length; s++) {
                    if (weapons[z].weaponBody.hit(enemys[s].enePerson)) {
                        weapons[z].weaponBody.remove();
                        enemys[s].enePerson.remove();
                        weapons.splice(z, 1);
                        enemys.splice(s, 1);

                    }
                }
            }
        }

    }
    for (let j = 0; j < bombs.length; j++) {
        if (person.hit(bombs[j].bombBody)) {
            if (person.x + size > bombs[j].bombBody.x && person.y + size > bombs[j].bombBody.y && bombs[j].bombBody.x + size > person.x
                && bombs[j].bombBody.y + 5 > person.y) {//向下
                this.vy = 0;
                person.y = bombs[j].bombBody.y - size;
                this.onfloor = true;
            }
            else if (person.x + size > bombs[j].bombBody.x && person.y + size > bombs[j].bombBody.y + 5 && bombs[j].bombBody.x + 5 > person.x
                && bombs[j].bombBody.y + 45 > person.y) {//向右
                this.vx = 0;
                person.x = bombs[j].x - size;
            }
            else if (person.x + size > bombs[j].bombBody.x && person.y + size > bombs[j].bombBody.y + 45 && bombs[j].bombBody.x + size > person.x
                && bombs[j].bombBody.y + size > person.y) {//向上
                this.vy = 0;
                person.y = bombs[j].y + size;
            }
            else if (person.x + size > bombs[j].bombBody.x + 45 && person.y + size > bombs[j].bombBody.y + 5 && bombs[j].bombBody.x + size > person.x
                && bombs[j].bombBody.y + 45 > person.y) {//向左
                this.vx = 0;
                person.x = bombs[j].x + size;
            }
        }
    }
    for (let k = 0; k < fires.length; k++) {//超过高度删除火球
        if (fires[k].firebody.hit(person)) {
            this.live = false;
        }
        if (fires[k].firebody.y > 600) {
            fires[k].firebody.remove();
            fires.splice(k, 1);
        }
    }
    for (let j = 0; j < enemys.length; j++) {
        if (enemys[j].enePerson.hit(person)) {
            this.live = false;
        }
    }
    if (person.x < 0) {//后边界
        person.x = 0;
    }
    if (person.y > 700) {
        this.live = false;
    }
}
Person.prototype.shoot = function () {  //发射子弹
    if (this.dir == "right") { var weapon = new Weapon(person.x + size, person.y - 20, this.dir); }
    else if (this.dir == "left") {
        var weapon = new Weapon(person.x - 40, person.y - 20, this.dir);
    }
    weapon.init();
    weapons.push(weapon);
}
Person.prototype.again=function(){
    for(let i=0;i<barriers.length;i++){
        if(barriers[i].id!="dropBrick"){
            barriers[i].x=-1000;  
            barriers[i].create();
        }
        else{
            barriers[i].y=700;
        }

    }
    for (let z = 0; z < weapons.length; z++) {
        weapons[z].weaponBody.x=-700;
        weapons[z].weaponBody.create();
    }
    for (let l = 0; l < fires.length; l++) {
        fires[l].firebody.x=-700;
        fires[l].firebody.create();
    }
    for(let n=0;n<enemys.length;n++){
       enemys[n].enePerson.x=-700;
       enemys[n].enePerson.create();
    }
}
player = new Person();
player.init();

//         敌人
function Enemy(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.enePerson;
    this.vx = 4;
    this.mapv;
    this.onfoot = true;
    this.vy = 5;

}
Enemy.prototype.init = function () {
    this.enePerson = new Rect(this.x, this.y, size, size, 'enemy');
    this.enePerson.create();
}
Enemy.prototype.move = function () {
    if (this.dir == "right") { this.vx = 3; this.enePerson.viewContent.style.background = "url(images/enemyRight.gif)"; }
    else if (this.dir == "left") { this.vx = -3; this.enePerson.viewContent.style.background = "url(images/enemyLeft.gif)"; }
    this.enePerson.x += this.mapv;
    this.enePerson.x += this.vx;
    this.enePerson.y += this.vy;
    this.enePerson.create();
    this.crash();
}
Enemy.prototype.crash = function () {
    for (let i = 0; i < barriers.length; i++) {
        if (barriers[i].id != "dropBrick" && this.enePerson.hit(barriers[i])) {
            if (barriers[i].x + 5 > this.enePerson.x && barriers[i].y + 50 > this.enePerson.y
                && this.enePerson.x + 50 > barriers[i].x && this.enePerson.y + 50 > barriers[i].y + 5) {
                this.enePerson.x = barriers[i].x - size;
                this.dir = "left";
            }
            if (barriers[i].x + 50 > this.enePerson.x && barriers[i].y + 5 > this.enePerson.y
                && this.enePerson.x + 50 > barriers[i].x && this.enePerson.y + 50 > barriers[i].y) {
                this.enePerson.y = barriers[i].y - 50;
            }
            if (barriers[i].x + 50 > this.enePerson.x && barriers[i].y + 50 > this.enePerson.y &&
                this.enePerson.x + 50 > barriers[i].x+45 && this.enePerson.y + 50 > barriers[i].y + 4) {
                this.enePerson.x = barriers[i].x + 50;
                this.dir = "right";
            }
        }
    }
}

//火棍
function Fire(x, y) {
    this.x = x;
    this.y = y;
    this.width;
    this.height;
    this.firebody;
    this.g = 0.15;
    this.dir = parseInt(Math.random() * 2);
    this.vy = Math.random(0.5) + 5;
}
Fire.prototype.init = function () {
    this.firebody = new Rect(this.x, this.y, size, size, 'fire');
    this.firebody.create();
}
Fire.prototype.move = function () {
    if (this.dir == 0) {
        this.firebody.x += 1;
    }
    else if (this.dir == 1) {
        this.firebody.x -= 1;
    }
    this.firebody.y -= this.vy;
    this.vy -= this.g;
    this.firebody.create();
}
Fire.prototype.die = function () {
    this.firebody.remove();
}
// 下落的墙
function DropBrick(x, y, width, height, id) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
    this.dropState = false;
    this.rightState = false;
    this.DropBrickBody;
}
DropBrick.prototype.init = function () {
    this.DropBrickBody = new Rect(this.x, this.y, size * 5, size, this.id);
    this.DropBrickBody.create();
}
DropBrick.prototype.move = function () {
    if (this.rightState) {
        this.DropBrickBody.x -= 4;
    }
    this.DropBrickBody.create();
}
DropBrick.prototype.moveY = function () {
    if (this.dropState) {
        this.DropBrickBody.y += 3;
        this.y += 3;
    }
    this.DropBrickBody.create();
    if (this.y >= 600) {
        this.DropBrickBody.remove();
    }
}
//炮弹
function Bomb(x, y) {
    this.x = x;
    this.y = y;
    this.bombBody;
    this.dieState;
}
Bomb.prototype.init = function () {
    this.bombBody = new Rect(this.x, this.y, size, size, 'bomb');
    this.bombBody.create();
}
Bomb.prototype.move = function () {
    this.bombBody.x += 3;
    this.bombBody.create();
}
Bomb.prototype.die = function () {
    if (this.dieState) {
        this.bombBody.remove();
    }
}
//武器
function Weapon(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.vx = 6;
    this.weaponBody;
}
Weapon.prototype.init = function () {
    this.weaponBody = new Rect(this.x, this.y, 40, 70, 'weapon');
    this.weaponBody.create();
}
Weapon.prototype.move = function () {
    if (this.dir == "right") {
        this.weaponBody.x += this.vx;
        this.weaponBody.viewContent.style.background = "url(images/weaponRight.png)";
    }
    else if (this.dir == "left") {
        this.weaponBody.x -= this.vx;
        this.weaponBody.viewContent.style.background = "url(images/weaponLeft.png)";
    }
    this.weaponBody.create();
}
Weapon.prototype.die = function () {
    this.weaponBody.remove();
}


function Map() {//1地面，2问号砖块，3石头，4普通砖块,5短管道，6长管道,7敌人，8空白砖块，9下降砖块
    //10炮管，11开关，12胜利标志，13敌人，14下降敌人标志
    this.map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 4, 0, 0, 1, 1],
        [0, 0, 0, 0, 4, 0, 0, 0, 1, 1],
        [0, 2, 0, 0, 2, 8, 0, 0, 1, 1],
        [0, 4, 0, 0, 4, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 4, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 13, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [9, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 8, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 3, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 8, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 4, 4, 4, 4, 0, 0, 0, 0],
        [0, 4, 4, 4, 4, 0, 0, 0, 0, 0],
        [0, 4, 4, 4, 0, 0, 0, 0, 1, 1],
        [0, 4, 4, 0, 0, 0, 0, 0, 1, 1],
        [0, 4, 4, 0, 0, 0, 5, 0, 1, 1],
        [0, 4, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 4, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 3, 3, 3, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 5, 0, 1, 1],
        [0, 0, 0, 8, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 8, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [9, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [9, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [9, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [9, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 3, 3, 1, 1],
        [0, 0, 0, 0, 0, 0, 3, 3, 1, 1],
        [0, 0, 0, 0, 0, 8, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 8, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 8, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 8, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 5, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 10, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 5, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 11, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 6, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 3, 1, 1],
        [0, 0, 0, 0, 0, 0, 3, 3, 1, 1],
        [0, 0, 0, 0, 0, 3, 3, 3, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 3, 1, 1],
        [0, 0, 0, 0, 0, 0, 3, 3, 1, 1],
        [0, 0, 0, 0, 0, 3, 3, 3, 1, 1],
        [14, 0, 0, 0, 3, 3, 3, 3, 1, 1],
        [0, 0, 0, 3, 3, 3, 3, 3, 1, 1],
        [0, 0, 3, 3, 3, 3, 3, 3, 1, 1],
        [0, 3, 3, 3, 3, 3, 3, 3, 1, 1],
        [0, 3, 3, 3, 3, 3, 3, 3, 1, 1],
        [0, 3, 3, 3, 3, 3, 3, 3, 1, 1],
        [0, 3, 3, 3, 3, 3, 3, 3, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 12, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1]

    ]
}
Map.prototype.init = function () {//1地面，2问号砖块，3石头，4普通砖块,5短管道，6长管道,7敌人，8空白砖块，9下降砖块
    //10炮管，11开关，12胜利标志，13敌人，14下降敌人标志

    for (let i = 0; i < this.map.length; i++) {
        for (let j = 0; j < this.map[0].length; j++) {
            if (this.map[i][j] == 1) {
                var barrier = new Rect(i * 50, j * 50, 50, 50, 'floor'); barrier.create();
                barriers.push(barrier);
            }
            else if (this.map[i][j] == 2) {
                var barrier = new Rect(i * 50, j * 50, 50, 50, 'questionBrick');
                barrier.create(); barriers.push(barrier);
            }
            else if (this.map[i][j] == 3) {
                var barrier = new Rect(i * 50, j * 50, 50, 50, 'stone');
                barrier.create(); barriers.push(barrier);
            }
            else if (this.map[i][j] == 4) {
                var barrier = new Rect(i * 50, j * 50, 50, 50, 'brick');
                barrier.create(); barriers.push(barrier);
            }
            else if (this.map[i][j] == 5) {
                var barrier = new Rect(i * 50, j * 50, 100, 100, 'pipeShort');
                barrier.create(); barriers.push(barrier);
            }
            else if (this.map[i][j] == 6) {
                var barrier = new Rect(i * 50, j * 50, 100, 150, 'pipeLong');
                barrier.create(); barriers.push(barrier);
            }
            else if (this.map[i][j] == 7) {
                var enemy = new Enemy(i * 50, j * 50, "right"); enemy.init();
                enemys.push(enemy);
            }
            else if (this.map[i][j] == 8) {
                var barrier = new Rect(i * 50, j * 50, 50, 50, 'whiteBrick');
                barrier.create(); barriers.push(barrier);
            }
            else if (this.map[i][j] == 9) {
                var barrier = new DropBrick(i * 50, j * 50, 250, 50, 'dropBrick'); barrier.init();
                barriers.push(barrier);
            }
            else if (this.map[i][j] == 10) {
                var barrier = new Rect(i * 50, j * 50, 100, 100, 'cannon'); barrier.create();
                barriers.push(barrier);
            }
            else if (this.map[i][j] == 11) {
                var barrier = new Rect(i * 50, j * 50, 50, 50, 'on-off'); barrier.create();
                barriers.push(barrier);
            }
            else if (this.map[i][j] == 12) {
                var barrier = new Rect(i * 50, j * 50, 100, 100, 'sign'); barrier.create();
                barriers.push(barrier);
            }
            else if (this.map[i][j] == 13) {
                var enemy = new Enemy(i * 50, j * 50, 50, 50, 'left'); enemy.init();
                enemys.push(enemy);
            }
            else if (this.map[i][j] == 14) {
                var barrier = new Rect(i * 50, -500, 1, 1, 'dropEnemy'); barrier.create();
                barriers.push(barrier);
            }

        }
    }
}
maps = new Map();
maps.init();


function Game() {
}
Game.prototype.init = function () {
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 37:
                player.left = true;
                player.vx = 4;
                player.dir = "left";
                break;
            case 39:
                player.right = true;
                player.vx = -4;
                player.dir = "right";
                break;
            case 38:
                if (player.onfloor) {
                    player.onfloor = false;
                    player.vy = -7;
                }
                break;

        }
    }
    document.onkeyup = function (event) {
        switch (event.keyCode) {
            case 37:
                player.left = false;
                player.vx = 0;
                break;
            case 39:
                player.vx = 0;
                player.right = false;
                break;
            case 32:
                player.shoot();
                break;
        }
    }
}
Game.prototype.play = function () {//开始游戏按钮
    var setButton = document.getElementsByTagName("button");
    for (let j = 0; j < setButton.length; j++)
        setButton[j].style.display = "none";
    var setJP = document.getElementsByClassName('JPanel');
    for (let i = 0; i < setJP.length; i++)
        setJP[i].style.display = "none";
    if (!player.live) {
               player.again();
        createFireMax = 150;
        person.remove();
        maps.init();
        player.init();
        player.live=true;
    }
    player.win=false;
    gameState = setInterval("player.move()", 20);
    
}
Game.prototype.again = function () {
    var setJP = document.getElementsByClassName('JPanel');
    if(!player.live){
        var setButton = document.getElementsByTagName("button");
        for (let j = 0; j < setButton.length; j++)
            setButton[j].style.display = "block";
        for (let i = 0; i < setJP.length; i++){
            setJP[i].style.display = "block";
            setJP[i].style.background="url(images/bgTwo.png)";
        }
    }
    if(player.win){
        for (let i = 0; i < setJP.length; i++){
            setJP[i].style.display = "block";
            setJP[i].style.background="url(images/bgWin.png)";
        }
    }


}
Game.prototype.over = function () {//游戏结束
    clearInterval(gameState);
}
Game.prototype.exit = function () {//退出游戏
    var r = confirm("是否退出游戏？");
    if (r == true) {
        window.close();
    }
}
Game.prototype.explain = function () {//游戏说明面板
    var setExplain = document.getElementsByClassName('explain');
    for (let i = 0; i < setExplain.length; i++)
        setExplain[i].style.display = "block";
    var explainClose = document.getElementsByClassName('explainClose');
    for (let j = 0; j < explainClose.length; j++)
        explainClose[j].style.display = "block";
}
Game.prototype.explainClose = function () {//游戏说明面板
    var setExplain = document.getElementsByClassName('explain');
    for (let i = 0; i < setExplain.length; i++)
        setExplain[i].style.display = "none";
    var explainClose = document.getElementsByClassName('explainClose');
    for (let j = 0; j < explainClose.length; j++)
        explainClose[j].style.display = "none";
}
game = new Game();
game.init();
