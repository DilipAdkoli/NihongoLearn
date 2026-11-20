# Hiragana audio

`a.mp3`, `i.mp3`, `u.mp3`, `e.mp3` and `o.mp3` contain one synthesized Japanese mora each (あ, い, う, え and お). The `ka.mp3` through `ko.mp3` clips contain the K row (か, き, く, け and こ). All ten clips are bundled for offline playback.

NihongoLearn generated the clips with Open JTalk (`pyopenjtalk-plus` 0.4.1.post10) and HTS Voice “Mei”, released by the MMDAgent Project Team. The voice is © 2009–2013 Nagoya Institute of Technology, Department of Computer Science. The audio clips are distributed under Creative Commons Attribution 3.0 Unported. [Voice attribution](https://github.com/r9y9/pyopenjtalk/blob/master/pyopenjtalk/htsvoice/LICENSE_mei_normal.htsvoice) · [License](https://creativecommons.org/licenses/by/3.0/)

Each kana was synthesized in isolation at 0.85× speaking speed using the default `mei_normal` voice. The resulting phoneme was checked against the expected phonemes. The output was trimmed, normalized, and encoded as mono 44.1 kHz MP3 at 96 kb/s. These are synthesized examples and await human pronunciation review.
