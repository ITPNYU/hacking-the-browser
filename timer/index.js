const DEFAULT_SECONDS = 1 * 60 + 1;
const WARNING_BEEP_THRESHOLD = 60;
const INSISTENT_BEEP_THRESHOLD = 45;

class Timer {
  static defaultState() {
    return {
      playing: false,
      totalSeconds: DEFAULT_SECONDS,
      remainingSeconds: DEFAULT_SECONDS,
      startTime: null,
      intervalId: null
    };
  }

  constructor() {
    this.els = {
      timer: document.getElementById('timer'),
      playPause: document.getElementById('play-pause'),
      reset: document.getElementById('reset')
    };
    this.state = Timer.defaultState();
    this.sound = new Sound();
  }

  run() {
    this.addListeners();
    this.updateUI();
  }

  addListeners() {
    this.els.playPause.addEventListener('click', () => this.playPause());
    this.els.reset.addEventListener('click', () => this.reset());
  }

  playPause() {
    if (this.state.playing) {
      this.pause();
    } else {
      this.play();
    }
    this.updateUI();
  }

  reset() {
    this.pause();
    this.state = Timer.defaultState();
    this.updateUI();
  }

  play() {
    this.state.playing = true;
    this.state.startTime = new Date();
    this.state.intervalId = setInterval(() => this.tick(), 1000);
  }

  pause() {
    this.state.playing = false;
    this.state.totalSeconds = this.state.remainingSeconds;
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.state.intervalId = null;
    }
  }

  tick() {
    let now = new Date();
    let elapsedSeconds = Math.round((now - this.state.startTime) / 1000);
    this.state.remainingSeconds = this.state.totalSeconds - elapsedSeconds;
    this.updateUI();
  }

  updateUI() {
    this.els.timer.innerText = formatMMSS(this.state.remainingSeconds);
    this.els.playPause.innerText = this.state.playing ? 'Pause' : 'Play';

    this._playSounds();
  }

  _playSounds() {
    let remainingSeconds = this.state.remainingSeconds;
    if (remainingSeconds === WARNING_BEEP_THRESHOLD) {
      this.sound.play('short');
    } else if (remainingSeconds === 0) {
      this.sound.play('long');
    } else if (
      remainingSeconds < 0 &&
      Math.abs(remainingSeconds % INSISTENT_BEEP_THRESHOLD === 0)
    ) {
      this.sound.play('insistent');
    }
  }
}

function formatMMSS(seconds) {
  let negative = seconds < 0;
  seconds = Math.abs(seconds);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  seconds = `${seconds}`.padStart(2, '0');
  return `${negative ? '-' : ''}${minutes}:${seconds}`;
}

function assert(bool, message = 'should be true') {
  if (!bool) {
    throw `test failed: ${message}`;
  }
}

class Sound {
  constructor() {
    let audioCtx = new AudioContext();
    this.oscillator = audioCtx.createOscillator();
    this.oscillator.frequency.value = 300;
    this.oscillator.start();
    this.gainNode = audioCtx.createGain();
    this.gainNode.gain.value = 0;
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(audioCtx.destination);
  }

  play(type = 'short', count = 0) {
    let types = ['short', 'long', 'insistent'];
    if (!types.includes(type)) {
      throw `Wrong play type ${type}`;
    }

    let delay = 500;
    let ms = 750,
      volume = 0.5,
      waveType = 'sine',
      repetitions = 3;
    if (type === 'insistent') {
      volume = 0.75;
      waveType = 'square';
    }
    if (type === 'short') {
      ms = 500;
      repetitions = 1;
    }

    if (count >= repetitions) {
      return;
    }

    this.oscillator.type = waveType;
    this.gainNode.gain.value = volume;
    setTimeout(() => {
      this.gainNode.gain.value = 0;
      setTimeout(() => this.play(type, count + 1), delay);
    }, ms);
  }
}

let tests = [
  () => assert(formatMMSS(1) === '0:01', '0:01'),
  () => assert(formatMMSS(60) === '1:00', '1:00'),
  () => assert(formatMMSS(7 * 60) === '7:00', '7:00'),
  () => assert(formatMMSS(7 * 60 - 1) === '6:59', '6:59'),
  () => assert(formatMMSS(-1) === '-0:01', '-0:01'),
  () => assert(formatMMSS(-60) === '-1:00', '-1:00'),
  () => assert(formatMMSS(-61) === '-1:01', '-1:01')
];
tests.forEach(t => t());

new Timer().run();
