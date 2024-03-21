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

function changeBackground(index) {
  // Set the background index attribute of the body element
  document.body.setAttribute('bg-index', index);
}

// Function to start the background loop with a delay between iterations
function startBackgroundLoop() {
  // Define the maximum index
  var maxIndex = 10; // Change this to the desired maximum index

  // Start the loop with an initial index of 0
  loopWithDelay(0);

  // Function to loop through indices with a delay
  function loopWithDelay(index) {
    // Call the changeBackground function with the current index
    changeBackground(index);

    // Check if it's the last index, if so, stop the loop
    if (index === maxIndex) {
      return;
    }

    // Schedule the next iteration with a delay of 0.1 seconds (100 milliseconds)
    setTimeout(function () {
      loopWithDelay(index + 1);
    }, 250);
  }
}

function changeContent(index) {
  // Update the picked-one attribute of the content element
  document.getElementById('content').setAttribute('picked-one', index);
}

//
//マウスストーカー

//requestAnimationFrameのフレームレート制限
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

function cursor() {
  // Check if device supports fine pointer
  if (!matchMedia('(pointer: fine)').matches) {
    return; // Exit if device doesn't support fine pointer
  }

  const targetPointer = document.getElementById('js-cursor');
  if (!targetPointer) {
    return; // Exit if target element doesn't exist
  }

  const targetPointerClassList = targetPointer.classList;

  let anime;
  const posi = { x: 0, y: 0 }; // Pointer position
  const start = { x: 0, y: 0 }; // Starting position
  const delay = { x: 0, y: 0 }; // Delay for smooth movement
  const delayRatio = 0.85; // Delay ratio for smooth movement

  let isRender = false;
  let isStopAnime = false;
  let limitFlames = new LimitFlames(60); // Frame rate limiter

  // Function to set position of pointer
  function setPosition(x, y) {
    targetPointer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  // Function to round a value to one decimal place
  function roundValue(value) {
    return Math.round(value * 10) / 10;
  }

  // Rendering function for smooth movement
  function render(timestamp) {
    if (isStopAnime) {
      return; // Stop rendering if animation is stopped
    }
    // Limit to 60fps
    if (limitFlames.isLimitFlames(timestamp)) {
      startAnime(); // Start animation
      return;
    }
    // Smooth movement calculation
    delay.x *= delayRatio;
    delay.y *= delayRatio;
    const x = posi.x + roundValue(delay.x);
    const y = posi.y + roundValue(delay.y);
    setPosition(x, y); // Set position of pointer

    if (posi.x === x) {
      isStopAnime = true; // Stop animation if pointer position is not changing
    }
    startAnime(); // Continue animation
  }

  // Function to start animation
  function startAnime() {
    anime = requestAnimationFrame(render);
  }

  // Function to add a CSS class to the pointer
  function addCursorClass(className) {
    targetPointerClassList.add(className);
  }

  // Function to remove a CSS class from the pointer
  function removeCursorClass(className) {
    targetPointerClassList.remove(className);
  }

  // Event listener for mouse movement
  document.addEventListener('mousemove', function (e) {
    posi.x = e.clientX;
    posi.y = e.clientY;

    if (isStopAnime) {
      startAnime(); // Start animation if stopped
      isStopAnime = false;
    }

    if (!isRender) {
      setPosition(posi.x, posi.y);
      addCursorClass('is-active');
      startAnime();
      isRender = true; // Pointer is rendered
    } else {
      delay.x += start.x - posi.x;
      delay.y += start.y - posi.y;
    }
    start.x = posi.x;
    start.y = posi.y;
  });

  // Function to focus on links/buttons
  function focusLink() {
    const linkItems = document.querySelectorAll('a, button, img, .menu-item, .btn');
    if (linkItems.length === 0) {
      return;
    }
    const FOCUS_CLASS = 'is-focus';
    linkItems.forEach(function (linkItem) {
      linkItem.addEventListener('mouseenter', function () {
        addCursorClass(FOCUS_CLASS);
      });
      linkItem.addEventListener('mouseleave', function () {
        removeCursorClass(FOCUS_CLASS);
      });
    });
  }
  focusLink(); // Call focusLink function

  // Function to deactivate pointer when hovering over iframes
  function deActiveIframe() {
    const iframeItems = document.querySelectorAll('iframe');
    if (iframeItems.length === 0) {
      return;
    }
    const HIDDEN_CLASS = 'is-hidden';
    iframeItems.forEach(function (iframeItem) {
      iframeItem.addEventListener('mouseenter', function () {
        addCursorClass(HIDDEN_CLASS);
      });
      iframeItem.addEventListener('mouseleave', function () {
        removeCursorClass(HIDDEN_CLASS);
      });
    });
  }
  deActiveIframe(); // Call deActiveIframe function
}

cursor(); // Call cursor function to initialize
