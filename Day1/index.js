let playerstate='idle';
const dropdown=document.getElementById('animations');
dropdown.addEventListener('change',function(e){
    playerstate=e.target.value;
})

const canvas = document.getElementById("a");
const ctx = canvas.getContext("2d");
console.log(ctx);
const CANVAS_HEIGHT=canvas.height=550;
const CANVAS_WIDTH=canvas.width=550;
const playerImage=new Image();
playerImage.src='shadow_dog.png';
const spritwidth=575;
const spritheight=523;

let gameframe=0;
const staggerframe=5;
 const spritanimations=[];
 const animationstates=[
    {
        name:'idle',
        frames:7,
    },
    {
        name:'jump',
        frames:7,
    },
    {
        name:'fall',
        frames:7,
    },
    {
        name:'run',
        frames:7,
    },
    {
        name:'dizzy',
        frames:11,
    },
    {
        name:'sit',
        frames:5,
    },
    {
        name:'roll',
        frames:7,
    },
    {
        name:'bite',
        frames:7,
    },
    {
        name:'ko',
        frames:12,
    },
    {
        name:'gethit',
        frames:4,
    }

];
animationstates.forEach((state,index)=>{
    let frames={
        loc:[],
    }
        for(let j=0;j<state.frames;j++)
        {
            let positionx=j*spritwidth;
            let positiony=index*spritheight;
            frames.loc.push({x:positionx,y:positiony});
        }
        spritanimations[state.name]=frames;
    
});
console.log(spritanimations);
function animate()
{
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    let position =Math.floor(gameframe/staggerframe)%spritanimations[playerstate].loc.length;
    let framx=spritwidth*position;
    let framy=spritanimations[playerstate].loc[position].y;
    ctx.drawImage(playerImage,framx,framy,spritwidth,spritheight,0,0,spritwidth,spritheight);
    gameframe++;
    requestAnimationFrame(animate);
};
animate();