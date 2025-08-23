console.log('Hello World!');

function col(element1, element2) {
  // Получаем координаты и размеры элементов  
  const x1 = element1.offsetLeft;
  const y1 = element1.offsetTop;
  const width1 = element1.offsetWidth;
  const height1 = element1.offsetHeight;
  
  const x2 = element2.offsetLeft;
  const y2 = element2.offsetTop;
  const width2 = element2.offsetWidth;
  const height2 = element2.offsetHeight;
  
  // Проверяем, пересекаются ли границы элементов  
  return !(x1 + width1 < x2 ||
    x2 + width2 < x1 ||
    y1 + height1 < y2 ||
    y2 + height2 < y1);
}

function pause() {
  if (mode == "life") {
    let p = document.getElementById('pausEff')
    p.style.animation = "pausS 1s"
    setTimeout(function() {
      p.style.animation = ""
    }, 1000)
    
    resum = !resum
  }
}

let mode = "life"

let time = 0

const game = setInterval(function() {
  if (resum && mode == "life")
    time += 1
  document.getElementById("time").innerText = `время: ${time}`
}, 1000)


let plr = document.getElementById("player")

let resum = true

let pos = {x: innerWidth/2,y: innerHeight*0.1
}

plr.addEventListener("touchmove", function(e) {
  if (resum) {
    let t = e.changedTouches[0]
    
    plr.style.left = t.clientX + "px"
    
    pos.x = t.clientX
    
    plr.style.top = t.clientY + "px"
    
    pos.y = t.clientY
  }
})

function death() {
  mode = 'death'
  let win = document.createElement("div")
  let ws = win.style
  
  ws.position = "fixed"
  ws.width = "90%"
  ws.left = "5%"
  ws.top = "30%"
  ws.height = "200px"
  ws.background = "#999090"
  ws.animation = "spawn 1s"
  ws.border = "5px solid grey"
  ws.borderRadius = "16px"
  ws.zIndex = '10'
  
  document.body.appendChild(win)
  
  let res = document.createElement('img')
  let rs = res.style
  
  rs.position = 'absolute'
  rs.left = '50%'
  rs.top = "50%"
  res.src = "res.png"
  rs.width = '500px'
  rs.height = '500px'
  rs.marginLeft = "-250px"
  rs.marginTop = "-250px"
  res.addEventListener('touchstart', function(e) {
    location.reload()
  })
  
  win.appendChild(res)
  
  let tlbl = document.createElement('p')
  let ts = tlbl.style
  
  ts.fontWeight = "bold"
  ts.position = 'absolute'
  ts.left = '10px'
  tlbl.innerText = "время: " + time
  
  win.appendChild(tlbl)
  
  plr.remove()
}


class Enemy {
  
  constructor(size, speed) {
    this.size = size
    this.speed = speed
    
    let bul = document.createElement("div")
    
    let bs = bul.style
    
    bs.position = 'fixed'
    bs.left = Math.floor(Math.random() * innerWidth) - this.size / 2 + "px"
    bs.bottom = -this.size + "px"
    bs.width = this.size + "px"
    bs.height = this.size + "px"
    bs.background = "#0000ff"
    bs.borderRadius = "100px"
    bs.border = '3px solid black'
    
    
    document.body.appendChild(bul)
    
    
    
    let count = 0
    
    const fly = setInterval(function() {
      if (resum) {
        count += 10
        
        bs.bottom = count + "px"
        
        if (count == 800) {
          bul.remove()
          new Enemy(100, 15)
        }
        
        if (col(plr, bul)) {
          clearInterval(fly)
          bul.remove()
          setTimeout(function(){
            death()
          }, 100)
        }
      }
      
    }, this.speed)
  }
  
}



new Enemy(100, 15)






let bgb = document.getElementById('bgbig')

let bgs = document.getElementById('bgsmall')

let bigy = 0
const bigFall = setInterval(function() {
  if (resum) {
    bigy -= 5
    
    bgb.style.top = bigy + "px"
    
    if (bigy == -1000) {
      bigy = 0
    }
  }
  
}, 10)






let smally = 0
const smallfall = setInterval(function() {
  if (resum) {
    smally -= 3
    
    bgs.style.top = smally + "px"
    
    if (smally <= -1000) {
      smally = 0
    }
  }
  
}, 10)

function tail() {
  
  let partic = document.createElement("div")
  
  let ps = partic.style
  
  ps.background = 'lime'
  ps.width = '50px';
  ps.height = '50px';
  ps.border = '5px solid black';
  ps.borderRadius = '100px';
  ps.position = 'fixed'
  ps.opacity = '100%'
  ps.left = pos.x - 25 + 'px'
  ps.top = pos.y - 25 + 'px'
  ps.zIndex = 4
  
  
  document.body.appendChild(partic)
  
  
  let op = 100
  
  const death = setInterval(function() {
    
    
    op -= 10
    
    ps.opacity = op + '%'
    
    if(op == 0){
      clearInterval(death)
    }
    
  }, 50)
  
  setTimeout(function(){partic.remove()}, 1000)
}

const animate = setInterval(function(){
  
  tail()
  
}, 50)

