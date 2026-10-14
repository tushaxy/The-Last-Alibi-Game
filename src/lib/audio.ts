/**
 * Procedural Web Audio Sound Engine for THE LAST ALIBI
 * Generates ambient soundscapes and tactical UI sound effects with zero external audio dependencies.
 * Respects browser autoplay restrictions and user audio preferences.
 */

type AmbientMode = "none" | "rain" | "vinyl" | "clock" | "tape" | "chapel";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private currentAmbientMode: AmbientMode = "none";
  private ambientNodes: { stop: () => void }[] = [];

  private isMuted: boolean = false;
  private ambientVolume: number = 0.35;
  private sfxVolume: number = 0.5;

  constructor() {
    // Lazy initialized on first user interaction
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("last_alibi_muted");
      const savedAmbVol = localStorage.getItem("last_alibi_ambient_vol");
      const savedSfxVol = localStorage.getItem("last_alibi_sfx_vol");

      if (savedMute !== null) this.isMuted = savedMute === "true";
      if (savedAmbVol !== null) this.ambientVolume = parseFloat(savedAmbVol);
      if (savedSfxVol !== null) this.sfxVolume = parseFloat(savedSfxVol);
    }
  }

  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.ambientVolume, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getAmbientMode(): AmbientMode {
    return this.currentAmbientMode;
  }

  public getAmbientVolume(): number {
    return this.ambientVolume;
  }

  public getSfxVolume(): number {
    return this.sfxVolume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("last_alibi_muted", String(this.isMuted));
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0 : 1,
        this.ctx.currentTime,
        0.05
      );
    }
    return this.isMuted;
  }

  public setAmbientVolume(vol: number) {
    this.ambientVolume = Math.max(0, Math.min(1, vol));
    if (typeof window !== "undefined") {
      localStorage.setItem("last_alibi_ambient_vol", String(this.ambientVolume));
    }
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(this.ambientVolume, this.ctx.currentTime, 0.05);
    }
  }

  public setSfxVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    if (typeof window !== "undefined") {
      localStorage.setItem("last_alibi_sfx_vol", String(this.sfxVolume));
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setTargetAtTime(this.sfxVolume, this.ctx.currentTime, 0.05);
    }
  }

  public stopAmbient() {
    this.ambientNodes.forEach((node) => {
      try {
        node.stop();
      } catch {
        // already stopped
      }
    });
    this.ambientNodes = [];
    this.currentAmbientMode = "none";
  }

  public playAmbient(mode: AmbientMode) {
    this.initContext();
    if (!this.ctx || !this.ambientGain) return;

    if (this.currentAmbientMode === mode) {
      // Toggle off if clicking the currently active mode
      this.stopAmbient();
      return;
    }

    this.stopAmbient();
    this.currentAmbientMode = mode;

    if (mode === "rain") {
      this.createRainAmbient();
    } else if (mode === "vinyl") {
      this.createVinylAmbient();
    } else if (mode === "clock") {
      this.createClockAmbient();
    } else if (mode === "tape") {
      this.createTapeAmbient();
    } else if (mode === "chapel") {
      this.createChapelAmbient();
    }
  }

  // --- Ambient Generators ---

  private createRainAmbient() {
    if (!this.ctx || !this.ambientGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.ambientGain);

    whiteNoise.start();
    this.ambientNodes.push({
      stop: () => {
        whiteNoise.stop();
        whiteNoise.disconnect();
      },
    });
  }

  private createVinylAmbient() {
    if (!this.ctx || !this.ambientGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Sporadic dust pops
      const isPop = Math.random() < 0.003;
      output[i] = isPop ? (Math.random() - 0.5) * 1.5 : (Math.random() - 0.5) * 0.05;
    }

    const vinyl = this.ctx.createBufferSource();
    vinyl.buffer = noiseBuffer;
    vinyl.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);

    const vinylGain = this.ctx.createGain();
    vinylGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

    vinyl.connect(filter);
    filter.connect(vinylGain);
    vinylGain.connect(this.ambientGain);

    vinyl.start();
    this.ambientNodes.push({
      stop: () => {
        vinyl.stop();
        vinyl.disconnect();
      },
    });
  }

  private createClockAmbient() {
    if (!this.ctx || !this.ambientGain) return;
    let isTock = false;
    const interval = setInterval(() => {
      if (!this.ctx || !this.ambientGain || this.currentAmbientMode !== "clock") {
        clearInterval(interval);
        return;
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(isTock ? 880 : 1200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ambientGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
      isTock = !isTock;
    }, 1000);

    this.ambientNodes.push({
      stop: () => clearInterval(interval),
    });
  }

  private createTapeAmbient() {
    if (!this.ctx || !this.ambientGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Brown noise
    }

    const tapeNoise = this.ctx.createBufferSource();
    tapeNoise.buffer = noiseBuffer;
    tapeNoise.loop = true;

    // 60Hz subtle electrical grounding hum
    const humOsc = this.ctx.createOscillator();
    humOsc.frequency.setValueAtTime(60, this.ctx.currentTime);
    const humGain = this.ctx.createGain();
    humGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    humOsc.connect(humGain);
    humGain.connect(this.ambientGain);
    humOsc.start();

    const tapeGain = this.ctx.createGain();
    tapeGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    tapeNoise.connect(tapeGain);
    tapeGain.connect(this.ambientGain);
    tapeNoise.start();

    this.ambientNodes.push({
      stop: () => {
        tapeNoise.stop();
        humOsc.stop();
        tapeNoise.disconnect();
        humOsc.disconnect();
      },
    });
  }

  private createChapelAmbient() {
    if (!this.ctx || !this.ambientGain) return;
    // Dark ominous organ/reverb drone
    const freqs = [65.41, 98.0, 130.81]; // C2, G2, C3
    const oscs: OscillatorNode[] = [];

    freqs.forEach((freq) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);
      osc.start();
      oscs.push(osc);
    });

    this.ambientNodes.push({
      stop: () => {
        oscs.forEach((o) => {
          o.stop();
          o.disconnect();
        });
      },
    });
  }

  // --- Sound Effects (SFX) ---

  public playClick() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }

  public playPaperTurn() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const bufferSize = this.ctx.sampleRate * 0.15;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const source = this.ctx.createBufferSource();
    source.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    source.start();
  }

  public playEvidenceDiscovered() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const notes = [587.33, 880, 1174.66]; // D5, A5, D6
    notes.forEach((freq, i) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(this.ctx.currentTime + i * 0.08);
      osc.stop(this.ctx.currentTime + i * 0.08 + 0.45);
    });
  }

  public playContradictionExposed() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    // Dramatic discordant low brass pulse
    const freqs = [110, 155.56]; // A2 + D#3 (tritone)
    freqs.forEach((freq) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.65);
    });
  }

  public playVerdictFanfare(success: boolean) {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    if (success) {
      // Victorious Brass Cadence
      const chord = [392.0, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 0.8);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.9);
      });
    } else {
      // Somber minor cadence
      const notes = [311.13, 293.66, 261.63]; // Eb4, D4, C4
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.2);

        gain.gain.setValueAtTime(0.18, this.ctx.currentTime + idx * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.2 + 0.5);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(this.ctx.currentTime + idx * 0.2);
        osc.stop(this.ctx.currentTime + idx * 0.2 + 0.55);
      });
    }
  }
}

export const soundEngine = new SoundEngine();
