// Loader Section
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.classList.add("loader-hidden");

    const transitionEndHandler = () => {
      document.body.removeChild(loader);
      loader.removeEventListener("transitionend", transitionEndHandler);
    };

    loader.addEventListener("transitionend", transitionEndHandler);
  }, 3000);
});

// Mouse Cursor Section
var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a, img, .btn');

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click')
  cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
})

// Mouse Events Handling
function handleMouseEvents(containerId, itemClass, datasetName) {
  const container = document.getElementById(containerId);

  let timeoutId;

  Array.from(document.getElementsByClassName(itemClass))
    .forEach((item, index) => {
      item.onmouseover = () => {
        container.dataset[datasetName] = index;
        clearTimeout(timeoutId);
      };

      item.onmouseleave = () => {
        timeoutId = setTimeout(() => {
          delete container.dataset[datasetName];
        }, 2000);
      };
    });
}

handleMouseEvents("menu", "menu-item", "activeIndex");
handleMouseEvents("foot", "foot-item", "activeIndex");

// Background Loop Section
function startBackgroundLoop() {
  var maxIndex = 10; // Change this to the desired maximum index

  loopWithDelay(0);

  function loopWithDelay(index) {
    changeBackground(index);

    if (index === maxIndex) {
      return;
    }

    setTimeout(function () {
      loopWithDelay(index + 1);
    }, 250);
  }
}

function changeBackground(index) {
  document.body.setAttribute('bg-index', index);
}

// Content and Form Section
function changeContent(index) {
  document.getElementById('content').setAttribute('picked-one', index);
}

function callForm(index) {
  document.getElementById('portefolio').setAttribute('form-folio', index);
}

// Mouse Stalker Section
class LimitFlames {
  constructor(framesPerSecond) {
    this.interval = Math.floor(1000 / framesPerSecond);
    this.previousTime = performance.now();
  }
  isLimitFlames(timestamp) {
    const deltaTime = timestamp - this.previousTime;
    const isLimitOver = deltaTime <= this.interval;
    if (!isLimitOver) {
      this.previousTime = timestamp - (deltaTime % this.interval);
    }
    return isLimitOver;
  }
}

// Text Scramble Section
class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

const phrases = [
  'Bienvenue,'
];

const el = document.querySelector('.text-change')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1200)
  })
  counter = (counter + 1) % phrases.length
}

next()
