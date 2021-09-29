import { useState, useEffect } from 'react';
//import services from '../services';
//import Pusher from 'pusher-js';

export default function useDraggable(el, xaxis, yaxis, _id) {
  const [{ dx, dy }, setOffset] = useState({ dx: xaxis, dy: yaxis });

  /*useEffect(() => {
    const pusher = new Pusher('4a9719cb17f8a5fbaa96', {
      cluster: 'ap2',
    });

    var channel = pusher.subscribe('pitchers');
    channel.bind('updated', function (data) {
      //alert(JSON.stringify(data));
      console.log('data received', data);
      if (_id === data._id._id) {
        setOffset({ dx: data.message.xaxis, dy: data.message.yaxis });
      }
    });
  }, []);*/

  /*const update = (data) => {
    services.update(data).then((response) => {
      console.log(response.data);
    });
  };*/

  useEffect(() => {
    const handleMouseDown = (event) => {
      const startX = event.pageX - dx;
      const startY = event.pageY - dy;

      const handleMouseMove = (event) => {
        const newDx = event.pageX - startX;
        const newDy = event.pageY - startY;
        setOffset({ dx: newDx, dy: newDy });
      };

      document.addEventListener('mousemove', handleMouseMove);

      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener('mousemove', handleMouseMove);

          /*const data = {
            _id: _id,
            xaxis: dx,
            yaxis: dy,
          };
          update(data);*/
          console.log(dx, dy);
        },
        { once: true }
      );
    };

    el.current.addEventListener('mousedown', handleMouseDown);

    return () => {
      if (el.current) {
        el.current.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [dx, dy]);

  useEffect(() => {
    el.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }, [dx, dy]);
}
