'use client';

import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { BsVolumeUp } from 'react-icons/bs';

const TextToSpeechBtn = ({ sentence }: { sentence: string }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;
  let voice: SpeechSynthesisVoice | null = null;
  const loadVoice = () => {
    const voices = synth.getVoices();
    voice = voices[0];
  };

  if ('onvoiceschanged' in synth) {
    synth.onvoiceschanged = loadVoice;
  } else {
    loadVoice();
  }

  const utterance = new SpeechSynthesisUtterance(sentence);

  utterance.voice = voice;
  utterance.onstart = () => setIsSpeaking(true);
  utterance.onend = () => setIsSpeaking(false);
  utterance.onerror = e => {
    console.error('error', e);
  };
  const speak = () => {
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      synth.speak(utterance);
    }
  };

  return (
    <Button
      onPress={speak}
      isIconOnly
      variant="bordered"
      radius="full"
      color={isSpeaking ? 'primary' : 'default'}
      size="sm"
    >
      <BsVolumeUp size={18} />
    </Button>
  );
};

export default TextToSpeechBtn;
