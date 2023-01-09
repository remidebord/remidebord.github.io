---
layout: post
title: "Use AI for lyrics transcription"
author: 'Rémi Debord'
comments: true
---

Things are moving fast on AI side, i think mainly about [DALL-E](https://openai.com/dall-e-2/) or [ChatGPT](https://openai.com/blog/chatgpt/).

Recently i needed some support on the transription of several James Ray lyrics, as sometimes recordings are not so great and it could be difficult to understand some words due to the rythm or intonations.

I discovered that OpenAI is also working on a tool called [Whisper](https://openai.com/blog/whisper/), capable of speech recognition, so why not give a try for lyrics transcription.

### Whisper installation (Ubuntu)

Steps are defined in their github [repository](https://github.com/openai/whisper), so the following will be a copy/paste, with few additions.

First, let's get install Python (requirement: Python 3.7 or later) and ffmpeg.
```bash
sudo apt install python python-is-python3 ffmpeg
```
Now, we can install rust
```bash
pip install setuptools-rust
```
And finally, Whisper
```bash
pip install git+https://github.com/openai/whisper.git 
```
> Note: you may need to start a new shell or restart your computer in order to have Whisper added to your PATH.

### How to use it ?

It's pretty easy, you will need to indicate audio file(s), a model type, small, medium or large (larger is the model, more accurate will be the transcription, theorically...), and language used in the audio file.

```bash
red@DESKTOP-QD37HPC:~$ whisper 'James Ray - You Remember The Face.mp3' --model medium --language English
[00:00.000 --> 00:10.000]  You remember the face of a friend
[00:10.000 --> 00:18.000]  By the fun, by the fun that happened
[00:18.000 --> 00:27.000]  And darling, I remember you, you, you
[00:27.000 --> 00:35.000]  Oh, you're a good, good friend, but you're more a good lover too
[00:35.000 --> 00:44.000]  You remember the face of someone
[00:44.000 --> 00:52.000]  By the deeds, by the deeds they have done
[00:52.000 --> 01:00.000]  And darling, I remember you, you, you
[01:00.000 --> 01:09.000]  Oh, the sweet, sweet way you thrill me through and through
[01:09.000 --> 01:18.000]  Darling, I remember all of you
[01:18.000 --> 01:26.000]  And I remember everything I still do
[01:26.000 --> 01:34.000]  You remember the face of a girl
[01:34.000 --> 01:42.000]  If she changes, if she changes your world
[01:42.000 --> 01:50.000]  And darling, I remember you, you, you
[01:50.000 --> 02:13.000]  Oh, you changed my world, that's why I'm so in love with you
```

Transcription is printed, but Whisper will also put it in three different files (*.txt, *.srt, *.vtt).

```bash
red@DESKTOP-QD37HPC:~$ ll
...
-rw-r--r--  1 root root 5439620 Jan  7 17:05 'James Ray - You Remember The Face.mp3'
-rw-r--r--  1 red  red     1054 Jan 10 00:09 'James Ray - You Remember The Face.mp3.srt'
-rw-r--r--  1 red  red      587 Jan 10 00:09 'James Ray - You Remember The Face.mp3.txt'
-rw-r--r--  1 red  red      945 Jan 10 00:09 'James Ray - You Remember The Face.mp3.vtt'
...
```

### Remarks

Depending on the recording, the transcription can be of great quality like the one above, or a funny disaster (ex: "Make it" instead of "Monkey"), with some sentences out from nowhere, but most of the time it work like a charm.

Transcriptions are fast, it took me less than a minute for one song, and even less during a batch of ten (model loading in VRAM looks time consuming).

The small model can be more efficient than the medium, so i encourage you to try both and compare the results.

You will also need of a good graphic card as the medium model requires a bit less than 8GB of VRAM.