'use client'

import { useMemo, useState } from 'react'
import './home.css'

const breeds = ['All breeds', 'Golden retriever', 'Labrador retriever', 'Cavalier King Charles spaniel', 'French bulldog', 'Poodle', 'Pug', 'Dachshund', 'Pit bull']

const owners = {
  maya: { name: 'Maya Chen', image: '/images/golden-owner.png', hint: 'Plant parent · 29' },
  theo: { name: 'Theo Brooks', image: '/images/frenchie-owner.png', hint: 'Weekend surfer · 34' },
  jordan: { name: 'Jordan Williams', image: '/images/labrador-owner.png', hint: 'Jazz collector · 58' },
  priya: { name: 'Priya Shah', image: '/images/cavalier-owner.png', hint: 'City stylist · 31' },
  elliot: { name: 'Elliot Stone', image: '/images/poodle-owner.png', hint: 'Ceramic artist · 26' },
  camila: { name: 'Camila Reyes', image: '/images/pug-owner.png', hint: 'Sunday chef · 43' },
  river: { name: 'River Morgan', image: '/images/dachshund-owner.png', hint: 'Vintage hunter · 36' },
  kenji: { name: 'Kenji Tanaka', image: '/images/pitbull-owner.png', hint: 'Garden volunteer · 67' },
}

const rounds = [
  { dog: '/images/golden-retriever.png', dogAlt: 'AI-generated golden retriever portrait', breed: 'Golden retriever', options: [owners.maya, owners.priya], answer: owners.maya.name },
  { dog: '/images/labrador.png', dogAlt: 'AI-generated Labrador retriever portrait', breed: 'Labrador retriever', options: [owners.jordan, owners.elliot], answer: owners.jordan.name },
  { dog: '/images/cavalier.png', dogAlt: 'AI-generated Cavalier King Charles spaniel portrait', breed: 'Cavalier King Charles spaniel', options: [owners.priya, owners.camila], answer: owners.priya.name },
  { dog: '/images/frenchie.png', dogAlt: 'AI-generated French bulldog portrait', breed: 'French bulldog', options: [owners.theo, owners.river], answer: owners.theo.name },
  { dog: '/images/poodle.png', dogAlt: 'AI-generated poodle portrait', breed: 'Poodle', options: [owners.elliot, owners.maya], answer: owners.elliot.name },
  { dog: '/images/pug.png', dogAlt: 'AI-generated pug portrait', breed: 'Pug', options: [owners.camila, owners.kenji], answer: owners.camila.name },
  { dog: '/images/dachshund.png', dogAlt: 'AI-generated dachshund portrait', breed: 'Dachshund', options: [owners.river, owners.theo], answer: owners.river.name },
  { dog: '/images/pitbull.png', dogAlt: 'AI-generated pit bull portrait', breed: 'Pit bull', options: [owners.kenji, owners.jordan], answer: owners.kenji.name },
]

export default function HomePage() {
  const [breed, setBreed] = useState('All breeds')
  const [round, setRound] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(7)
  const visibleRounds = breed === 'All breeds' ? rounds : rounds.filter((item) => item.breed === breed)
  const current = visibleRounds[round % visibleRounds.length]
  const isCorrect = selected === current.answer
  const status = useMemo(() => selected ? (isCorrect ? 'Nice read. You nailed it.' : `Close — ${current.answer} is the owner.`) : 'Pick the person who feels like a match.', [selected, isCorrect, current.answer])

  function choose(name: string) {
    if (selected) return
    setSelected(name)
    if (name === current.answer) setScore((value) => value + 1)
  }

  function nextRound() {
    setRound((value) => value + 1)
    setSelected(null)
  }

  return (
    <main className="game-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Pawtrait home"><span className="wordmark-mark">✦</span> pawtrait</a>
        <nav className="topnav" aria-label="Main navigation">
          <a className="nav-active" href="#play">Play</a>
          <a href="#leaderboard">Leaderboard</a>
        </nav>
        <button className="profile-button" aria-label="Open profile"><span>RC</span><md-icon>expand_more</md-icon></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> DAILY PAWTRAIT</p>
          <h1>Who&apos;s<br /><em>the</em> human?</h1>
          <p className="hero-description">Every dog has a type. Read the room, trust your gut, and match the pup to their person.</p>
          <div className="hero-stats"><span><strong>10</strong> rounds</span><span><strong>+1</strong> point per match</span><span><strong>∞</strong> bragging rights</span></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="sun-disc" /><div className="hero-sticker">good<br /><span>vibes</span></div><img src="/images/golden-retriever.png" alt="" /></div>
      </section>

      <section className="play-area" id="play">
        <div className="section-heading"><div><p className="eyebrow">ROUND {String(round + 1).padStart(2, '0')} <span className="slash">/ 10</span></p><h2>Find the match</h2></div><div className="score-pill"><md-icon>bolt</md-icon><strong>{score}</strong><span>points</span></div></div>
        <div className="breed-row" aria-label="Filter by breed">{breeds.map((item) => <button key={item} className={breed === item ? 'breed-chip selected' : 'breed-chip'} onClick={() => { setBreed(item); setRound(0); setSelected(null) }}>{item}</button>)}</div>

        <div className="game-grid">
          <div className="dog-card">
            <div className="card-label"><span className="label-dot" /> THE DOG</div>
            <div className="dog-image-wrap"><img src={current.dog} alt={current.dogAlt} /><span className="breed-tag">{current.breed}</span></div>
            <p className="dog-caption">Somewhere between<br /><strong>chaos</strong> &amp; cuddles.</p>
          </div>
          <div className="owners-panel">
            <div className="card-label">WHO DOES <span className="label-paw">✦</span> BELONG TO?</div>
            <div className="owner-options">{current.options.map((option, index) => <button key={option.name} className={`owner-option ${selected === option.name ? (option.name === current.answer ? 'correct' : 'wrong') : ''}`} onClick={() => choose(option.name)}><span className="option-number">0{index + 1}</span><img src={option.image} alt={`AI-generated portrait of ${option.name}`} /><span className="owner-info"><strong>{option.name}</strong><small>{option.hint}</small></span><span className="option-arrow">{selected === option.name ? (option.name === current.answer ? '✓' : '×') : '→'}</span></button>)}</div>
            <div className={`answer-note ${selected ? 'visible' : ''}`} aria-live="polite"><span>{selected ? (isCorrect ? '✦' : '○') : '○'}</span>{status}</div>
            <button className="next-button" onClick={nextRound} disabled={!selected}>Next pup <md-icon>arrow_forward</md-icon></button>
          </div>
        </div>
      </section>

      <section className="leaderboard" id="leaderboard"><div className="leaderboard-copy"><p className="eyebrow">THE PACK</p><h2>Top dogs<br /><em>this week.</em></h2><p>Compare your read on the room with friends and fellow dog people.</p><button className="outline-button">View full leaderboard <md-icon>arrow_forward</md-icon></button></div><div className="leader-list"><div className="leader-header"><span>RANK</span><span>PLAYER</span><span>SCORE</span></div>{[['01','Sofia M.','94'],['02','You','87'],['03','Alex R.','82'],['04','Jamie K.','78']].map(([rank,name,value]) => <div className={`leader-row ${name === 'You' ? 'you-row' : ''}`} key={rank}><span className="rank">{rank}</span><span className="player"><span className="avatar">{name.charAt(0)}</span>{name}{name === 'You' && <small>that&apos;s you</small>}</span><strong>{value}</strong></div>)}</div></section>
      <footer className="footer"><span>pawtrait © 2026</span><span>AI-generated portraits · made for good guesses</span></footer>
    </main>
  )
}

