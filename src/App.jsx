import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://salon-queue-backend.onrender.com/api'
const AREAS = ['All', 'Kothrud', 'Wakad', 'Baner', 'Hinjewadi']

const navy = '#1a1a2e'
const gold = '#f0c040'
const pageBg = '#f0f4f8'
const border = '#e2e8f0'
const text = '#1a202c'
const muted = '#718096'
const darkBg = '#101010'
const darkPanel = '#2f2f2d'
const darkCard = '#11112a'
const darkBorder = 'rgba(255,255,255,0.18)'
const darkMuted = '#9ca3af'

const cardStyle = {
    background: 'white',
    border: `1px solid ${border}`,
    borderRadius: '12px',
    padding: '18px'
}

const buttonPrimary = {
    background: navy,
    color: gold,
    border: 'none',
    borderRadius: '8px',
    padding: '10px 14px',
    fontWeight: 'bold',
    cursor: 'pointer'
}

const darkInputStyle = {
    background: darkPanel,
    color: 'white',
    border: `1px solid ${darkBorder}`,
    borderRadius: '8px',
    padding: '11px 12px',
    fontSize: '14px'
}

const darkPageButton = {
    background: 'transparent',
    color: 'white',
    border: `1px solid ${darkBorder}`,
    borderRadius: '7px',
    padding: '9px 14px',
    fontWeight: 'bold',
    cursor: 'pointer'
}

function PublicNav({ onHome, onFindSalon, onOwnerLogin, onLogin }) {
    return (
        <div style={{ height: '44px', background: '#17172b', color: 'white', padding: '0 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Arial, system-ui, sans-serif' }}>
            <div style={{ color: gold, fontWeight: 'bold', fontSize: '15px' }}>✂ SalonQ</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={onHome} style={darkPageButton}>Home</button>
                <button onClick={onFindSalon} style={darkPageButton}>Find Salon</button>
                <button onClick={onOwnerLogin} style={darkPageButton}>Dashboard</button>
                <button onClick={onLogin} style={darkPageButton}>Login</button>
                <span style={{ background: '#0f7a3b', color: '#9ae6b4', borderRadius: '999px', padding: '5px 9px', fontSize: '11px', fontWeight: 'bold' }}>● Live</span>
            </div>
        </div>
    )
}

// ============ LANDING PAGE ============
function Landing({ onFindSalon, onOwnerLogin }) {
    const features = [
        ['📍', 'Live queue', 'Track salon queues and wait times before you leave home.'],
        ['⚡', 'Instant booking', 'Book a slot with the preferred service and barber.'],
        ['★', 'Ratings', 'Read recent customer reviews and average ratings.'],
        ['📊', 'Analytics', 'Owners see bookings, revenue, top services, and peak hours.'],
        ['🧭', 'Area filter', 'Find salons by Kothrud, Wakad, Baner, or Hinjewadi.'],
        ['🔒', 'Secure login', 'Role-based customer and owner dashboards.']
    ]

    const reviews = [
        ['Atharva', 'Booked in seconds and reached exactly when my turn was close.'],
        ['Riya', 'The queue estimate was accurate and the salon was ready.'],
        ['Omkar', 'Clean owner dashboard. Service pricing and queue updates are simple.']
    ]

    return (
        <div style={{ minHeight: '100vh', background: pageBg, fontFamily: 'Arial, system-ui, sans-serif' }}>
            <section style={{ background: navy, color: 'white', padding: '72px 24px 58px' }}>
                <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', border: `1px solid ${gold}`, color: gold, borderRadius: '999px', padding: '7px 12px', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' }}>
                        Real-time queue tracking
                    </div>
                    <h1 style={{ fontSize: '50px', lineHeight: '1.05', margin: '0 0 16px', maxWidth: '620px' }}>Skip the wait. Book your slot.</h1>
                    <p style={{ color: '#cbd5e0', fontSize: '17px', lineHeight: '1.6', maxWidth: '600px', margin: '0 0 26px' }}>
                        SalonQ connects customers with live salon queues, instant booking, reviews, and professional owner analytics.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button onClick={onFindSalon} style={{ background: gold, color: navy, border: 'none', borderRadius: '8px', padding: '12px 18px', fontWeight: 'bold', cursor: 'pointer' }}>Find a Salon</button>
                        <button onClick={onOwnerLogin} style={{ background: 'transparent', color: gold, border: `1px solid ${gold}`, borderRadius: '8px', padding: '12px 18px', fontWeight: 'bold', cursor: 'pointer' }}>Owner Login</button>
                    </div>
                </div>
            </section>

            <div style={{ maxWidth: '1040px', margin: '-28px auto 34px', padding: '0 24px' }}>
                <div style={{ ...cardStyle, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center', boxShadow: '0 10px 30px rgba(26,26,46,0.08)' }}>
                    <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: navy }}>5</div><div style={{ fontSize: '12px', color: muted }}>salons</div></div>
                    <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: navy }}>120+</div><div style={{ fontSize: '12px', color: muted }}>bookings today</div></div>
                    <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: navy }}>4.6★</div><div style={{ fontSize: '12px', color: muted }}>avg rating</div></div>
                </div>
            </div>

            <main style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 24px 40px' }}>
                <h2 style={{ color: text, margin: '0 0 14px' }}>Everything for modern salons</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '36px' }}>
                    {features.map(([icon, title, desc]) => (
                        <div key={title} style={cardStyle}>
                            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: navy, color: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', fontSize: '18px' }}>{icon}</div>
                            <div style={{ fontWeight: 'bold', color: text, marginBottom: '6px' }}>{title}</div>
                            <div style={{ fontSize: '13px', color: muted, lineHeight: '1.45' }}>{desc}</div>
                        </div>
                    ))}
                </div>

                <h2 style={{ color: text, margin: '0 0 14px' }}>Loved by customers</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
                    {reviews.map(([name, review]) => (
                        <div key={name} style={cardStyle}>
                            <div style={{ color: gold, marginBottom: '10px' }}>★★★★★</div>
                            <div style={{ fontSize: '13px', color: muted, lineHeight: '1.5', marginBottom: '12px' }}>"{review}"</div>
                            <div style={{ fontWeight: 'bold', color: text }}>{name}</div>
                        </div>
                    ))}
                </div>
            </main>

            <footer style={{ background: navy, color: '#cbd5e0', padding: '34px 24px 18px' }}>
                <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '24px' }}>
                    <div>
                        <div style={{ color: gold, fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>✂️ SalonQ</div>
                        <div style={{ fontSize: '13px', lineHeight: '1.5' }}>Smart queue management for customers and salon owners.</div>
                    </div>
                    <div><div style={{ color: 'white', fontWeight: 'bold', marginBottom: '8px' }}>Product</div><div style={{ fontSize: '13px' }}>Browse salons<br />Bookings<br />Reviews</div></div>
                    <div><div style={{ color: 'white', fontWeight: 'bold', marginBottom: '8px' }}>Owners</div><div style={{ fontSize: '13px' }}>Dashboard<br />Analytics<br />Service pricing</div></div>
                    <div><div style={{ color: 'white', fontWeight: 'bold', marginBottom: '8px' }}>Info</div><div style={{ fontSize: '13px' }}>Support<br />Privacy<br />Status</div></div>
                </div>
                <div style={{ maxWidth: '1040px', margin: '24px auto 0', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span>© 2026 SalonQ. All rights reserved.</span>
                    <span style={{ color: '#9ae6b4' }}>● All systems operational</span>
                </div>
            </footer>
        </div>
    )
}

// ============ REFERENCE LANDING PAGE ============
function LandingReference({ onFindSalon, onOwnerLogin }) {
    const featureCards = [
        ['◷', 'Live Queue tracking', 'See real-time waiting times and queue positions without calling the salon.'],
        ['▣', 'Instant booking', 'Book your slot with your preferred barber in just a few taps.'],
        ['☆', 'Ratings & reviews', 'Read honest reviews from real customers before you visit.'],
        ['▥', 'Owner analytics', 'Revenue tracking, peak hours, and top barber insights for salon owners.'],
        ['⌖', 'Area filter', 'Browse salons by area — Kothrud, Wakad, Baner, Hinjewadi and more.'],
        ['◔', 'Secure login', 'JWT-based authentication with separate roles for customers and owners.']
    ]

    const customerReviews = [
        ['Vishal K.', 'Kothrud', 'No more waiting outside. I book my slot and arrive just in time. Royal Salon is the best!'],
        ['Priya M.', 'Wakad', 'Rahul does an amazing job. Booked through SalonQ and got the exact time I wanted.'],
        ['Sanjay R.', 'Baner', 'Best beard trim in Kothrud. The queue tracker is super accurate. Saved me 45 minutes!']
    ]

    const navButton = {
        background: 'transparent',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.28)',
        borderRadius: '7px',
        padding: '8px 16px',
        fontWeight: 'bold',
        cursor: 'pointer'
    }

    return (
        <div style={{ minHeight: '100vh', background: '#101010', fontFamily: 'Arial, system-ui, sans-serif', color: 'white' }}>
            <section style={{ background: '#17172b', borderBottom: '1px solid rgba(255,255,255,0.10)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', boxSizing: 'border-box', padding: '0 42px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <nav style={{ height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ color: gold, fontWeight: 'bold', fontSize: '15px' }}>✂ SalonQ</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button onClick={onFindSalon} style={navButton}>Home</button>
                            <button onClick={onFindSalon} style={navButton}>Find Salon</button>
                            <button onClick={onOwnerLogin} style={navButton}>Dashboard</button>
                            <button onClick={onFindSalon} style={navButton}>Login</button>
                            <span style={{ background: '#0f7a3b', color: '#9ae6b4', borderRadius: '999px', padding: '5px 9px', fontSize: '11px', fontWeight: 'bold' }}>● Live</span>
                        </div>
                    </nav>

                    <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(240,192,64,0.25)', background: 'rgba(240,192,64,0.08)', color: gold, borderRadius: '999px', padding: '6px 13px', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' }}>
                            ◷ Real-time queue tracking
                        </div>
                        <h1 style={{ fontSize: '58px', lineHeight: '1.05', margin: '0 0 14px', fontWeight: 'bold' }}>
                            Skip the wait.<br /><span style={{ color: gold }}>Book your slot.</span>
                        </h1>
                        <p style={{ color: '#9ca3af', fontSize: '16px', lineHeight: '1.45', maxWidth: '520px', margin: '0 auto 28px' }}>
                            Find nearby salons, check live waiting times, and book appointments in seconds — all in one place.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <button onClick={onFindSalon} style={{ ...navButton, padding: '10px 16px' }}>⌕ Find a Salon</button>
                            <button onClick={onOwnerLogin} style={{ ...navButton, padding: '10px 16px' }}>Owner Login</button>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
                    <div style={{ width: '100%', maxWidth: '720px', margin: '0 auto', padding: '22px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '22px', textAlign: 'center' }}>
                        <div><div style={{ color: gold, fontSize: '18px', fontWeight: 'bold' }}>5</div><div style={{ color: '#9ca3af', fontSize: '10px' }}>Salons in Pune</div></div>
                        <div><div style={{ color: gold, fontSize: '18px', fontWeight: 'bold' }}>120+</div><div style={{ color: '#9ca3af', fontSize: '10px' }}>Bookings today</div></div>
                        <div><div style={{ color: gold, fontSize: '18px', fontWeight: 'bold' }}>4.6★</div><div style={{ color: '#9ca3af', fontSize: '10px' }}>Avg rating</div></div>
                        <div><div style={{ color: gold, fontSize: '18px', fontWeight: 'bold' }}>0 min</div><div style={{ color: '#9ca3af', fontSize: '10px' }}>Avg wait</div></div>
                    </div>
                </div>
            </section>

            <main style={{ width: '100%', margin: 0, padding: 0, background: '#101010' }}>
                <section style={{ minHeight: '100vh', boxSizing: 'border-box', padding: '76px 42px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ width: '100%', maxWidth: '1180px', margin: '0 auto' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(240,192,64,0.12)', color: gold, borderRadius: '999px', padding: '5px 10px', fontSize: '11px', fontWeight: 'bold', marginBottom: '14px' }}>? Why SalonQ</div>
                        <h2 style={{ color: 'white', margin: '0 0 8px', fontSize: '34px', fontWeight: 'bold' }}>Everything you need.</h2>
                        <p style={{ color: 'white', margin: '0 0 26px', fontSize: '15px' }}>From browsing to booking ? all in one app.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                            {featureCards.map(([icon, title, desc]) => (
                                <div key={title} style={{ background: '#2f2f2d', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '10px', padding: '24px', minHeight: '150px' }}>
                                    <div style={{ width: '34px', height: '34px', borderRadius: '7px', background: '#11112a', color: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', fontSize: '16px' }}>{icon}</div>
                                    <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '8px', fontSize: '15px' }}>{title}</div>
                                    <div style={{ fontSize: '13px', color: 'white', lineHeight: '1.45' }}>{desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={{ minHeight: '78vh', boxSizing: 'border-box', padding: '76px 42px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '1180px', margin: '0 auto' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(240,192,64,0.12)', color: gold, borderRadius: '999px', padding: '5px 10px', fontSize: '11px', fontWeight: 'bold', marginBottom: '14px' }}>? What customers say</div>
                        <h2 style={{ color: 'white', margin: '0 0 8px', fontSize: '34px', fontWeight: 'bold' }}>Trusted by Pune.</h2>
                        <p style={{ color: 'white', margin: '0 0 26px', fontSize: '15px' }}>Real reviews from real customers.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                            {customerReviews.map(([name, areaName, review]) => (
                                <div key={name} style={{ background: '#2f2f2d', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '10px', padding: '24px', minHeight: '150px' }}>
                                    <div style={{ color: gold, marginBottom: '10px', fontSize: '13px' }}>?????</div>
                                    <div style={{ fontSize: '13px', color: 'white', lineHeight: '1.5', marginBottom: '14px' }}>"{review}"</div>
                                    <div style={{ fontWeight: 'bold', color: 'white', fontSize: '13px' }}>{name}</div>
                                    <div style={{ color: 'white', fontSize: '12px' }}>{areaName}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer style={{ background: '#17172b', color: '#6b7280', padding: '24px 20px 18px' }}>
                <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '24px' }}>
                    <div>
                        <div style={{ color: gold, fontWeight: 'bold', fontSize: '15px', marginBottom: '8px' }}>✂ SalonQ</div>
                        <div style={{ fontSize: '13px', lineHeight: '1.55' }}>Smart queue management for Pune salons. Book, track, and manage — all in one place.</div>
                    </div>
                    <div><div style={{ color: 'white', fontWeight: 'bold', marginBottom: '8px', fontSize: '13px' }}>Product</div><div style={{ fontSize: '13px', lineHeight: '1.7' }}>Find Salon<br />Book Appointment<br />My Bookings<br />Reviews</div></div>
                    <div><div style={{ color: 'white', fontWeight: 'bold', marginBottom: '8px', fontSize: '13px' }}>Owners</div><div style={{ fontSize: '13px', lineHeight: '1.7' }}>Dashboard<br />Queue Management<br />Analytics<br />Register Salon</div></div>
                    <div><div style={{ color: 'white', fontWeight: 'bold', marginBottom: '8px', fontSize: '13px' }}>Info</div><div style={{ fontSize: '13px', lineHeight: '1.7' }}>About<br />Privacy Policy<br />Contact</div></div>
                </div>
                <div style={{ maxWidth: '1040px', margin: '24px auto 0', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span>© 2026 SalonQ. Built with Spring Boot + React.</span>
                    <span style={{ color: '#48bb78' }}>● All systems operational</span>
                </div>
            </footer>
        </div>
    )
}

// ============ LOGIN SCREEN ============
function Login({ onLogin, initialType = 'customer', onBack }) {
    const [username, setUsername] = useState(initialType === 'owner' ? 'Royal' : '')
    const [password, setPassword] = useState(initialType === 'owner' ? 'owner123' : '')
    const [error, setError] = useState('')

    const fillDemo = (type) => {
        if (type === 'customer') {
            setUsername('Atharva')
            setPassword('cust123')
        } else {
            setUsername('Royal')
            setPassword('owner123')
        }
    }

    const handleLogin = () => {
        axios.post(`${API}/auth/login`, { username, password })
            .then(res => {
                if (res.data.token) {
                    setError('')
                    onLogin(res.data)
                } else {
                    setError(res.data.message || 'Invalid username or password')
                }
            })
            .catch(() => setError('Could not connect to server'))
    }

    return (
        <div style={{ minHeight: '100vh', background: darkBg, fontFamily: 'Arial, system-ui, sans-serif', color: 'white' }}>
            <PublicNav
                onHome={onBack}
                onFindSalon={() => fillDemo('customer')}
                onOwnerLogin={() => fillDemo('owner')}
                onLogin={() => {}}
            />
            <div style={{ minHeight: 'calc(100vh - 44px)', display: 'flex', justifyContent: 'center', padding: '38px 20px' }}>
            <div style={{ background: darkPanel, border: `1px solid ${darkBorder}`, borderRadius: '8px', width: '100%', maxWidth: '255px', padding: '24px', height: 'fit-content' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ width: '36px', height: '36px', background: darkCard, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: gold, fontSize: '17px' }}>✂</div>
                    <div>
                        <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>Welcome to SalonQ</div>
                        <div style={{ fontSize: '11px', color: 'white' }}>Sign in to continue</div>
                    </div>
                </div>

                <div style={{ color: 'white', fontSize: '12px', marginBottom: '8px' }}>Try a demo account</div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <button onClick={() => fillDemo('customer')} style={{ flex: 1, padding: '10px', border: `1px solid ${darkBorder}`, borderRadius: '7px', background: darkPanel, cursor: 'pointer', textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', color: 'white', fontSize: '12px' }}>Customer</div>
                        <div style={{ color: 'white', fontSize: '10px', marginTop: '2px' }}>Atharva / cust123</div>
                    </button>
                    <button onClick={() => fillDemo('owner')} style={{ flex: 1, padding: '10px', border: `1px solid ${darkBorder}`, borderRadius: '7px', background: darkPanel, cursor: 'pointer', textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', color: 'white', fontSize: '12px' }}>Salon Owner</div>
                        <div style={{ color: 'white', fontSize: '10px', marginTop: '2px' }}>Royal / owner123</div>
                    </button>
                </div>

                <label style={{ fontSize: '11px', color: 'white', display: 'block', marginBottom: '6px' }}>Username</label>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username"
                       style={{ ...darkInputStyle, width: '100%', boxSizing: 'border-box', marginBottom: '12px' }} />

                <label style={{ fontSize: '11px', color: 'white', display: 'block', marginBottom: '6px' }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"
                       style={{ ...darkInputStyle, width: '100%', boxSizing: 'border-box', marginBottom: '14px' }} />

                {error && <div style={{ fontSize: '12px', color: '#c53030', marginBottom: '10px' }}>⚠️ {error}</div>}

                <button onClick={handleLogin} style={{ ...darkPageButton, width: '100%', padding: '10px', fontSize: '13px' }}>Sign in</button>
            </div>
            </div>
        </div>
    )
}

// ============ TOP NAV ============
function TopNav({ user, role, activeTab, setActiveTab, onLogout }) {
    return (
        <div style={{ height: '44px', background: '#17172b', color: 'white', padding: '0 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Arial, system-ui, sans-serif' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ color: gold, fontSize: '15px', fontWeight: 'bold' }}>✂ SalonQ</div>
                {role === 'customer' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {[
                            ['browse', 'Browse Salons'],
                            ['bookings', 'My Bookings']
                        ].map(([key, label]) => (
                            <button key={key} onClick={() => setActiveTab(key)} style={{
                                ...darkPageButton,
                                color: activeTab === key ? gold : 'white',
                                borderColor: activeTab === key ? gold : darkBorder,
                                cursor: 'pointer',
                                fontSize: '13px'
                            }}>{label}</button>
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button style={{ ...darkPageButton, color: gold, borderColor: gold }}>Dashboard</button>
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#0f7a3b', color: '#9ae6b4', borderRadius: '999px', padding: '5px 9px', fontSize: '11px', fontWeight: 'bold' }}>● Live</span>
                <span style={{ fontSize: '12px', color: '#e2e8f0' }}>{user}</span>
                <button onClick={onLogout} style={{ ...darkPageButton, padding: '7px 12px', fontSize: '12px' }}>Logout</button>
            </div>
        </div>
    )
}

// ============ CUSTOMER VIEW ============
function CustomerView({ userName, token, onLogout }) {
    const [salons, setSalons] = useState([])
    const [search, setSearch] = useState('')
    const [area, setArea] = useState('All')
    const [queueInfo, setQueueInfo] = useState({})
    const [modalSalon, setModalSalon] = useState(null)
    const [barbers, setBarbers] = useState([])
    const [services, setServices] = useState([])
    const [form, setForm] = useState({ customerName: userName, customerPhone: '', service: 'Haircut', barberId: '' })
    const [success, setSuccess] = useState(false)
    const [activeTab, setActiveTab] = useState('browse')
    const [lastPhone, setLastPhone] = useState('')
    const [bookingHistory, setBookingHistory] = useState([])
    const [salonRatings, setSalonRatings] = useState({})
    const [recentReviews, setRecentReviews] = useState([])
    const [selectedRating, setSelectedRating] = useState(0)
    const [reviewComment, setReviewComment] = useState('')
    const [reviewSubmitted, setReviewSubmitted] = useState(false)

    useEffect(() => {
        const url = area === 'All' ? `${API}/salons` : `${API}/salons/area/${area}`
        axios.get(url).then(res => {
            setSalons(res.data)
            res.data.forEach(s => fetchQueue(s.id))
            res.data.forEach(s => fetchSalonAverage(s.id))
        })
    }, [area])

    useEffect(() => {
        if (activeTab === 'bookings' && lastPhone) {
            fetchBookingHistory(lastPhone)
        }
    }, [activeTab, lastPhone])

    const fetchQueue = (id) => {
        axios.get(`${API}/bookings/salon/${id}/queue`).then(res =>
            setQueueInfo(prev => ({ ...prev, [id]: res.data })))
    }

    const fetchBookingHistory = (phone) => {
        axios.get(`${API}/bookings/customer/${phone}`).then(res => setBookingHistory(res.data))
    }

    const fetchSalonAverage = (id) => {
        axios.get(`${API}/reviews/salon/${id}/average`).then(res =>
            setSalonRatings(prev => ({ ...prev, [id]: res.data }))
        ).catch(() =>
            setSalonRatings(prev => ({ ...prev, [id]: { average: 0, count: 0 } }))
        )
    }

    const fetchRecentReviews = (id) => {
        axios.get(`${API}/reviews/salon/${id}`).then(res => {
            const reviews = [...res.data].sort((a, b) => {
                const aTime = new Date(a.createdAt || a.reviewDate || a.date || 0).getTime()
                const bTime = new Date(b.createdAt || b.reviewDate || b.date || 0).getTime()
                return bTime - aTime || (b.id || 0) - (a.id || 0)
            })
            setRecentReviews(reviews.slice(0, 2))
        }).catch(() => setRecentReviews([]))
    }

    const formatSalonRating = (salon) => {
        const rating = salonRatings[salon.id]
        if (!rating || !rating.count) return '★ No reviews'
        return `★ ${Number(rating.average || 0).toFixed(1)} (${rating.count} review${rating.count !== 1 ? 's' : ''})`
    }

    const filtered = salons.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.area.toLowerCase().includes(search.toLowerCase())
    )

    const openModal = (salon) => {
        setModalSalon(salon)
        setSuccess(false)
        setServices([])
        setRecentReviews([])
        setSelectedRating(0)
        setReviewComment('')
        setReviewSubmitted(false)
        setForm({ customerName: userName, customerPhone: '', service: '', barberId: '' })
        fetchRecentReviews(salon.id)
        axios.get(`${API}/barbers/salon/${salon.id}`).then(res => setBarbers(res.data))
        axios.get(`${API}/services/salon/${salon.id}`).then(res => {
            setServices(res.data)
            setForm(prev => ({ ...prev, service: res.data[0]?.serviceName || '' }))
        })
    }

    const waitColor = (wait) => {
        if (wait === 0) return { bg: '#eaf3de', text: '#3b6d11' }
        if (wait < 30) return { bg: '#faeeda', text: '#854f0b' }
        return { bg: '#fcebeb', text: '#a32d2d' }
    }

    const statusColor = (status) => {
        if (status === 'PENDING') return { bg: '#faeeda', text: '#854f0b' }
        if (status === 'IN_SERVICE') return { bg: '#e0f2fe', text: '#075985' }
        if (status === 'COMPLETED') return { bg: '#eaf3de', text: '#3b6d11' }
        if (status === 'CANCELLED') return { bg: '#fcebeb', text: '#a32d2d' }
        return { bg: '#e2e8f0', text: '#4a5568' }
    }

    const formatBookingDate = (booking) => {
        const value = booking.bookingTime || booking.createdAt || booking.dateTime || booking.date
        if (!value) return 'Time not available'
        return new Date(value).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
    }

    const confirmBooking = () => {
        if (!form.customerPhone || !form.service || !form.barberId) {
            alert('Please fill phone number, select a service, and select a barber!')
            return
        }
        axios.post(`${API}/bookings`, {
            customerName: form.customerName,
            customerPhone: form.customerPhone,
            service: form.service,
            salon: { id: modalSalon.id },
            barber: { id: form.barberId }
        }).then(() => {
            setSuccess(true)
            setLastPhone(form.customerPhone)
            fetchQueue(modalSalon.id)
        })
    }

    const submitReview = () => {
        if (!selectedRating) {
            alert('Please select a star rating.')
            return
        }
        axios.post(`${API}/reviews`, {
            salonId: modalSalon.id,
            customerName: form.customerName,
            rating: selectedRating,
            comment: reviewComment
        }).then(() => {
            setReviewSubmitted(true)
            fetchSalonAverage(modalSalon.id)
            fetchRecentReviews(modalSalon.id)
        })
    }

    return (
        <div style={{ minHeight: '100vh', background: darkBg, fontFamily: 'Arial, system-ui, sans-serif', color: 'white' }}>
            <TopNav user={userName} role="customer" activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

            <main style={{ width: '100%', margin: '0' }}>
                {activeTab === 'browse' && (
                    <>
                        <div style={{ background: darkPanel, borderBottom: `1px solid ${darkBorder}`, display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', padding: '12px 20px' }}>
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search salons..."
                                style={{ ...darkInputStyle, flex: '1 1 260px' }}
                            />
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {AREAS.map(a => (
                                    <button key={a} onClick={() => setArea(a)} style={{
                                        padding: '8px 14px',
                                        borderRadius: '999px',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        background: area === a ? darkCard : darkPanel,
                                        color: area === a ? gold : 'white',
                                        border: area === a ? `1px solid ${darkCard}` : `1px solid ${darkBorder}`,
                                        fontWeight: 'bold'
                                    }}>{a}</button>
                                ))}
                            </div>
                        </div>

                        <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'white', margin: '0 20px 12px' }}>
                            {filtered.length} salon{filtered.length !== 1 ? 's' : ''} nearby
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px', padding: '0 20px 28px' }}>
                            {filtered.map(salon => {
                                const q = queueInfo[salon.id]
                                const wait = q ? q.estimatedWaitMinutes : 0
                                const wc = waitColor(wait)
                                return (
                                    <div key={salon.id} style={{ background: darkPanel, border: `1px solid ${darkBorder}`, borderLeft: `2px solid ${gold}`, borderRadius: '8px', padding: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>{salon.name}</div>
                                                <div style={{ fontSize: '12px', color: 'white', marginTop: '4px' }}>⌾ {salon.area}</div>
                                            </div>
                                            <div style={{ padding: '6px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', background: wc.bg, color: wc.text }}>
                                                {wait} min
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                                            <span style={{ fontSize: '11px', color: '#9dc8ff', background: '#06386c', borderRadius: '999px', padding: '5px 8px' }}>♧ {q ? q.totalInQueue : 0} in queue</span>
                                            <span style={{ fontSize: '11px', color: 'white', background: '#242421', borderRadius: '999px', padding: '5px 8px' }}>{formatSalonRating(salon)}</span>
                                        </div>
                                        <button onClick={() => openModal(salon)} style={{ ...darkPageButton, width: '100%', padding: '10px' }}>Book appointment</button>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )}

                {activeTab === 'bookings' && (
                    !lastPhone ? (
                        <div style={{ background: darkPanel, border: `1px solid ${darkBorder}`, borderRadius: '8px', fontSize: '14px', color: 'white', textAlign: 'center', padding: '28px', margin: '20px' }}>
                            Make a booking first to see your history here.
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px', padding: '20px' }}>
                            {bookingHistory.map(booking => {
                                const sc = statusColor(booking.status)
                                return (
                                    <div key={booking.id} style={{ background: darkPanel, border: `1px solid ${darkBorder}`, borderRadius: '8px', padding: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                                            <div>
                                                <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>{booking.salon?.name || booking.salonName}</div>
                                                <div style={{ fontSize: '12px', color: darkMuted, marginTop: '4px' }}>{booking.service} · {booking.barber?.name || booking.barberName}</div>
                                            </div>
                                            <div style={{ padding: '5px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold', background: sc.bg, color: sc.text }}>
                                                {booking.status}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '12px', color: darkMuted }}>{formatBookingDate(booking)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                )}
            </main>

            {modalSalon && (
                <div onClick={(e) => e.target === e.currentTarget && setModalSalon(null)} style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.58)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px'
                }}>
                    <div style={{ background: darkPanel, border: `1px solid ${darkBorder}`, borderRadius: '8px', padding: '18px', width: '100%', maxWidth: '270px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.28)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'white' }}>Book at {modalSalon.name}</div>
                            <button onClick={() => setModalSalon(null)} style={{ background: darkPanel, border: `1px solid ${darkBorder}`, borderRadius: '7px', fontSize: '18px', cursor: 'pointer', color: 'white', width: '44px', height: '34px' }}>?</button>
                        </div>

                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ fontSize: '11px', color: 'white', marginBottom: '8px' }}>Recent reviews</div>
                            {recentReviews.length === 0 ? (
                                <div style={{ fontSize: '11px', color: 'white', background: '#242421', borderRadius: '6px', padding: '10px' }}>No reviews yet.</div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {recentReviews.map(review => (
                                        <div key={review.id || `${review.customerName}-${review.rating}-${review.comment}`} style={{ background: '#242421', borderRadius: '6px', padding: '10px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                                                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>{review.customerName || 'Customer'}</span>
                                                <span style={{ fontSize: '12px', color: gold }}>{'?'.repeat(review.rating || 0)}</span>
                                            </div>
                                            <div style={{ fontSize: '11px', color: 'white', lineHeight: '1.35' }}>{review.comment || 'No comment provided.'}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {!success ? (
                            <>
                                <div style={{ fontSize: '11px', color: 'white', marginBottom: '6px' }}>Phone number</div>
                                <input value={form.customerPhone} onChange={e => setForm({ ...form, customerPhone: e.target.value })}
                                       placeholder="98765 43210"
                                       style={{ ...darkInputStyle, width: '100%', boxSizing: 'border-box', marginBottom: '14px' }} />

                                <div style={{ fontSize: '11px', color: 'white', marginBottom: '8px' }}>Select service</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                                    {services.map(service => (
                                        <button key={service.id} onClick={() => setForm({ ...form, service: service.serviceName })} style={{
                                            padding: '10px', border: '1px solid', borderRadius: '7px', fontSize: '12px', cursor: 'pointer', textAlign: 'center',
                                            borderColor: form.service === service.serviceName ? '#f8fafc' : darkBorder,
                                            background: form.service === service.serviceName ? '#f8fafc' : darkPanel,
                                            color: form.service === service.serviceName ? '#111827' : 'white'
                                        }}>
                                            <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>{service.serviceName}</div>
                                            <div style={{ fontSize: '10px' }}>?{service.price}</div>
                                        </button>
                                    ))}
                                </div>

                                <div style={{ fontSize: '11px', color: 'white', marginBottom: '8px' }}>Select barber</div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                                    {barbers.map(b => (
                                        <button key={b.id} onClick={() => b.status === 'AVAILABLE' && setForm({ ...form, barberId: b.id })} style={{
                                            padding: '8px 12px', border: '1px solid', borderRadius: '7px', fontSize: '11px', textAlign: 'center',
                                            cursor: b.status === 'BUSY' ? 'not-allowed' : 'pointer', borderColor: form.barberId === b.id ? gold : darkBorder,
                                            background: darkPanel, color: b.status === 'BUSY' ? '#a0aec0' : 'white'
                                        }}>
                                            <div>{b.name}</div>
                                            <span style={{ color: b.status === 'AVAILABLE' ? '#48bb78' : '#E24B4A', fontSize: '10px' }}>{b.status === 'AVAILABLE' ? 'Available' : 'Busy'}</span>
                                        </button>
                                    ))}
                                </div>

                                <button onClick={confirmBooking} style={{ ...darkPageButton, width: '100%', padding: '10px' }}>Confirm booking</button>
                            </>
                        ) : (
                            <>
                                <div style={{ background: '#14351f', border: '1px solid #276749', borderRadius: '8px', padding: '12px', fontSize: '12px', color: '#9ae6b4', marginBottom: '14px' }}>
                                    ? Booking confirmed at <strong>{modalSalon.name}</strong>! You'll get a WhatsApp reminder 10 min before your turn.
                                </div>

                                {reviewSubmitted ? (
                                    <div style={{ background: darkCard, color: gold, borderRadius: '8px', padding: '12px', fontSize: '13px', textAlign: 'center', fontWeight: 'bold' }}>
                                        Thanks for your feedback!
                                    </div>
                                ) : (
                                    <div style={{ border: `1px solid ${darkBorder}`, borderRadius: '8px', padding: '12px' }}>
                                        <div style={{ fontSize: '12px', color: 'white', marginBottom: '8px', fontWeight: 'bold' }}>Leave a review</div>
                                        <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button key={star} onClick={() => setSelectedRating(star)} style={{
                                                    background: 'transparent', border: 'none', cursor: 'pointer', padding: '0 2px',
                                                    color: star <= selectedRating ? gold : '#cbd5e0', fontSize: '24px', lineHeight: 1
                                                }}>?</button>
                                            ))}
                                        </div>
                                        <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)}
                                                  placeholder="Share your experience..."
                                                  style={{ ...darkInputStyle, width: '100%', boxSizing: 'border-box', minHeight: '76px', resize: 'vertical', marginBottom: '10px' }} />
                                        <button onClick={submitReview} style={{ ...darkPageButton, width: '100%' }}>Submit review</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

// ============ OWNER DASHBOARD ============
function OwnerView({ salonName, salonId, token, onLogout }) {
    const [barbers, setBarbers] = useState([])
    const [queue, setQueue] = useState([])
    const [bookingsToday, setBookingsToday] = useState(0)
    const [services, setServices] = useState([])
    const [newService, setNewService] = useState({ serviceName: '', price: '' })
    const [showAnalytics, setShowAnalytics] = useState(false)
    const [analyticsData, setAnalyticsData] = useState(null)
    const [ownerReviews, setOwnerReviews] = useState([])
    const [ownerRating, setOwnerRating] = useState(null)

    useEffect(() => {
        fetchBarbers()
        fetchQueue()
        fetchServices()
        fetchOwnerReviews()
        fetchOwnerAverage()
    }, [])

    const fetchBarbers = () => {
        axios.get(`${API}/barbers/salon/${salonId}`).then(res => setBarbers(res.data))
    }

    const fetchQueue = () => {
        axios.get(`${API}/bookings/salon/${salonId}/queue`).then(res => {
            setQueue(res.data.queue || [])
        })
        axios.get(`${API}/bookings/salon/${salonId}`).then(res => setBookingsToday(res.data.length))
    }

    const fetchServices = () => {
        axios.get(`${API}/services/salon/${salonId}`).then(res => setServices(res.data))
    }

    const fetchOwnerReviews = () => {
        axios.get(`${API}/reviews/salon/${salonId}`).then(res => {
            const reviews = [...res.data].sort((a, b) => {
                const aTime = new Date(a.createdAt || a.reviewDate || a.date || 0).getTime()
                const bTime = new Date(b.createdAt || b.reviewDate || b.date || 0).getTime()
                return bTime - aTime || (b.id || 0) - (a.id || 0)
            })
            setOwnerReviews(reviews.slice(0, 3))
        }).catch(() => setOwnerReviews([]))
    }

    const fetchOwnerAverage = () => {
        axios.get(`${API}/reviews/salon/${salonId}/average`).then(res => setOwnerRating(res.data)).catch(() => setOwnerRating({ average: 0, count: 0 }))
    }

    const handlePatchError = (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
            alert('Session expired, please log in again')
            onLogout()
        }
    }

    const toggleBarber = (barber) => {
        const newStatus = barber.status === 'AVAILABLE' ? 'BUSY' : 'AVAILABLE'
        axios.patch(`${API}/barbers/${barber.id}/status?status=${newStatus}`, null, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => fetchBarbers()).catch(handlePatchError)
    }

    const completeBooking = (id) => {
        axios.patch(`${API}/bookings/${id}/status?status=COMPLETED`, null, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => fetchQueue()).catch(handlePatchError)
    }

    const addService = () => {
        if (!newService.serviceName || !newService.price) {
            alert('Please enter service name and price')
            return
        }

        axios.post(`${API}/services`, {
            salon: { id: salonId },
            serviceName: newService.serviceName,
            price: Number(newService.price)
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            setNewService({ serviceName: '', price: '' })
            fetchServices()
        }).catch(handlePatchError)
    }

    const toggleAnalytics = () => {
        if (showAnalytics) {
            setShowAnalytics(false)
            return
        }

        axios.get(`${API}/analytics/salon/${salonId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            setAnalyticsData(res.data)
            setShowAnalytics(true)
        }).catch(handlePatchError)
    }

    const avgWait = queue.length > 0 ? queue.length * 15 : 0
    const peakHours = analyticsData?.peakHours || []
    const maxPeakBookings = Math.max(...peakHours.map(hour => hour.bookingCount || 0), 0)
    const revenue = analyticsData?.totalRevenue || 0
    const ratingLabel = ownerRating?.count ? Number(ownerRating.average || 0).toFixed(1) : 'N/A'

    return (
        <div style={{ minHeight: '100vh', background: darkBg, fontFamily: 'Arial, system-ui, sans-serif', color: 'white' }}>
            <TopNav user={salonName} role="owner" onLogout={onLogout} />

            <section style={{ background: '#17172b', color: 'white', padding: '24px 22px 22px' }}>
                <div style={{ width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ae6b4', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#48bb78' }}></span> Live dashboard
                        </div>
                        <h1 style={{ margin: 0, color: 'white', fontSize: '30px' }}>{salonName}</h1>
                    </div>
                    <button onClick={toggleAnalytics} style={{ ...darkPageButton, color: 'white' }}>
                        {showAnalytics ? 'Hide Analytics' : 'View Analytics'}
                    </button>
                </div>
            </section>

            <main style={{ padding: '24px', width: '100%', margin: '0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '14px' }}>
                    {[
                        ['Bookings today', bookingsToday],
                        ['In queue', queue.length],
                        ['Revenue', `₹${revenue}`],
                        ['Rating', ratingLabel]
                    ].map(([label, value]) => (
                        <div key={label} style={{ background: darkCard, color: 'white', border: `1px solid ${darkBorder}`, borderRadius: '7px', padding: '14px', textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: darkMuted, marginTop: '6px' }}>{label}</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: gold }}>{value}</div>
                        </div>
                    ))}
                </div>

                {showAnalytics && analyticsData && (
                    <div style={{ background: darkPanel, border: `1px solid ${darkBorder}`, borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', marginBottom: '14px' }}>Analytics</div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '12px' }}>
                            {[
                                ['Bookings today', analyticsData.totalBookingsToday || 0],
                                ['Completed', analyticsData.completedToday || 0],
                                ['Pending now', analyticsData.pendingNow || 0],
                                ['Revenue', `₹${analyticsData.totalRevenue || 0}`]
                            ].map(([label, value]) => (
                                <div key={label} style={{ background: '#242421', border: `1px solid ${darkBorder}`, borderRadius: '8px', padding: '12px' }}>
                                    <div style={{ fontSize: '11px', color: darkMuted, marginBottom: '4px' }}>{label}</div>
                                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: gold }}>{value}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                            <div style={{ background: '#242421', border: `1px solid ${darkBorder}`, borderRadius: '8px', padding: '12px' }}>
                                <div style={{ fontSize: '11px', color: darkMuted, marginBottom: '4px' }}>Top service</div>
                                <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>{analyticsData.topService || 'N/A'}</div>
                            </div>
                            <div style={{ background: '#242421', border: `1px solid ${darkBorder}`, borderRadius: '8px', padding: '12px' }}>
                                <div style={{ fontSize: '11px', color: darkMuted, marginBottom: '4px' }}>Top barber</div>
                                <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>{analyticsData.topBarber || 'N/A'}</div>
                            </div>
                        </div>

                        <div style={{ fontSize: '12px', color: darkMuted, marginBottom: '10px', fontWeight: 'bold' }}>Peak hours</div>
                        {maxPeakBookings === 0 ? (
                            <div style={{ fontSize: '13px', color: darkMuted, textAlign: 'center', padding: '16px 0', border: `1px solid ${darkBorder}`, borderRadius: '8px', background: '#242421' }}>
                                No booking data for today yet
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', minHeight: '112px', padding: '12px', border: `1px solid ${darkBorder}`, borderRadius: '8px', background: '#242421', overflowX: 'auto' }}>
                                {peakHours.map(hour => {
                                    const count = hour.bookingCount || 0
                                    const barHeight = maxPeakBookings ? Math.max((count / maxPeakBookings) * 80, count > 0 ? 8 : 0) : 0
                                    return (
                                        <div key={hour.hour} style={{ minWidth: '42px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                                            <div style={{ fontSize: '11px', color: darkMuted }}>{count}</div>
                                            <div style={{ width: '24px', height: `${barHeight}px`, background: navy, borderRadius: '6px 6px 0 0', border: `1px solid ${gold}` }}></div>
                                            <div style={{ fontSize: '11px', color: darkMuted }}>{hour.hour}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ background: darkCard, border: `1px solid ${darkBorder}`, borderRadius: '7px', padding: '16px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>♧ Barbers</div>
                        {barbers.map(b => (
                            <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#0b3a71', color: '#9dc8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
                                    {b.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'white' }}>{b.name}</div>
                                    <div style={{ display: 'inline-block', marginTop: '3px', padding: '2px 6px', borderRadius: '999px', fontSize: '10px', background: b.status === 'AVAILABLE' ? '#0f7a3b' : '#7a1d1d', color: b.status === 'AVAILABLE' ? '#9ae6b4' : '#feb2b2' }}>{b.status === 'AVAILABLE' ? 'Available' : 'Busy'}</div>
                                </div>
                                <button onClick={() => toggleBarber(b)} style={{ ...darkPageButton, padding: '8px 14px' }}>
                                    {b.status === 'AVAILABLE' ? 'Mark busy' : 'Mark free'}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={{ background: darkCard, border: `1px solid ${darkBorder}`, borderRadius: '7px', padding: '16px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>≡ Live Queue</div>
                        {queue.length === 0 && <div style={{ fontSize: '13px', color: darkMuted, textAlign: 'center', padding: '20px 0' }}>Queue is empty</div>}
                        {queue.map((booking, i) => (
                            <div key={booking.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#20203a', color: gold, fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {i + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'white' }}>{booking.customerName}</div>
                                    <div style={{ fontSize: '11px', color: darkMuted }}>{booking.service} · {booking.barber?.name}</div>
                                </div>
                                <button onClick={() => completeBooking(booking.id)} style={{ ...darkPageButton, padding: '8px 18px' }}>Done</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ background: darkPanel, border: `1px solid ${darkBorder}`, borderRadius: '7px', padding: '16px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>▤ Service pricing</div>
                        {services.length === 0 && <div style={{ fontSize: '13px', color: darkMuted, textAlign: 'center', padding: '12px 0' }}>No services added</div>}
                        {services.map(service => (
                            <div key={service.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>{service.serviceName}</span>
                                <span style={{ fontSize: '12px', color: gold }}>₹{service.price}</span>
                            </div>
                        ))}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '8px', marginTop: '14px' }}>
                            <input
                                value={newService.serviceName}
                                onChange={e => setNewService({ ...newService, serviceName: e.target.value })}
                                placeholder="Service name"
                                style={{ ...darkInputStyle, padding: '10px', fontSize: '13px' }}
                            />
                            <input
                                type="number"
                                value={newService.price}
                                onChange={e => setNewService({ ...newService, price: e.target.value })}
                                placeholder="Price"
                                style={{ ...darkInputStyle, padding: '10px', fontSize: '13px' }}
                            />
                        </div>
                        <button onClick={addService} style={{ ...darkPageButton, width: '100%', marginTop: '9px' }}>Add service</button>
                    </div>

                    <div style={{ background: darkPanel, border: `1px solid ${darkBorder}`, borderRadius: '7px', padding: '16px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>☆ Recent reviews</div>
                        {ownerReviews.length === 0 && <div style={{ fontSize: '13px', color: darkMuted, textAlign: 'center', padding: '20px 0' }}>No reviews yet</div>}
                        {ownerReviews.map(review => (
                            <div key={review.id || `${review.customerName}-${review.rating}-${review.comment}`} style={{ background: '#242421', borderRadius: '6px', padding: '10px', marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'white' }}>{review.customerName || 'Customer'}</span>
                                    <span style={{ fontSize: '12px', color: gold }}>{'★'.repeat(review.rating || 0)}</span>
                                </div>
                                <div style={{ fontSize: '12px', color: 'white', lineHeight: '1.4' }}>{review.comment || 'No comment provided.'}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

// ============ MAIN APP ============
function App() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')
    const [authPage, setAuthPage] = useState('landing')
    const [loginType, setLoginType] = useState('customer')

    const handleLogin = (loginData) => {
        setToken(loginData.token)
        setUser({
            ...loginData,
            role: loginData.role?.toLowerCase(),
            name: loginData.name || loginData.username
        })
    }

    const handleLogout = () => {
        setUser(null)
        setToken('')
        setAuthPage('login')
    }

    if (!user && authPage === 'landing') {
        return (
            <LandingReference
                onFindSalon={() => {
                    setLoginType('customer')
                    setAuthPage('login')
                }}
                onOwnerLogin={() => {
                    setLoginType('owner')
                    setAuthPage('login')
                }}
            />
        )
    }

    if (!user) {
        return <Login onLogin={handleLogin} initialType={loginType} onBack={() => setAuthPage('landing')} />
    }

    if (user.role === 'owner') {
        return <OwnerView salonName={user.name} salonId={user.salonId} token={token} onLogout={handleLogout} />
    }

    return <CustomerView userName={user.name} token={token} onLogout={handleLogout} />
}

export default App
