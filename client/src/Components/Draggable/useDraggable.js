import { useState, useEffect } from 'react';
import { update } from '../../API/pitcher';
import Pusher from 'pusher-js';

export default function useDraggable(el, xaxis, yaxis, _id) {
  const [{ dx, dy }, setOffset] = useState({ dx: xaxis, dy: yaxis });

  useEffect(() => {
    const pusher = new Pusher('44f5dfd1d0a381447e26', {
      cluster: 'ap2',
    });

    var channel = pusher.subscribe('pitchers');
    channel.bind('pitcherUpdate', function (data) {
      console.log(data);
      console.log('here');
      if (_id === data.message.identity._id) {
        setOffset({ dx: data.message.x, dy: data.message.y });
      }
    });
  }, []);

  const updatePitcher = (data) => {
    update(data).then((response) => {
      console.log(response.data);
    });
  };

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

          const data = {
            _id: _id,
            xaxis: dx,
            yaxis: dy,
          };
          console.log('DATA', data);
          updatePitcher(data);
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
