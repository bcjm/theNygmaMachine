import React, {Component} from 'react';
import '../styles/Maze.css'

// Maze.js breakdown
// constructor
// canvas setup (f)
// movePlayer (f)
// swipe event handler (f)
// componentDidMount
// componentUnMount
// componentDidUpdate
// render

class Maze extends Component {
  constructor() {
    super();

    // maze path is set in state
    // touchstart and touchend keys are for touch event handler
    this.state = {
      maze: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [-1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 9],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],

      touchstartX: 0,
      touchstartY: 0,
      touchendX: 0,
      touchendY: 0,
    }
  }

  // canvas setup
  updateMaze = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const img = this.refs.img;

    // used a forEach nbd
    // nested forEach iterates through nested array
    // '-1' is the player
    // '0' is the path
    // '1' is the wall
    // '9' is the end point
    // we use value parameter to iterate through all of the nested arrays
    // we use the index parameter to indicate position in our conditional statements
    this.state.maze.forEach((y, yIndex) => {
      y.forEach((x, xIndex) => {
        if (x === 1) {
          ctx.fillStyle = "black";
          ctx.fillRect(xIndex * 40, yIndex * 40, 40, 40);
        }
        else if (x === 0) {
          ctx.fillStyle = "#193508";
          ctx.fillRect(xIndex * 40, yIndex * 40, 40, 40);
        }
        else if (x === -1) {    
          ctx.drawImage(img, xIndex * 40, yIndex * 40, 40, 40);    
        }
        else if (x === 9) {
          ctx.fillStyle = "#193508";
          ctx.fillRect(xIndex * 40, yIndex * 40, 40, 40);
        }
      })
    })
  }

  // move player function
  movePlayer = (e) => {
    e.preventDefault();
    const keyPressed = e.keyCode;
    const copyOfMaze = [...this.state.maze];

    // go through copyOfMaze array to find current position of player
      // '-1' is the player
      // '0' is the path
      // '1' is the wall
      // '9' is the end point
    // break is used to stop looping - if loop continued then the player position (which is -1) will keep on getting updated as the loop continues
    // next steps would be to refactor into switch case logic

    // keypress is the right arrow/'d' button will move div right
    if (keyPressed === 39 || keyPressed === 68) {
      for (let y = 0; y < copyOfMaze.length; y++) {
        for (let x = 0; x < copyOfMaze[y].length; x++) {
          if (copyOfMaze[y][x] === -1 && copyOfMaze[y][x + 1] === 0) {
            copyOfMaze[y][x] = 0;
            copyOfMaze[y][x + 1] = -1;
            break;
          }

          // alert when the user has reached the end point (goal) of the maze
          // this would be added to all keypress events if we decided to put end of maze in locations other than the right side
          if (copyOfMaze[y][x] === -1 && copyOfMaze[y][x + 1] === 9) {
            copyOfMaze[1][0] = -1;
            copyOfMaze[y][x] = 0;
            this.props.updatePage();
          }
        }
      }
    }  
  
    // keypress is the left arrow/'a' button will move div left
    if (keyPressed === 37 || keyPressed === 65) {
      for (let y = 0; y < copyOfMaze.length; y++) {
        for (let x = 0; x < copyOfMaze[y].length; x++) {
          if (copyOfMaze[y][x] === -1 && copyOfMaze[y][x - 1] === 0) {
            copyOfMaze[y][x] = 0;
            copyOfMaze[y][x - 1] = -1;
            break;
          }
        }
      }
    }

    // keypress is the up arrow/'w' button will move div up
    if (keyPressed === 38 || keyPressed === 87) {
      for (let y = 0; y < copyOfMaze.length; y++) {
        for (let x = 0; x < copyOfMaze[y].length; x++) {
          if (copyOfMaze[y][x] === -1 && copyOfMaze[y - 1][x] === 0) {
            copyOfMaze[y][x] = 0;
            copyOfMaze[y - 1][x] = -1;
            break;
          }
        }
      }
    }

    // keypress is the down arrow/'s' button will move div down
    if (keyPressed === 40 || keyPressed === 83) {
      let didPlayerMove = false;

      for (let y = 0; y < copyOfMaze.length; y++) {
        for (let x = 0; x < copyOfMaze[y].length; x++) {
          if (copyOfMaze[y][x] === -1 && copyOfMaze[y + 1][x] === 0) {
            copyOfMaze[y][x] = 0;
            copyOfMaze[y + 1][x] = -1;
            didPlayerMove = true;
          }
        }

        // this is needed to prevent the loop from continuing down the y axis and changing the player position
        if (didPlayerMove) {
          break;
        }
      }
    }

    // run setState to cause re-render with updated maze info
    if (this.componentMounted) {
      this.setState({
        maze: copyOfMaze,
      })
    }
  }


  // touch event handler
  // will move player in maze on mobile
  swipeHandler = () => {
    const vertical = this.state.touchstartY - this.state.touchendY;
    const horizontal = this.state.touchendX - this.state.touchstartX;
    const copyOfMaze = [...this.state.maze];

    // swipe right
    if (Math.abs(horizontal) > Math.abs(vertical) && horizontal > 0) {
      for (let y = 0; y < copyOfMaze.length; y++) {
        for (let x = 0; x < copyOfMaze[y].length; x++) {
          if (copyOfMaze[y][x] === -1 && copyOfMaze[y][x + 1] === 0) {
            copyOfMaze[y][x] = 0;
            copyOfMaze[y][x + 1] = -1;
            break;
          }

          // alert when the user has reached the end point (goal) of the maze
          if (copyOfMaze[y][x] === -1 && copyOfMaze[y][x + 1] === 9) {
            copyOfMaze[1][0] = -1;
            copyOfMaze[y][x] = 0;
            this.props.updatePage();
          }
        }
      }
    }

    // swipe left
    if (Math.abs(horizontal) > Math.abs(vertical) && horizontal < 0) {
      for (let y = 0; y < copyOfMaze.length; y++) {
        for (let x = 0; x < copyOfMaze[y].length; x++) {
          if (copyOfMaze[y][x] === -1 && copyOfMaze[y][x - 1] === 0) {
            copyOfMaze[y][x] = 0;
            copyOfMaze[y][x - 1] = -1;
            break;
          }
        }
      }
    }

    // swipe up
    if (Math.abs(horizontal) < Math.abs(vertical) && vertical > 0) {
      for (let y = 0; y < copyOfMaze.length; y++) {
        for (let x = 0; x < copyOfMaze[y].length; x++) {
          if (copyOfMaze[y][x] === -1 && copyOfMaze[y - 1][x] === 0) {
            copyOfMaze[y][x] = 0;
            copyOfMaze[y - 1][x] = -1;
            break;
          }
        }
      }
    }

    // swipe down
    if (Math.abs(horizontal) < Math.abs(vertical) && vertical < 0) {
      let didPlayerMove = false;

      for (let y = 0; y < copyOfMaze.length; y++) {
        for (let x = 0; x < copyOfMaze[y].length; x++) {
          if (copyOfMaze[y][x] === -1 && copyOfMaze[y + 1][x] === 0) {
            copyOfMaze[y][x] = 0;
            copyOfMaze[y + 1][x] = -1;
            didPlayerMove = true;
          }
        }

        // this is needed to prevent the loop from continuing down the y axis and changing the player position
        if (didPlayerMove) {
          break;
        }
      }
    }

    // run setState to cause re-render with updated maze info
    if (this.componentMounted) {
      this.setState({
        maze: copyOfMaze,
      })
    }
  }


  // received a warning for a potential memory leak due to state changing on an unmounted component
  // it looks like this was happening because of where we have the location of setState in our movePlayer and swipeHandler methods.  
  // After the game is won (once the right key is pressed and we are at the end point), the code will continue to run and we call setState at the end of the method but at this point the component has un-mounted, which results in the warning.  Found this article which helped with the solution:  https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component
  // added a property when the component mounts to track if the component is mounted, and when it unmounts we change the value to false --> then we wrapped the setState call in a conditional to only run if this.componentMounted = true.
  componentDidMount() {
    this.componentMounted = true;

    this.updateMaze();

    // event listener on keydown
    document.addEventListener("keydown", this.movePlayer);

    document.addEventListener('touchstart', (e)=> {
      this.setState({
        touchstartX: e.changedTouches[0].screenX,
        touchstartY: e.changedTouches[0].screenY,
      })
    }, false);

    document.addEventListener('touchend', (e)=> {
      this.setState({
        touchendX: e.changedTouches[0].screenX,
        touchendY: e.changedTouches[0].screenY,
      })
      this.swipeHandler();
    }, false);
  }


  componentWillUnmount() {
    this.componentMounted = false;

    document.removeEventListener("keydown", this.movePlayer);
  }


  // when there are changes in state or props run the method to update the maze canvas
  componentDidUpdate() {
    this.updateMaze()
  }
  

  render() {
    return(
      <div className="mazeContainer">
        <h3 className="mazeTitle">This one could be solved by a monkey. But good luck, I guess.</h3>
          <p className="mazeInstructions">Use arrow or WASD keys to navigate on desktop, swipe on tablet or mobile.</p>
        {/* maze is styled within maze.js file, not in maze.css */}
        <div className="canvasContainer">
          <canvas ref="canvas" width="1200px" height="600px" className="maze"></canvas>
          {/* div is hidden because we need to get the batman sprite image on the page before we can paint it on the canvas */}
          <div className="hidden">
            <img src={require("../assets/batmanSprite.png")} alt="batman" ref="img" className="batman"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Maze;