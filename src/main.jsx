import React, { useRef, useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, OrbitControls, Sparkles } from '@react-three/drei';
import { ArrowRight, ArrowUpRight, Instagram, MapPin, MessageCircle, Star, Coffee, Flame, Leaf } from 'lucide-react';
import './styles.css';

function Beans({ count = 26 }) {
  const ref = useRef();
  const seeds = useRef(
    Array.from({ length: count }, (_, i) => ({
      r: 2.6 + Math.random() * 1.6,
      a: (i / count) * Math.PI * 2 + Math.random() * 0.5,
      y: -1 + Math.random() * 3.4,
      s: 0.5 + Math.random() * 0.8,
      v: 0.15 + Math.random() * 0.35,
    }))
  );
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    seeds.current.forEach((s, i) => {
      const m = ref.current.children[i];
      s.a += 0.0016 * s.v * 10 * 0.12;
      m.position.set(Math.cos(s.a) * s.r, s.y + Math.sin(t * s.v + i) * 0.25, Math.sin(s.a) * s.r * 0.6);
      m.rotation.x = t * 0.4 * s.v + i;
      m.rotation.y = t * 0.6 * s.v;
    });
  });
  return (
    <group ref={ref}>
      {seeds.current.map((s, i) => (
        <mesh key={i} scale={s.s}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color={i % 3 ? '#4a2413' : '#7a4a28'} roughness={0.35} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function Cup() {
  const r = useRef();
  const glow = useRef();
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    r.current.rotation.y = Math.sin(t * 0.35) * 0.22 + pointer.x * 0.35;
    r.current.rotation.x = pointer.y * -0.12;
    r.current.position.y = Math.sin(t * 0.9) * 0.06;
    glow.current.intensity = 2.4 + Math.sin(t * 2) * 0.5;
  });
  return (
    <group ref={r}>
      {/* saucer glow */}
      <pointLight ref={glow} position={[0, -0.6, 1.2]} intensity={2.4} color="#ff9a3c" distance={6} />
      {/* cup body */}
      <mesh castShadow>
        <cylinderGeometry args={[1.42, 1.18, 1.55, 64]} />
        <meshPhysicalMaterial color="#120a06" roughness={0.15} metalness={0.25} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      {/* gold rim */}
      <mesh position={[0, 0.78, 0]}>
        <torusGeometry args={[1.4, 0.045, 16, 80]} />
        <meshStandardMaterial color="#e8a94e" metalness={1} roughness={0.25} />
      </mesh>
      {/* coffee surface */}
      <mesh position={[0, 0.76, 0]}>
        <cylinderGeometry args={[1.32, 1.32, 0.05, 64]} />
        <meshStandardMaterial color="#2a1206" roughness={0.15} />
      </mesh>
      {/* latte art rings */}
      <mesh position={[0, 0.795, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.25, 0.34, 48]} />
        <meshBasicMaterial color="#e9c493" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.795, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.6, 48]} />
        <meshBasicMaterial color="#e9c493" transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, 0.795, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 0.94, 48]} />
        <meshBasicMaterial color="#e9c493" transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, 0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.14, 32]} />
        <meshBasicMaterial color="#f4ddba" />
      </mesh>
      {/* SORA band */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.36, 1.3, 0.42, 64, 1, true]} />
        <meshStandardMaterial color="#e8a94e" metalness={0.85} roughness={0.3} side={2} />
      </mesh>
      {/* handle */}
      <mesh position={[1.45, 0.2, 0]} rotation={[0, 0, -0.25]}>
        <torusGeometry args={[0.52, 0.14, 24, 48, Math.PI * 1.7]} />
        <meshPhysicalMaterial color="#120a06" roughness={0.2} metalness={0.3} clearcoat={1} />
      </mesh>
      {/* saucer */}
      <mesh position={[0, -0.85, 0]} receiveShadow>
        <cylinderGeometry args={[1.95, 1.6, 0.12, 64]} />
        <meshPhysicalMaterial color="#1c1009" roughness={0.2} metalness={0.3} clearcoat={0.8} />
      </mesh>
      <mesh position={[0, -0.78, 0]}>
        <torusGeometry args={[1.7, 0.03, 12, 72]} />
        <meshStandardMaterial color="#e8a94e" metalness={1} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Steam() {
  const rs = [useRef(), useRef(), useRef(), useRef(), useRef()];
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    rs.forEach((r, i) => {
      const p = (t * (0.22 + i * 0.03) + i * 0.35) % 1;
      r.current.position.y = 1 + p * 2.1;
      r.current.position.x = Math.sin(t * 1.2 + i * 1.4) * (0.12 + p * 0.3) + (i - 2) * 0.2;
      r.current.scale.setScalar(0.5 + p * 1.6);
      r.current.material.opacity = 0.32 * (1 - p);
    });
  });
  return (
    <>
      {rs.map((r, i) => (
        <mesh key={i} ref={r} position={[(i - 2) * 0.2, 1, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial transparent color="#ffd9a8" depthWrite={false} />
        </mesh>
      ))}
    </>
  );
}

function Scene() {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 1.1, 6], fov: 34 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[4, 6, 4]} intensity={2.5} color="#fff1dd" />
      <pointLight position={[-4, 2, 2]} intensity={8} color="#ff5c1a" distance={12} />
      <pointLight position={[4, -1, 3]} intensity={6} color="#e8a94e" distance={12} />
      <spotLight position={[0, 6, 0]} angle={0.5} intensity={30} color="#ffe9c9" penumbra={1} />
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.35}>
        <Cup />
        <Steam />
      </Float>
      <Beans />
      <Sparkles count={60} scale={[7, 4, 4]} size={2.5} speed={0.35} color="#ffcf8f" opacity={0.7} />
      <ContactShadows position={[0, -1.05, 0]} opacity={0.65} scale={7} blur={2.8} color="#000" />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}

const MENU = [
  { name: 'Cloud Latte', desc: 'Double espresso · fresh milk · vanilla cloud foam', price: '28K', tag: 'Best seller', icon: <Coffee size={20} /> },
  { name: 'Iced Aren', desc: 'Espresso · milk · aren asli · es batu kristal', price: '26K', tag: 'Favorit', icon: <Flame size={20} /> },
  { name: 'Matcha Gold', desc: 'Premium uji matcha · honey · susu oat', price: '29K', tag: 'New', icon: <Leaf size={20} /> },
];

function App() {
  const [sent, setSent] = useState(false);
  return (
    <main>
      <div className="grain" />
      <nav>
        <a className="logo" href="#top"><span className="logoDot" />SORA <small>COFFEE · EST 2026</small></a>
        <div className="links"><a href="#menu">Menu</a><a href="#story">Story</a><a href="#visit">Visit</a></div>
        <a className="cta" href="https://wa.me/6281234567890"><MessageCircle size={15} /> Order now</a>
      </nav>

      <section id="top" className="hero">
        <div className="copy">
          <div className="rating"><Star size={13} fill="#e8a94e" color="#e8a94e" /> 4.9 — 2.400+ ulasan · <span>Slow bar & specialty beans</span></div>
          <h1>Slow brewed.<br /><em>Bold taste.</em></h1>
          <p>SORA adalah slow-bar kecil dengan obsesi besar: espresso pekat, susu segar, dan latte art yang selalu fotogenik. Diseduh perlahan, disajikan hangat.</p>
          <div className="actions">
            <a className="primary" href="#menu">Explore menu <ArrowRight size={17} /></a>
            <a className="secondary" href="https://wa.me/6281234567890"><MessageCircle size={15} /> WhatsApp order</a>
          </div>
          <div className="stats">
            <div><b>12+</b><span>Signature drinks</span></div>
            <div><b>100%</b><span>Arabika lokal</span></div>
            <div><b>7d</b><span>Fresh roast</span></div>
          </div>
        </div>
        <div className="scene">
          <span className="sceneTag top">DRAG · 360° INTERACTIVE</span>
          <Suspense fallback={<div className="loading">Brewing…</div>}><Scene /></Suspense>
          <span className="sceneTag bottom">SINGLE ORIGIN — GAYO · TORAJA · KINTAMANI</span>
        </div>
      </section>

      <div className="marquee"><div className="track">
        {Array(2).fill('FRESHLY ROASTED ✦ SINGLE ORIGIN ✦ SLOW BAR ✦ LATTE ART ✦ OAT MILK AVAILABLE ✦ ').map((t, i) => <span key={i}>{t}</span>)}
      </div></div>

      <section id="menu" className="section">
        <div className="head">
          <div><span className="eyebrow">— Our menu</span><h2>Small menu.<br /><em>Big comfort.</em></h2></div>
          <p>Tiga andalan yang paling sering dipesan ulang. Semua bisa dibuat hot / iced, dengan oat milk +5K.</p>
        </div>
        <div className="cards">
          {MENU.map((d) => (
            <article className="drink" key={d.name}>
              <div className="drinkTop"><span className="drinkIcon">{d.icon}</span><span className="drinkTag">{d.tag}</span></div>
              <h3>{d.name}</h3>
              <p>{d.desc}</p>
              <div className="drinkFoot"><b>{d.price}</b><a href="https://wa.me/6281234567890">Order <ArrowUpRight size={15} /></a></div>
            </article>
          ))}
        </div>
      </section>

      <section id="story" className="story">
        <div className="storyCard">
          <span className="eyebrow light">— Our story</span>
          <h2>Bukan sekadar<br />kedai kopi.</h2>
          <p>SORA lahir dari dapur kecil dan satu mesin espresso bekas. Kami percaya jeda terbaik dimulai dari cangkir yang dibuat dengan teliti — suhu pas, crema tebal, dan senyum barista.</p>
          <div className="storyGrid">
            <div><b>01</b><strong>Beans pilihan</strong><p>Arabika Gayo, Toraja & Kintamani dari roaster lokal.</p></div>
            <div><b>02</b><strong>Diseduh fresh</strong><p>Di-grind saat dipesan. Tidak pernah diseduh duluan.</p></div>
            <div><b>03</b><strong>Ruang jeda</strong><p>Playlist lo-fi, colokan banyak, wifi kencang.</p></div>
          </div>
        </div>
      </section>

      <section id="visit" className="visit">
        <div className="visitInfo">
          <span className="eyebrow">— Visit us</span>
          <h2>Mampir.<br /><em>Ngopi.</em> Betah.</h2>
          <p><MapPin size={15} /> Jl. Kemang Raya No. 8, Jakarta Selatan<br />Senin – Minggu · 08.00 – 22.00</p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input required placeholder="Nama kamu" />
            <input required placeholder="Mau pesan apa? (mis. 2x Iced Aren)" />
            <button>{sent ? 'Siap! Kami tunggu di bar ☕' : 'Book a table →'}</button>
          </form>
        </div>
        <div className="visitCard">
          <div className="hours"><span>Today</span><b>Open · until 22.00</b></div>
          <div className="big">SORA</div>
          <div className="visitRow"><a href="https://wa.me/6281234567890"><MessageCircle size={15} /> WhatsApp</a><a href="#"><Instagram size={15} /> Instagram</a></div>
        </div>
      </section>

      <footer>© 2026 SORA Coffee — brewed slowly in Jakarta.</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
