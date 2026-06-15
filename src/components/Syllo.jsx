import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Syllo.css';

export default function Syllo({ message, pose = 'wave', show = true, delay = 0.5 }) {
  const [blinking, setBlinking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(show), delay * 1000);
    return () => clearTimeout(timer);
  }, [show, delay]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  const getPoseClass = () => {
    switch (pose) {
      case 'think': return 'syllo-thinking';
      case 'point': return 'syllo-pointing';
      case 'celebrate': return 'syllo-celebrating';
      case 'stamp': return 'syllo-stamping';
      case 'magnify': return 'syllo-magnifying';
      default: return 'syllo-waving';
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`syllo-container ${getPoseClass()}`}
          initial={{ y: 80, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        >
          {/* Speech bubble */}
          {message && (
            <motion.div
              className="syllo-speech"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p>{message}</p>
              <div className="syllo-speech-arrow" />
            </motion.div>
          )}

          {/* Owl body */}
          <div className="syllo-owl">
            {/* Graduation cap */}
            <div className="syllo-cap">
              <div className="syllo-cap-top" />
              <div className="syllo-cap-tassel">
                <div className="syllo-cap-tassel-string" />
                <div className="syllo-cap-tassel-end" />
              </div>
            </div>

            {/* Head */}
            <div className="syllo-head">
              {/* Ear tufts */}
              <div className="syllo-ear syllo-ear-left" />
              <div className="syllo-ear syllo-ear-right" />
              
              {/* Face */}
              <div className="syllo-face">
                {/* Glasses */}
                <div className="syllo-glasses">
                  <div className="syllo-glass syllo-glass-left">
                    <div className={`syllo-eye ${blinking ? 'blink' : ''}`}>
                      <div className="syllo-pupil" />
                    </div>
                  </div>
                  <div className="syllo-glass-bridge" />
                  <div className="syllo-glass syllo-glass-right">
                    <div className={`syllo-eye ${blinking ? 'blink' : ''}`}>
                      <div className="syllo-pupil" />
                    </div>
                  </div>
                </div>
                {/* Beak */}
                <div className="syllo-beak" />
              </div>
            </div>

            {/* Body */}
            <div className="syllo-body">
              <div className="syllo-chest-pattern" />
              {/* Wings */}
              <div className={`syllo-wing syllo-wing-left ${pose === 'wave' ? 'waving' : ''} ${pose === 'point' ? 'pointing' : ''}`}>
                {pose === 'point' && <div className="syllo-pointer-stick" />}
              </div>
              <div className={`syllo-wing syllo-wing-right ${pose === 'celebrate' ? 'celebrating' : ''}`}>
                {pose === 'celebrate' && <div className="syllo-flag">🎓</div>}
              </div>
              {/* Clipboard */}
              {(pose === 'wave' || pose === 'stamp' || pose === 'magnify') && (
                <div className="syllo-clipboard">
                  <div className="syllo-clipboard-clip" />
                  <div className="syllo-clipboard-lines">
                    <div /><div /><div />
                  </div>
                  {pose === 'magnify' && <div className="syllo-magnifying-glass">🔍</div>}
                  {pose === 'stamp' && (
                    <motion.div 
                      className="syllo-stamp"
                      initial={{ y: -20, rotate: -10 }}
                      animate={{ y: 0, rotate: 0 }}
                      transition={{ delay: 0.8, type: 'spring', damping: 8 }}
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Feet */}
            <div className="syllo-feet">
              <div className="syllo-foot syllo-foot-left" />
              <div className="syllo-foot syllo-foot-right" />
            </div>
          </div>

          {/* Thinking bubbles */}
          {pose === 'think' && (
            <div className="syllo-think-bubbles">
              <motion.div
                className="syllo-think-bubble syllo-think-bubble-1"
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="syllo-think-bubble syllo-think-bubble-2"
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div
                className="syllo-think-bubble syllo-think-bubble-3"
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
