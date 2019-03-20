const DEFAULT_SECONDS = 7 * 60;

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
