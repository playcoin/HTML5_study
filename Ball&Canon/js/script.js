/**
 * 所有js代码
 * @author playcoin
 */

var cwidth = 1000;
var cheight = 400;
var rad = 10;
var ctx;
var everything = [];
var iballx = 20;
var ibally = 290;
var horverlocity;
var verticalvel1;
var verticalvel2;
// 两个方向的阻力
var horagainst = 1;
var veragainst = 0.1;

var tid;
var frameTime = 100;
var gravity = 2;

function Ball(sx, sy, rad, stylestring){
	this.sx = sx;
	this.sy = sy;
	this.rad = rad;
	this.draw = drawball;
	this.moveit = moveball;
	this.fillstyle = stylestring;

	function drawball(ctx){
		ctx.fillStyle = this.fillstyle;
		ctx.beginPath();

		// 如果超过了，就在前面再画一个
		if(this.sx - this.rad < cwidth && this.sx + this.rad > cwidth){
			ctx.arc(this.sx - cwidth, this.sy, this.rad, 0, Math.PI * 2, true);
		}
		if(this.sx - this.rad >= cwidth){
			this.sx = this.sx - cwidth;
		}

		ctx.arc(this.sx, this.sy, this.rad, 0, Math.PI * 2, true);

		ctx.fill();
	}

	// 只需要改变位置，由draw函数进行绘制
	function moveball(dx, dy){
		this.sx += dx;
		this.sy += dy;
	}
}

var cball = new Ball(iballx, ibally, rad, "rgb(250,0,0)");

// 大炮，先默认长宽和颜色
function Myrectangle(sx, sy, swidth, sheight, stylestring){
	this.sx = sx;
	this.sy = sy;
	this.swidth = swidth;
	this.sheight = sheight;
	this.stylestring = stylestring;

	// 画长方形
	this.draw = function(ctx){
		ctx.fillStyle = this.stylestring;
		ctx.fillRect(this.sx, this.sy, this.swidth, this.sheight);
	}
}

//var target = new Myrectangle(300, 100, 80, 200, "rgb(0,5,90)");
var ground = new Myrectangle(0, 300, 1000, 30, "rgb(10, 250, 0)");

everything.push(ground);
//everything.push(target);
everything.push(cball);

// 初始化 画图
function init() {
	ctx = document.getElementById('canvas').getContext('2d');

	drawall();
}

// 画所有的对象
function drawall(){
	ctx.clearRect(0, 0, cwidth, cheight);

	for(var i=0; i < everything.length; i++){
		everything[i].draw(ctx);
	}
}

// 开火，开始让球动起来，
function fire(){
	// 计算速度
	horverlocity = Number(document.getElementById("hv").value);
	verticalvel1 = Number(document.getElementById("vv").value);

	tid = setInterval(change, frameTime);

	return false;
}


function change(){
	// 计算球的位置
	dx = horverlocity;
	horverlocity = horverlocity - 0.1 > 0 ? horverlocity - 0.1 : 0;
	verSpeedDelta =
	verticalvel2 = verticalvel1 + gravity - veragainst * verticalvel1;
	dy = (verticalvel1 + verticalvel2) / 2;
	verticalvel1 = verticalvel2;
	if((cball.sy+dy+rad) >= ground.sy){
		dy = ground.sy - cball.sy - rad;
		verticalvel1 = -verticalvel1;
	}
//	console.log(verticalvel1);

	cball.moveit(dx, dy);

	// 碰撞检测
	// 碰到了
//	if(cball.sx >= target.sx && (cball.sy <= (target.sx + target.swidth)) && (cball.sy >= target.sy) && (cball.sy <= (target.sy + target.sheight))){
//		clearInterval(tid);
//	}
	// 没碰到掉地上了
//	if(cball.sy >= ground.sy){
//		clearInterval(tid);
//	}
	drawall();
}


function sign(x){
	return x >= 0 ? 1 : -1;
}
