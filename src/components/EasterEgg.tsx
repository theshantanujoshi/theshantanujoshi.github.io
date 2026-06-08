import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export default function EasterEgg() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [showEgg, setShowEgg] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the new key to the sequence
      const newSequence = [...sequence, e.key];
      
      // Keep only the last N keys where N is the length of the Konami code
      if (newSequence.length > KONAMI_CODE.length) {
        newSequence.shift();
      }
      
      setSequence(newSequence);

      // Check if it matches
      if (newSequence.join(',') === KONAMI_CODE.join(',')) {
        setShowEgg(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sequence]);

  return (
    <AnimatePresence>
      {showEgg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          <button
            onClick={() => setShowEgg(false)}
            className="absolute top-8 right-8 text-white z-50 p-4 bg-zinc-900/50 hover:bg-zinc-800 rounded-full transition-colors backdrop-blur-md"
          >
            <X size={32} />
          </button>
          
          <iframe
            src="https://matias.ma/nsfw/"
            className="w-full h-full border-none"
            allow="autoplay; fullscreen"
            title="Easter Egg"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
