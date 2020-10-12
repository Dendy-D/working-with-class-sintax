'use strict';

class Component {
  constructor(selector) {
    this.$d = document.querySelector(selector);
  }

  show() {
    this.$d.style.display = 'block';
  }

  hide() {
    this.$d.style.display = 'none';
  }

}

class Model extends Component {
  constructor(options) {
    super(options.selector);

    this.$d.style.position = 'absolute';

    this.$d.style.left = options.speed + 'px';
    this.$d.style.top = options.speed + 'px'

    this.$d.style.transform = `rotate(${options.rotate}deg)`
    this.$d.speed = options.speed;
  }

  move() {
    let right = 0;
    let top = 0;
    let moveCar = (event) => {
      if (event.code == 'ArrowRight' || event.code == 'KeyD') {
        right += this.$d.speed;
      }
      if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
        right -= this.$d.speed;
      }
      if (event.code == 'ArrowUp' || event.code == 'KeyW') {
        top -= this.$d.speed;
      }
      if (event.code == 'ArrowDown' || event.code == 'KeyS') {
        top += this.$d.speed;
      }
      this.$d.style.left = parseFloat(this.$d.style.left) + right + 'px';
      this.$d.style.top = parseFloat(this.$d.style.top) + top + 'px';
      right = 0;
      top = 0;
    };

    let moveCarPro = moveCar.bind(Model);

    document.addEventListener('keydown', moveCarPro);
  }
}

class Box extends Model {
  constructor(options) {
    super(options);

    this.$d.style.position = 'relative';

    this.$d.style.width = options.width + 'px';
    this.$d.style.height = options.height + 'px';
    this.$d.style.background = options.background;
    this.$d.style.borderRadius = options.radius + '%';

  }
}


class Circle extends Box {
  constructor(options) {
    super(options);

    this.$d.style.position = 'absolute';
    this.$d.style.right = options.right + 'px';
    this.$d.style.bottom = options.bottom + 'px';

    this.$d.style.borderRadius = options.radius + '%';
    this.$d.style.width = this.$d.style.height = options.size + 'px';
  }
}

let model = new Model({
  selector: '#model',
  speed: 30, // скорость машины
  rotate: 180, // угол поворота машины
});

let box = new Box({
  selector: '#box',
  width: 265, // ширина коробки
  height: 200, // высота коробки
  background: 'black', // цвет коробки
  radius: 100, // радиус коробки
});

let circleRight = new Circle({
  selector: '#circle1',
  size: 100, // размер колеса Правого
  right: -30, // позиция колеса по длине Правого
  bottom: -30, // позиция колеса по высоте Правого
  background: 'blue', // цвет колеса Правого
  radius: 70, // радиус колеса Правого
});

let leftRight = new Circle({
  selector: '#circle2',
  size: 80, // размер колеса Левого
  right: 201, // позиция колеса по длине Левого
  bottom: -35, // позиция колеса по высоте Левого
  background: 'blue', //  цвет колеса Левого
  radius: 60, // радиус колеса Левого
});

model.move();