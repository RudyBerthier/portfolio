import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Globe, Briefcase, Mail, ExternalLink, ArrowRight, Code2, Database, Layout, ChevronDown } from 'lucide-react'

// --- 3D TILT CARD COMPONENT ---
function ProjectCard3D({ title, desc, tech, link, imageClass, index }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for 3D rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    // Calculate normalized mouse coordinates mapping 0..width to -0.5..0.5
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="perspective-1000" // Requires custom CSS utility if we don't use inline style
      style={{ perspective: 1200 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-3xl glass-panel w-full md:h-[500px] flex flex-col md:flex-row shadow-2xl hover:border-violet-500/50 transition-colors cursor-pointer"
      >
        {/* L'image - avec un effet de profondeur Z (translateZ) */}
        <div
          className="relative w-full md:w-3/5 h-64 md:h-full overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className={`absolute inset-0 ${imageClass} bg-cover bg-center transition-transform duration-700 group-hover:scale-110`} />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent z-10" />
        </div>

        {/* Le Texte - en surélévation Z */}
        <div
          className="p-8 md:p-12 flex flex-col justify-center w-full md:w-2/5 z-20 bg-slate-900/60 backdrop-blur-md rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none"
          style={{ transform: "translateZ(50px)" }}
        >
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 bg-violet-600/30 blur-[50px] rounded-full pointer-events-none group-hover:bg-cyan-500/30 transition-colors"
          />

          <h3 className="text-3xl font-black text-white mb-4 tracking-tight drop-shadow-xl">{title}</h3>
          <p className="text-slate-300 mb-8 max-w-sm drop-shadow-md leading-relaxed">{desc}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {tech.map((t, i) => (
              <span key={i} className="text-xs font-bold tracking-wider px-3 py-1 bg-white/10 border border-white/20 shadow-xl rounded-full text-white">
                {t}
              </span>
            ))}
          </div>

          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-violet-400 font-bold hover:text-cyan-400 transition-colors group/link w-max mt-auto"
          >
            Découvrir le projet
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 5, scale: 1.1 }}
              className="bg-white/10 p-2 rounded-full"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}


function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 600])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8])

  const titleWords = "Créer, des, expériences, Web, Modernes.".split(", ")

  return (
    <section className="relative h-screen flex items-center justify-center">
      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring", damping: 12 }}
          style={{ perspective: 1000 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(157,78,221,0.2)] text-sm font-bold text-violet-200 mb-8 tracking-widest uppercase">
            Rudy Berthier // 2026
          </span>
        </motion.div>

        {/* 3D Staggered Text */}
        <div className="text-6xl md:text-8xl font-black mb-6 text-white perspective-[1000px]">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, rotateY: 90, z: -200 }}
              animate={{ opacity: 1, rotateY: 0, z: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 + 0.3, type: "spring" }}
              className={`inline-block mr-4 ${word === 'Modernes.' ? 'text-gradient-purple block mt-2 md:inline md:mt-0 drop-shadow-[0_0_30px_rgba(157,78,221,0.5)]' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-medium"
        >
          Développeur Full-Stack passionné par les interfaces premium,
          le design interactif hybride et les architectures ultra-rapides.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="#projects" className="relative group px-8 py-4 bg-white text-slate-950 font-bold rounded-full overflow-hidden flex items-center gap-2">
            <span className="absolute inset-0 bg-gradient-to-r from-violet-400 to-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
              Voir mes projets <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a href="#contact" className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl font-bold rounded-full hover:bg-white/10 hover:border-white/20 transition-all">
            Me contacter
          </a>
        </motion.div>
      </motion.div>

      <a href="#projects" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 hover:text-white transition-colors cursor-pointer z-20">
        <ChevronDown className="w-10 h-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
      </a>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="mb-24 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          style={{ perspective: 1000 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight"
        >
          Projets <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-200">Sélectionnés.</span>
        </motion.h2>
      </div>

      <div className="space-y-24">
        <ProjectCard3D
          title="Gestion Locative"
          desc="Une plateforme immersive de gestion immobilière. Conçue avec une interface fluide et un puissant backend garantissant rapidité et fiabilité en production."
          tech={['React', 'Vite', 'Express', 'Supabase', 'PostgreSQL', 'Tailwind', 'Resend']}
          link="https://gestion.rberthier.fr"
          imageClass="bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')]"
          index={0}
        />
      </div>
    </section>
  )
}

function SkillsSection() {
  const skills = [
    { name: "Frontend Immersif", icon: <Layout className="w-10 h-10 mb-6 text-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]" />, desc: "Expériences ultra-fluides React 18, TailwindCSS V4, Animations spatiales au pixel près avec Framer Motion et 3D." },
    { name: "Architectures Backend", icon: <Code2 className="w-10 h-10 mb-6 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />, desc: "Microservices solides, bases de données structurées, traitement de fichiers via Node.js, Express et Postgres." },
    { name: "Cloud & Devops", icon: <Database className="w-10 h-10 mb-6 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />, desc: "Déploiements autonomes sur Oracle Cloud, reverse proxy, PM2. Sécurité RLS et services gérés par Supabase." },
  ]

  // Staggered reveal
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 100, rotateX: 90 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, type: "spring", bounce: 0.3 } }
  }

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 perspective-[2000px]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {skills.map((s, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="group relative glass-panel p-10 rounded-3xl overflow-hidden hover:-translate-y-4 transition-transform duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              {s.icon}
              <h4 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{s.name}</h4>
              <p className="text-slate-400 leading-relaxed font-medium group-hover:text-slate-200 transition-colors">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-40 relative flex flex-col items-center justify-center text-center px-6 z-10 overflow-hidden">
      {/* Intense glow specific to footer purely decorative but dramatic */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-violet-600/40 via-slate-950/0 to-slate-950/0 z-0 pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        className="relative z-10"
        style={{ perspective: 1000 }}
      >
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-8">
          Travaillons <br /> <span className="text-gradient">Ensemble.</span>
        </h2>
        <p className="text-slate-300 mb-12 max-w-xl mx-auto text-xl font-medium drop-shadow-lg">
          Transformons vos idées en expériences immersives hors du commun. Paré pour un nouveau défi.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="mailto:rudyberthier@gmail.com" className="relative group px-10 py-5 bg-white text-slate-950 font-black text-lg rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-shadow">
            <span className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-300">
              <Mail className="w-6 h-6" /> M'envoyer un email
            </span>
          </a>
          <div className="flex gap-4">
            <a href="#" className="p-5 glass-panel rounded-full hover:bg-white/20 transition-all text-white hover:scale-110">
              <Globe className="w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </a>
            <a href="#" className="p-5 glass-panel rounded-full hover:bg-white/20 transition-all text-white hover:scale-110">
              <Briefcase className="w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// Flashlight Mouse Tracker
function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] pointer-events-none z-50 mix-blend-screen"
      animate={{
        x: mousePosition.x - 192, // center the 384px width div
        y: mousePosition.y - 192,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
    />
  )
}

export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-violet-500/30 relative overflow-hidden">

      <MouseTracker />

      {/* Global Background Glow */}
      <div className="fixed inset-0 bg-[image:var(--background-image-hero-glow)] z-0 pointer-events-none" />

      {/* Global Animated blurry blobs - Drifting only, NO ROTATE for perf */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/40 rounded-full blur-[120px] z-0 pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/30 rounded-full blur-[150px] z-0 pointer-events-none"
      />

      <div className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </div>
  )
}
