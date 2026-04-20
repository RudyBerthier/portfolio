import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Mail, ExternalLink, ArrowRight, Code2, Database, Layout, ChevronDown, Search, TerminalSquare, MapPin, Clock, Globe, CloudSun, Activity, BatteryFull, BatteryMedium, BatteryLow, BatteryWarning, BatteryCharging } from 'lucide-react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

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
      <motion.a
        href={link}
        target="_blank"
        rel="noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-3xl glass-panel w-full md:h-[500px] flex flex-col md:flex-row shadow-2xl hover:border-violet-500/50 transition-colors cursor-pointer block no-underline"
      >
        {/* L'image - avec un effet de profondeur Z (translateZ) */}
        <div
          className="relative w-full md:w-3/5 h-64 md:h-full overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className={`absolute inset-0 ${imageClass} bg-cover bg-center transition-transform duration-700 group-hover:scale-110`} />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80" />
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

          <div
            className="inline-flex items-center gap-3 px-6 py-3 bg-violet-600/20 text-violet-300 border border-violet-500/30 rounded-full font-bold transition-all w-max mt-auto group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-500 shadow-[0_0_15px_rgba(157,78,221,0.2)] group-hover:shadow-[0_0_20px_rgba(157,78,221,0.5)]"
          >
            Découvrir le projet
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </motion.a>
    </motion.div>
  )
}


function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 600])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8])
  // The arrow should fade out much faster so it doesn't collide with the parallaxing text
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

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
          <a 
            href="#projects" 
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="relative group px-8 py-4 bg-white text-slate-950 font-bold rounded-full overflow-hidden flex items-center gap-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-400 to-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
              Voir mes projets <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl font-bold rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
          >
            Me contacter
          </a>
        </motion.div>
      </motion.div>

      <motion.a 
        href="#projects" 
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        }}
        style={{ opacity: arrowOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 hover:text-white transition-colors cursor-pointer z-20"
      >
        <ChevronDown className="w-10 h-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
      </motion.a>
    </section>
  )
}
// --- BATTERY INDICATOR (floating pill) ---
function BatteryIndicator() {
  const [battery, setBattery] = useState({ level: null, charging: false })

  useEffect(() => {
    if (!navigator.getBattery) return
    navigator.getBattery().then(bat => {
      const update = () => setBattery({ level: Math.round(bat.level * 100), charging: bat.charging })
      update()
      bat.addEventListener('levelchange', update)
      bat.addEventListener('chargingchange', update)
    }).catch(() => {})
  }, [])

  if (battery.level === null) return null

  const isLow = battery.level <= 20 && !battery.charging
  const color = battery.charging ? 'text-emerald-400' : isLow ? 'text-red-400' : battery.level > 30 ? 'text-slate-300' : 'text-orange-400'
  const BatIcon = battery.charging ? BatteryCharging : battery.level > 60 ? BatteryFull : battery.level > 30 ? BatteryMedium : battery.level > 15 ? BatteryLow : BatteryWarning

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      title={battery.charging ? 'En charge' : `Batterie : ${battery.level}%`}
      className={`fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3 py-2 rounded-full glass-panel border text-xs font-semibold backdrop-blur-md pointer-events-none ${
        isLow ? 'border-red-500/40 bg-red-950/40' : 'border-white/10 bg-slate-900/60'
      } ${isLow ? 'animate-pulse' : ''}`}
    >
      <BatIcon className={`w-4 h-4 ${color}`} />
      <span className={color}>{battery.level}%</span>
      {isLow && <span className="text-red-400">Branche-toi 🔌</span>}
    </motion.div>
  )
}

// --- ABOUT BENTO SECTION ---
function AboutBentoSection() {
  const [time, setTime] = useState(new Date())
  const [weather, setWeather] = useState({ temp: '--', condition: '...', city: 'Recherche...' })
  const [wakaStats, setWakaStats] = useState({
    totalText: '38h 14m',
    languages: [
      { name: 'JavaScript', percent: 40, color: '#F7DF1E' },
      { name: 'React', percent: 30, color: '#61DAFB' },
      { name: 'Node.js', percent: 20, color: '#68A063' },
      { name: 'Autre', percent: 10, color: '#64748b' },
    ]
  })

  // WakaTime Embeddable URLs (safe for public sites — no API key exposed)
  const WAKA_ACTIVITY_URL = 'https://wakatime.com/share/@04dacb25-8de2-458a-891c-74365dbc1d3e/fdc5bdd9-d96e-44a0-9683-b467c40ee2e7.json'
  const WAKA_LANGUAGES_URL = 'https://wakatime.com/share/@04dacb25-8de2-458a-891c-74365dbc1d3e/61d32066-72c1-4eae-b9cd-b0e57a463e26.json'

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)

    // Battery API (only works on desktop Chrome/Edge — graceful ignore on unsupported)
    if (navigator.getBattery) {
      navigator.getBattery().then(bat => {
        setBattery({ level: Math.round(bat.level * 100), charging: bat.charging })
        bat.addEventListener('levelchange', () => setBattery({ level: Math.round(bat.level * 100), charging: bat.charging }))
        bat.addEventListener('chargingchange', () => setBattery({ level: Math.round(bat.level * 100), charging: bat.charging }))
      }).catch(() => {})
    }

    // Fetch WakaTime data (activity + languages) in parallel
    Promise.all([
      fetch(WAKA_ACTIVITY_URL).then(r => r.json()),
      fetch(WAKA_LANGUAGES_URL).then(r => r.json())
    ]).then(([activityData, langData]) => {
      // Compute total seconds from all days in the past week
      const totalSecs = (activityData.data || []).reduce(
        (sum, day) => sum + (day.grand_total?.total_seconds || 0), 0
      )

      if (totalSecs > 0) {
        const hours = Math.floor(totalSecs / 3600)
        const minutes = Math.floor((totalSecs % 3600) / 60)
        const totalText = `${hours}h ${minutes}m`

        // Map language colors (basic palette)
        const colorMap = {
          JavaScript: '#F7DF1E', TypeScript: '#3178C6', JSX: '#61DAFB',
          CSS: '#264de4', HTML: '#E44D26', Python: '#3776AB',
          React: '#61DAFB', Vue: '#42b883', 'Node.js': '#68A063',
          Bash: '#4EAA25', JSON: '#8bc34a', Markdown: '#083fa1',
        }
        const langs = (langData.data || []).slice(0, 4).map((l, i) => ({
          name: l.name,
          percent: Math.round(l.percent),
          color: colorMap[l.name] || ['#a78bfa','#67e8f9','#34d399','#64748b'][i]
        }))

        setWakaStats({ totalText, languages: langs.length ? langs : wakaStats.languages })
      }
      // else: keep the mock data — extension not yet set up
    }).catch(() => {/* keep mock data on network error */})
    
    // Fetch user coordinate via IP (No annoying permission popup)
    fetch('https://get.geojs.io/v1/ip/geo.json')
      .then(res => res.json())
      .then(geoData => {
        const lat = geoData.latitude || 48.8566;
        const lon = geoData.longitude || 2.3522;
        const city = geoData.city || 'Paris';

        // Fetch weather for this specific location
        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
          .then(res => res.json())
          .then(data => {
            const temp = Math.round(data.current_weather.temperature);
            const code = data.current_weather.weathercode;
            let condition = 'Clair';
            if (code > 0 && code <= 3) condition = 'Nuageux';
            if (code >= 45 && code <= 48) condition = 'Brouillard';
            if (code >= 51 && code <= 67) condition = 'Averses';
            if (code >= 71 && code <= 77) condition = 'Neige';
            if (code >= 95) condition = 'Orage';
            setWeather({ temp: `${temp}°C`, condition, city });
          })
      })
      .catch(() => setWeather({ temp: '20°C', condition: 'Clair', city: 'Paris' }));

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Europe/Paris' // Enforce France time zone
    })
  }

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full" id="about">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
        
        {/* Intro Widget (2x2) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-2 row-span-2 glass-panel bg-slate-900/40 border border-white/10 rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 opacity-50 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 w-64 h-64 bg-violet-600/30 blur-[60px] rounded-full mix-blend-screen pointer-events-none"
          />

          <div className="relative z-10">
            <img src="https://github.com/RudyBerthier.png" alt="Rudy Berthier" className="w-20 h-20 rounded-full border-2 border-white/20 mb-6 drop-shadow-2xl" />
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Hello, je suis Rudy 👋</h2>
            <p className="text-slate-300 text-lg font-medium leading-relaxed">
               Développeur Full-Stack concentré sur la création d'expériences web premiums, immersives et ultra-performantes. 
               J'adore associer des designs interactifs avec des architectures backend robustes.
            </p>
          </div>
        </motion.div>

        {/* Status Widget (1x1) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="col-span-1 bg-slate-900/40 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
          <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping pointer-events-none" />
            <div className="w-6 h-6 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10" />
          </div>
          <span className="text-emerald-400 font-bold text-lg relative z-10">Ouvert aux opportunités</span>
        </motion.div>

        {/* Clock Widget (1x1) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="col-span-1 bg-slate-900/40 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center group"
        >
          <Clock className="w-8 h-8 text-slate-400 mb-4 group-hover:text-cyan-400 transition-colors" />
          <span className="text-sm font-semibold text-slate-500 mb-1 tracking-wider uppercase">Heure Locale</span>
          <span className="text-3xl font-mono text-white font-bold tracking-tight">
            {formatTime(time)}
          </span>
        </motion.div>

        {/* Location Widget (1x1) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="col-span-1 md:col-start-3 bg-slate-900/40 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center opacity-[0.05] group-hover:scale-105 group-hover:opacity-10 transition-all duration-700 blur-[1px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/40 pointer-events-none" />
          
          <MapPin className="w-8 h-8 text-violet-400 mb-3 relative z-10 drop-shadow-[0_0_10px_rgba(157,78,221,0.5)]" />
          <span className="text-sm font-semibold text-slate-400 mb-1 relative z-10 uppercase tracking-wider">Localisation</span>
          <h3 className="text-xl font-bold text-white relative z-10">France</h3>
        </motion.div>

        {/* Weather Widget (1x1) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="col-span-1 bg-slate-900/40 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center group"
        >
          <CloudSun className="w-8 h-8 text-amber-400 mb-2 group-hover:text-amber-300 transition-colors" />
          <span className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider line-clamp-1">{weather.city}</span>
          <span className="text-3xl font-mono text-white font-bold tracking-tight mb-1">
            {weather.temp}
          </span>
          <span className="text-xs font-medium text-slate-400">{weather.condition}</span>
        </motion.div>


        {/* WakaTime Widget (4x1) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="col-span-1 md:col-span-4 glass-panel bg-slate-900/40 border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
        >
          {/* Constantly pulsing ambient light for the activity */}
          <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-[60px] animate-pulse pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex flex-col shrink-0">
              <span className="text-sm font-semibold text-slate-500 mb-2 tracking-wider uppercase flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" /> Activité — 7 derniers jours
              </span>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight font-mono">
                {wakaStats.totalText}
              </h3>
            </div>
            
            <div className="w-full md:w-3/5 space-y-3">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
                {wakaStats.languages.map(lang => (
                  <div key={lang.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: lang.color }} />
                    <span className="text-slate-300">{lang.name} {lang.percent}%</span>
                  </div>
                ))}
              </div>
              
              {/* Dynamic Progress Bar */}
              <div className="h-3 md:h-4 w-full bg-slate-800/80 rounded-full overflow-hidden flex shadow-inner group-hover:scale-[1.01] transition-transform">
                {wakaStats.languages.map(lang => (
                  <div
                    key={lang.name}
                    className="h-full transition-all duration-700"
                    style={{ width: `${lang.percent}%`, background: lang.color + 'DD' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
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
    visible: { transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: 60 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.65, type: "spring", bounce: 0.35 } }
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
            <a href="https://github.com/RudyBerthier" target="_blank" rel="noreferrer" className="p-5 glass-panel rounded-full hover:bg-white/20 transition-all text-white hover:scale-110">
              <FiGithub className="w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </a>
            <a href="https://linkedin.com/in/rudyberthier" target="_blank" rel="noreferrer" className="p-5 glass-panel rounded-full hover:bg-white/20 transition-all text-white hover:scale-110">
              <FiLinkedin className="w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// Minimalist, instant custom cursor with background glow
function MouseTracker() {
  const [isHovering, setIsHovering] = useState(false)

  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0)

  // Slower spring for the big background glow
  const glowX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 1 })
  const glowY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 1 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      
      const target = e.target
      const isHoverable = target.closest('a') || target.closest('button') || target.closest('.cursor-pointer')
      setIsHovering(!!isHoverable)
    }

    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <div className="hidden md:block pointer-events-none">
      {/* Subtle Background Glow */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-violet-600/15 rounded-full blur-[100px] z-0 mix-blend-screen"
        style={{
          x: useTransform(glowX, v => v - 192),
          y: useTransform(glowY, v => v - 192),
        }}
      />
      
      {/* Pure, instant dot tracking the mouse perfectly with zero lag */}
      <motion.div 
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full z-[999999]"
        style={{
          x: useTransform(mouseX, v => v - 6),
          y: useTransform(mouseY, v => v - 6),
        }}
        animate={{
          scale: isHovering ? 3 : 1,
          backgroundColor: isHovering ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,1)",
          border: isHovering ? "1px solid rgba(255,255,255,0.8)" : "0px solid rgba(255,255,255,0)"
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}

// --- COMMAND PALETTE (CMD+K) ---
function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const down = (e) => {
      // Toggle on Cmd+K or Ctrl+K
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isOpen])

  // Reset search when opening
  useEffect(() => {
    if (isOpen) setSearch('')
  }, [isOpen])

  // Action definitions
  const commands = [
    { id: 'projects', icon: <Code2 className="w-5 h-5"/>, label: 'Découvrir mes projets', action: () => { 
        setIsOpen(false); 
        setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 50); 
      } 
    },
    { id: 'contact', icon: <Mail className="w-5 h-5"/>, label: 'Me contacter (Email)', action: () => { 
        setIsOpen(false); 
        setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50); 
      } 
    },
    { id: 'github', icon: <FiGithub className="w-5 h-5"/>, label: 'Mon profil GitHub', action: () => { window.open('https://github.com/RudyBerthier', '_blank'); setIsOpen(false); } },
    { id: 'linkedin', icon: <FiLinkedin className="w-5 h-5"/>, label: 'Mon profil LinkedIn', action: () => { window.open('https://linkedin.com/in/rudyberthier', '_blank'); setIsOpen(false); } },
  ]

  const filteredCommands = commands.filter((command) =>
    command.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {/* Floating Hint Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-40 hidden md:flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-colors group cursor-pointer"
      >
        <Search className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
        <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-white transition-colors border border-slate-600/50 rounded px-1.5 py-0.5">⌘K</span>
      </button>

      {/* Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[99999] flex items-start justify-center pt-[20vh] bg-slate-950/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col"
            >
              {/* Search Header */}
              <div className="flex items-center px-4 py-4 border-b border-slate-700/50">
                <Search className="w-5 h-5 text-slate-400 mr-3" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Tapez une commande ou une recherche..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-slate-500"
                />
                <span className="text-xs font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded">ESC</span>
              </div>
              
              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center px-4 py-3 gap-3 hover:bg-violet-600/20 hover:text-cyan-400 text-slate-300 rounded-xl transition-all text-left"
                    >
                      {cmd.icon}
                      <span className="font-medium">{cmd.label}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-slate-500">
                    Aucune commande trouvée pour "{search}"
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// --- INTERACTIVE TERMINAL ---
function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'Connexion établie. Tapez "help" pour voir les commandes disponibles.' }
  ])
  const [isNuked, setIsNuked] = useState(false)
  
  const endOfMessagesRef = useRef(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history, isOpen])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase()
      let response = ''
      
      const newHistory = [...history, { type: 'user', text: `rudy@portfolio:~$ ${input}` }]

      switch(cmd) {
        case 'help':
          response = `Commandes disponibles:\n- whoami   : en savoir plus sur moi\n- projects : voir mes réalisations\n- contact  : afficher mes coordonnées\n- clear    : nettoyer le terminal`
          break
        case 'whoami':
          response = "Rudy Berthier\nIngénieur Full-Stack. Passionné par le design interactif de haute voltige et les architectures backend performantes."
          break
        case 'projects':
          response = "Projet principal : Gestion-Locative (https://gestion.rberthier.fr)\nTapez 'open projects' pour naviguer directement à ma section."
          break
        case 'open projects':
          response = "Ouverture des projets..."
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          break
        case 'contact':
          response = "Email : rudyberthier@gmail.com\nGithub: github.com/RudyBerthier"
          break
        case 'clear':
          setHistory([])
          setInput('')
          return
        case 'sudo rm -rf /':
        case 'rm -rf /':
        case 'sudo rm -rf':
          setIsNuked(true)
          response = "⚠️ ERREUR CRITIQUE. NUKING PORTFOLIO FILESYSTEM...\n\nJUST KIDDING 😎 Pas mal essayé !"
          setTimeout(() => setIsNuked(false), 4000)
          break
        case '':
          break;
        default:
          response = `bash: ${cmd}: command not found`
      }

      if (response) {
        newHistory.push({ type: 'output', text: response })
      }

      setHistory(newHistory)
      setInput('')
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-slate-900 border border-slate-700 hover:border-violet-500 rounded-full shadow-2xl hover:bg-slate-800 transition-all text-violet-400 group cursor-pointer"
      >
        <TerminalSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isNuked ? { x: [-10, 10, -10, 10, 0], opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } } : { opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-28 right-6 w-11/12 md:max-w-md bg-slate-950/90 border border-slate-700/50 rounded-lg shadow-2xl overflow-hidden z-50 backdrop-blur-xl font-mono text-sm transition-colors duration-300 ${isNuked ? 'border-red-500 bg-red-950/40' : ''}`}
          >
            {/* Window Header */}
            <div className="flex items-center px-4 py-2 bg-slate-900 border-b border-slate-800/50 cursor-default">
              <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-400" onClick={() => setIsOpen(false)} />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-slate-400 text-xs font-semibold flex-1 text-center mr-8 select-none">rudy@portfolio:~</div>
            </div>

            {/* Terminal Body */}
            <div 
              className="p-4 h-64 overflow-y-auto w-full scrollbar-none"
              onClick={(e) => {
                e.currentTarget.querySelector('input')?.focus()
              }}
            >
              <div className="space-y-2 pb-2">
                {history.map((line, i) => (
                  <div key={i} className={`whitespace-pre-wrap ${
                    line.type === 'user' ? 'text-cyan-400' : 
                    line.type === 'system' ? 'text-slate-500' : 
                    isNuked ? 'text-red-500 font-bold' : 'text-slate-300'
                  }`}>
                    {line.text}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center">
                <span className={`mr-2 ${isNuked ? 'text-red-500 font-bold' : 'text-violet-400'}`}>rudy@portfolio:~$</span>
                <input
                  type="text"
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className={`flex-1 bg-transparent border-none outline-none ${isNuked ? 'text-red-500 font-bold' : 'text-white'}`}
                  spellCheck={false}
                />
              </div>
              <div ref={endOfMessagesRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Scroll Progress Bar
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 origin-left z-[9999]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 font-sans selection:bg-violet-500/30 relative overflow-hidden">
      <ScrollProgressBar />
      <MouseTracker />
      <CommandPalette />
      <InteractiveTerminal />
      <BatteryIndicator />

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
        <AboutBentoSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </div>
  )
}
