const STEPS = 0.0005;
const X_MIN = 0;
const X_MAX = 8;
const Y_MIN = 0;
const Y_MAX = 6;
const PIXELS_PER_UNIT = 100;

const dots = [];

const createNewDot = (x, y) => {
    const newDot = document.createElement('div');
    newDot.classList.add('dot');
    newDot.style.left = x * PIXELS_PER_UNIT + 'px';
    newDot.style.bottom = y * PIXELS_PER_UNIT + 'px';
    return newDot;
};

const getGraphFunction = (keyCode) => {
    switch (keyCode) {
        case 81: // key 'q'
            return x => x;
        case 87: // key 'w'
            return x => x * x;
        case 69: // key 'e'
            return x => (x - 1) * (x - 3) * (x - 7);
        case 82: // key 'r'
            return x => 5 * Math.exp(-1 * x);
        case 84: // key 't'
            return x => 2 * Math.log(x);
        case 89: // key 'y'
            return x => Math.tan(x);
        default:
            return ;
    }
};

const isDotInRange = (x, y) => {
    return (X_MIN <= x) && (x <= X_MAX) && (Y_MIN <= y) && (y <= Y_MAX);
};

const removeDots = () => {
    const graphSheet = document.getElementById('graph-sheet');
    for (let dotElement of dots) {
        graphSheet.removeChild(dotElement);
    }
    while (dots.length) dots.pop();
};

document.addEventListener('keydown', (event) => {
    const graphSheet = document.getElementById('graph-sheet');
    const graphFunction = getGraphFunction(event.keyCode);

    if (!graphFunction) return ;

    removeDots();
    for (let x = X_MIN; x <= X_MAX; x += STEPS) {
        const y = graphFunction(x);
        if (isDotInRange(x, y)) {
            const newDot = createNewDot(x, y);
            graphSheet.appendChild(newDot);
            dots.push(newDot);
        }
    }
});
