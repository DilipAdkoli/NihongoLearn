export type VoiceClip = { uri: string; discard: () => void };

export type VoiceCapture = {
  stop: () => Promise<VoiceClip>;
  discard: () => void;
};
