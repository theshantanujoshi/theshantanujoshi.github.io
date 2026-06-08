// Sterile Audio Feedback Engine for SYSTEM.CORE portfolio
// Uses native Web Audio API oscillators for click feedback on user actions.

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export function toggleAudioEngine(state?: boolean): boolean {
  if (state !== undefined) {
    soundEnabled = state;
  } else {
    soundEnabled = !soundEnabled;
  }
  
  if (soundEnabled && !audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API is not supported in this environment");
    }
  }
  return soundEnabled;
}

export function isAudioEngineActive(): boolean {
  return soundEnabled;
}

// 1. Precise Mechanical Click
export function playClickSound() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime); // High frequency pop
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {
    // Graceful catch for constrained iframe or restricted permissions
  }
}

// 2. High Frequency Hover Chirp
export function playHoverTick() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.008, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.01);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.01);
  } catch (e) {
    // Graceful catch
  }
}

// 3. Systemic Boot up chord
export function playBootSound() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const notes = [200, 300, 400, 850]; // Architectural chord frequencies

    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.03);
      
      gain.gain.setValueAtTime(0.0, now);
      gain.gain.linearRampToValueAtTime(0.02, now + idx * 0.03 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.03);
      osc.stop(now + idx * 0.03 + 0.15);
    });
  } catch (e) {
    // Graceful catch
  }
}
