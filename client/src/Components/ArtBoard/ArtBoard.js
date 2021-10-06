import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './ArtBoard.css';
import DraggableCard from '../Draggable/DraggableCard';
import pencil from './assests/pencil.svg';
import text from './assests/text (2).svg';
import eraser from './assests/eraser.svg';
import picture from './assests/Picture.svg';
import pencilBold from './assests/pencilOneUse.svg';
import textBold from './assests/TextOnUse.svg';
import eraserBold from './assests/eraserOnUse.svg';
import pictureBold from './assests/PictureInUse.svg';
import {
  createImagePitcher,
  createTextPitcher,
  getPitchers,
} from '../../API/pitcher';
import Pusher from 'pusher-js';

const ArtBoard = ({ cleanSignal }) => {
  const [input, setInput] = useState('');
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const whiteRef = useRef(null);
  const socketRef = useRef();
  const projectId = useParams();
  const [pitchers, setPitchers] = useState([]);
  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const handleImage = async (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
    }

    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    formData.append('projectId', projectId.projectId);
    createImagePitcher(formData).then((response) => {
      console.log(response);
      setImage(false);
    });
  };

  const sendPitcher = (e) => {
    e.preventDefault();

    let body = {
      x: 300,
      y: 300,
      projectId: projectId.projectId,
      pitcherContent: input,
      pitcherType: 'text',
    };

    createTextPitcher(body).then((response) => {
      setInput('');
    });
  };

  useEffect(() => {
    getPitchers(projectId.projectId).then((response) => {
      if (response.success) {
        setPitchers(response.pitchers);
      }
    });
  }, []);

  const fetchCards = () => {
    getPitchers(projectId.projectId).then((response) => {
      if (response.success) {
        setPitchers(response.pitchers);
      }
    });
  };

  useEffect(() => {
    const pusher = new Pusher('44f5dfd1d0a381447e26', {
      cluster: 'ap2',
    });

    var channel = pusher.subscribe('pitchers');
    channel.bind('please', function (data) {
      fetchCards();
    });
  }, []);

  const [switchPencil, setPencil] = useState(true);
  const [switchEraser, setEraser] = useState(false);
  const [switchText, setSwitchText] = useState(false);
  const [switchImage, setImage] = useState(false);
  const [openColorBox, setOpenColorBox] = useState(false);
  const [eraserCur, setEraserCur] = useState('');

  useEffect(() => {
    console.log(projectId);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const colors = document.getElementsByClassName('color');

    let current = {
      color: 'black',
    };

    const onColorUpdate = (e) => {
      current.color = e.target.className.split(' ')[1];
    };

    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', onColorUpdate, false);
    }

    let drawing = false;

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      if (color === '#f2f2f2') {
        context.lineWidth = 40;
      } else {
        context.lineWidth = 4;
      }
      //context.lineWidth = 4;
      context.stroke();
      context.closePath();

      if (!emit) {
        return;
      }

      const w = canvas.width;
      const h = canvas.height;

      socketRef.current.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
        projectId,
      });
    };

    const onMouseDown = (e) => {
      drawing = true;
      current.x = e.clientX;
      current.y = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!drawing) {
        return;
      }
      drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
      current.x = e.clientX;
      current.y = e.clientY;
    };

    const onMouseUp = (e) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
    };

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      if (data.projectId.projectId === projectId.projectId) {
        drawLine(
          data.x0 * w,
          data.y0 * h,
          data.x1 * w,
          data.y1 * h,
          data.color
        );
      }
    };
    socketRef.current = io.connect('http://localhost:4000/');
    socketRef.current.on('drawing', onDrawingEvent);
  }, [cleanSignal]);

  const whiteClicked = () => {
    whiteRef.current.click();
    setOpenColorBox(false);
  };

  const switchToPencil = () => {
    setEraser(false);
    setImage(false);
    setSwitchText(false);
    setPencil(true);
    setOpenColorBox(!openColorBox);
    setEraserCur('');
  };
  const switchToEraser = () => {
    setOpenColorBox(false);
    setEraser(true);
    setImage(false);
    setSwitchText(false);
    setPencil(false);
    whiteClicked();
    setEraserCur('eraser');
  };
  const switchToText = () => {
    setOpenColorBox(false);
    setEraser(false);
    setImage(false);
    setSwitchText(!switchText);
    setPencil(false);
    setEraserCur('');
  };
  const switchToImage = () => {
    setOpenColorBox(false);
    setEraserCur('');
    setEraser(false);
    setImage(true);
    setSwitchText(false);
    setPencil(false);
  };

  return (
    <div className='artboard'>
      <canvas
        className={`artboard__container ${eraserCur}`}
        ref={canvasRef}></canvas>

      <div className='artboard__newSettings'>
        <div onClick={switchToPencil}>
          {switchPencil ? (
            <img className='artboard__icon' src={pencilBold} />
          ) : (
            <img className='artboard__icon' src={pencil} />
          )}
        </div>
        <div onClick={switchToEraser}>
          {switchEraser ? (
            <img
              className='color #f2f2f2 white artboard__icon'
              src={eraserBold}
              ref={colorsRef}
            />
          ) : (
            <img className='artboard__icon' src={eraser} />
          )}
        </div>
        <div onClick={switchToText}>
          {switchText ? (
            <img className='artboard__icon' src={textBold} />
          ) : (
            <img className='artboard__icon' src={text} />
          )}
        </div>
        <div onClick={switchToImage}>
          {switchImage ? (
            <img className='artboard__icon' src={pictureBold} />
          ) : (
            <img
              className='artboard__icon'
              src={picture}
              onClick={pickImageHandler}
            />
          )}
        </div>
      </div>
      <div className='artboard__settings'>
        <div
          onClick={() => setOpenColorBox(!openColorBox)}
          ref={colorsRef}
          className={`colors ${openColorBox ? '' : 'hidden'}`}>
          <div className='color #101522 black' />
          <div className='color #de3c4b red' />
          <div className='color #59cd90 green' />
          <div className='color #1768ec blue' />
          <div className='color #eac435 yellow' />
          <div className='color #f2f2f2 white hidden' ref={whiteRef} />
        </div>

        {switchText && (
          <form className='input_container'>
            <input
              className='input'
              type='text'
              id='name'
              name='name'
              value={input}
              placeholder='Enter pitcher'
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              className='pitcher_button'
              onClick={sendPitcher}
              type='submit'>
              Send a message
            </button>
          </form>
        )}
      </div>

      <input
        style={{ display: 'none' }}
        ref={filePickerRef}
        type='file'
        className='newProduct__input'
        id='image'
        name='image'
        placeholder='Choose the image'
        accept='.jpg,.png,.jpeg'
        onChange={handleImage}
      />

      {pitchers.map((pitch) =>
        pitch.pitcherType === 'text' ? (
          <DraggableCard
            _id={pitch._id}
            name={pitch.pitcherContent}
            xaxis={pitch.x}
            yaxis={pitch.y}
          />
        ) : (
          <DraggableCard
            _id={pitch._id}
            name={pitch.pitcherContent}
            xaxis={pitch.x}
            yaxis={pitch.y}
            image='yes'
          />
        )
      )}
    </div>
  );
};

export default ArtBoard;
