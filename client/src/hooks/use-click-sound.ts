export function useClickSound() {
  const playClickSound = () => {
    // Create a subtle click sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create oscillator for sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Set frequency (soft, subtle click)
      oscillator.frequency.value = 600;
      oscillator.type = 'sine';
      
      // Set volume (very quiet, subtle effect)
      gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
      
      // Play sound
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.08);
    } catch (error) {
      // Silently fail if audio context is not available
    }
  };

  return { playClickSound };
}
