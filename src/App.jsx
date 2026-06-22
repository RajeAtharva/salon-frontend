import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:8080/api'
const AREAS = ['All', 'Kothrud', 'Wakad', 'Baner', 'Hinjewadi']

// ============ LOGIN SCREEN ============
function Login({ onLogin }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f8', padding: '20px', fontFamily: 'Arial' }}>
            <div style={{ background: 'white', borderRadius: '14px', padding: '32px', width: '100%', maxWidth: '380px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                    <div style={{ width: '42px', height: '42px', background: '#1a1a2e', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f0c040', fontSize: '20px' }}>✂️</div>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c' }}>SalonQ</div>
                        <div style={{ fontSize: '12px', color: '#718096' }}>Smart Queue Management</div>
                    </div>
                </div>

                <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#1a202c', marginBottom: '2px' }}>Welcome back</div>
                <div style={{ fontSize: '13px', color: '#718096', marginBottom: '20px' }}>Log in to continue</div>

                <div style={{ marginBottom: '18px' }}>
                    <div style={{ fontSize: '12px', color: '#718096', marginBottom: '8px' }}>Try a demo account:</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div onClick={() => fillDemo('customer')} style={{
                            flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px',
                            background: '#f8fafc', cursor: 'pointer', fontSize: '12px', color: '#4a5568', textAlign: 'center'
                        }}>
                            <div style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '2px' }}>Customer</div>
                            Atharva / cust123
                        </div>
                        <div onClick={() => fillDemo('owner')} style={{
                            flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px',
                            background: '#f8fafc', cursor: 'pointer', fontSize: '12px', color: '#4a5568', textAlign: 'center'
                        }}>
                            <div style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '2px' }}>Salon Owner</div>
                            Royal / owner123
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '13px', color: '#718096', display: 'block', marginBottom: '6px' }}>Username</label>
                    <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username"
                           style={{ width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #cbd5e0', borderRadius: '8px', background: 'white', color: '#1a202c' }} />
                </div>

                <div style={{ marginBottom: '8px' }}>
                    <label style={{ fontSize: '13px', color: '#718096', display: 'block', marginBottom: '6px' }}>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"
                           style={{ width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #cbd5e0', borderRadius: '8px', background: 'white', color: '#1a202c' }} />
                </div>

                {error && (
                    <div style={{ fontSize: '12px', color: '#c53030', marginBottom: '10px' }}>⚠️ {error}</div>
                )}

                <button onClick={handleLogin} style={{
                    width: '100%', padding: '11px', background: '#1a1a2e', color: '#f0c040',
                    border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold',
                    cursor: 'pointer', marginTop: '8px'
                }}>
                    Log in
                </button>
            </div>
        </div>
    )
}

// ============ TOP NAV ============
function TopNav({ user, brand, onLogout }) {
    return (
        <div style={{ background: '#1a1a2e', color: '#f0f0f0', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 'bold', color: '#f0c040' }}>
                ✂️ {brand}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '13px', color: '#aaa' }}>{user}</span>
                <button onClick={onLogout} style={{
                    background: 'transparent', border: '1px solid #444', color: '#ccc',
                    padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer'
                }}>Logout</button>
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
        if (wait <= 15) return { bg: '#eaf3de', text: '#3b6d11' }
        if (wait <= 30) return { bg: '#faeeda', text: '#854f0b' }
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
        <div style={{ minHeight: '100vh', background: '#f0f4f8', fontFamily: 'Arial' }}>
            <TopNav brand="SalonQ" user={userName} onLogout={onLogout} />

            <div style={{ padding: '24px', maxWidth: '700px', margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <button onClick={() => setActiveTab('browse')} style={{
                        flex: 1, padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer',
                        border: activeTab === 'browse' ? '1px solid #1a1a2e' : '1px solid #e2e8f0',
                        background: activeTab === 'browse' ? '#1a1a2e' : 'white',
                        color: activeTab === 'browse' ? '#f0c040' : '#718096'
                    }}>Browse Salons</button>
                    <button onClick={() => setActiveTab('bookings')} style={{
                        flex: 1, padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer',
                        border: activeTab === 'bookings' ? '1px solid #1a1a2e' : '1px solid #e2e8f0',
                        background: activeTab === 'bookings' ? '#1a1a2e' : 'white',
                        color: activeTab === 'bookings' ? '#f0c040' : '#718096'
                    }}>My Bookings</button>
                </div>

                {activeTab === 'browse' && (
                    <>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search salons..."
                            style={{ width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #cbd5e0', borderRadius: '8px', marginBottom: '16px', background: 'white', color: '#1a202c' }}
                        />

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {AREAS.map(a => (
                        <div key={a} onClick={() => setArea(a)} style={{
                            padding: '7px 16px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer',
                            background: area === a ? '#1a1a2e' : 'white',
                            color: area === a ? '#f0c040' : '#718096',
                            border: area === a ? '1px solid #1a1a2e' : '1px solid #e2e8f0'
                        }}>{a}</div>
                    ))}
                </div>

                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a202c', marginBottom: '12px' }}>
                    {filtered.length} salon{filtered.length !== 1 ? 's' : ''} nearby
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {filtered.map(salon => {
                        const q = queueInfo[salon.id]
                        const wait = q ? q.estimatedWaitMinutes : 0
                        const wc = waitColor(wait)
                        return (
                            <div key={salon.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                    <div>
                                        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1a202c' }}>{salon.name}</div>
                                        <div style={{ fontSize: '12px', color: '#718096', marginTop: '2px' }}>📍 {salon.area}</div>
                                    </div>
                                    <div style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', background: wc.bg, color: wc.text }}>
                                        {wait} min wait
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <span style={{ fontSize: '12px', color: '#718096' }}>👥 {q ? q.totalInQueue : 0} in queue</span>
                                    <span style={{ fontSize: '12px', color: '#718096' }}>{formatSalonRating(salon)}</span>
                                </div>
                                <button onClick={() => openModal(salon)} style={{
                                    marginTop: '10px', width: '100%', padding: '9px', background: '#1a1a2e',
                                    color: '#f0c040', border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer'
                                }}>Book appointment</button>
                            </div>
                        )
                    })}
                </div>

                    </>
                )}

                {activeTab === 'bookings' && (
                    !lastPhone ? (
                        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', fontSize: '13px', color: '#718096', textAlign: 'center' }}>
                            Make a booking first to see your history here.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {bookingHistory.map(booking => {
                                const sc = statusColor(booking.status)
                                return (
                                    <div key={booking.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                                            <div>
                                                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1a202c' }}>{booking.salon?.name || booking.salonName}</div>
                                                <div style={{ fontSize: '12px', color: '#718096', marginTop: '2px' }}>{booking.service} with {booking.barber?.name || booking.barberName}</div>
                                            </div>
                                            <div style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', background: sc.bg, color: sc.text }}>
                                                {booking.status}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#718096' }}>{formatBookingDate(booking)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                )}
            </div>

            {/* Booking Modal */}
            {modalSalon && (
                <div onClick={(e) => e.target === e.currentTarget && setModalSalon(null)} style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px'
                }}>
                    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '380px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#1a202c' }}>{modalSalon.name}</span>
                            <button onClick={() => setModalSalon(null)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#718096' }}>✕</button>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '12px', color: '#718096', marginBottom: '8px', fontWeight: 'bold' }}>Recent reviews</div>
                            {recentReviews.length === 0 ? (
                                <div style={{ fontSize: '12px', color: '#718096', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
                                    No reviews yet.
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {recentReviews.map(review => (
                                        <div key={review.id || `${review.customerName}-${review.rating}-${review.comment}`} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                                                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1a202c' }}>{review.customerName || 'Customer'}</span>
                                                <span style={{ fontSize: '12px', color: '#f0c040' }}>{'★'.repeat(review.rating || 0)}</span>
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#718096', lineHeight: '1.35' }}>{review.comment || 'No comment provided.'}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {!success ? (
                            <>
                                <div style={{ fontSize: '12px', color: '#718096', marginBottom: '6px' }}>Phone number</div>
                                <input value={form.customerPhone} onChange={e => setForm({ ...form, customerPhone: e.target.value })}
                                       placeholder="98765 43210"
                                       style={{ width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #cbd5e0', borderRadius: '8px', marginBottom: '14px', background: 'white', color: '#1a202c' }} />

                                <div style={{ fontSize: '12px', color: '#718096', marginBottom: '8px' }}>Select service</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                                    {services.map(service => (
                                        <div key={service.id} onClick={() => setForm({ ...form, service: service.serviceName })} style={{
                                            padding: '8px', border: '1px solid', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', textAlign: 'center',
                                            borderColor: form.service === service.serviceName ? '#1a1a2e' : '#cbd5e0',
                                            background: form.service === service.serviceName ? '#eeedfe' : 'white',
                                            color: form.service === service.serviceName ? '#1a1a2e' : '#718096'
                                        }}>{service.serviceName} — ₹{service.price}</div>
                                    ))}
                                </div>

                                <div style={{ fontSize: '12px', color: '#718096', marginBottom: '8px' }}>Select barber</div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
                                    {barbers.map(b => (
                                        <div key={b.id} onClick={() => b.status === 'AVAILABLE' && setForm({ ...form, barberId: b.id })} style={{
                                            padding: '8px 14px', border: '2px solid', borderRadius: '8px', fontSize: '13px', textAlign: 'center',
                                            cursor: b.status === 'BUSY' ? 'not-allowed' : 'pointer',
                                            borderColor: form.barberId === b.id ? '#1a1a2e' : '#e2e8f0',
                                            background: form.barberId === b.id ? '#eeedfe' : 'white',
                                            color: b.status === 'BUSY' ? '#a0aec0' : '#1a202c'
                                        }}>
                                            <div style={{ fontWeight: 'bold' }}>{b.name}</div>
                                            <div style={{ fontSize: '10px', color: b.status === 'AVAILABLE' ? '#3b6d11' : '#a32d2d' }}>
                                                {b.status === 'AVAILABLE' ? 'Available' : 'Busy'}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button onClick={confirmBooking} style={{
                                    width: '100%', padding: '10px', background: '#1a1a2e', color: '#f0c040',
                                    border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer'
                                }}>Confirm booking</button>
                            </>
                        ) : (
                            <>
                                <div style={{ background: '#eaf3de', border: '1px solid #c0dd97', borderRadius: '8px', padding: '14px', fontSize: '13px', color: '#3b6d11', marginBottom: '14px' }}>
                                    ✅ Booking confirmed at <strong>{modalSalon.name}</strong>! You'll get a WhatsApp reminder 10 min before your turn.
                                </div>

                                {reviewSubmitted ? (
                                    <div style={{ background: '#1a1a2e', color: '#f0c040', borderRadius: '8px', padding: '12px', fontSize: '13px', textAlign: 'center', fontWeight: 'bold' }}>
                                        Thanks for your feedback!
                                    </div>
                                ) : (
                                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
                                        <div style={{ fontSize: '12px', color: '#718096', marginBottom: '8px', fontWeight: 'bold' }}>Leave a review</div>
                                        <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button key={star} onClick={() => setSelectedRating(star)} style={{
                                                    background: 'transparent', border: 'none', cursor: 'pointer', padding: '0 2px',
                                                    color: star <= selectedRating ? '#f0c040' : '#cbd5e0', fontSize: '22px', lineHeight: 1
                                                }}>★</button>
                                            ))}
                                        </div>
                                        <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)}
                                                  placeholder="Share your experience..."
                                                  style={{ width: '100%', minHeight: '72px', resize: 'vertical', padding: '10px 12px', fontSize: '13px', border: '1px solid #cbd5e0', borderRadius: '8px', marginBottom: '10px', background: 'white', color: '#1a202c' }} />
                                        <button onClick={submitReview} style={{
                                            width: '100%', padding: '9px', background: '#1a1a2e', color: '#f0c040',
                                            border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer'
                                        }}>Submit review</button>
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

    useEffect(() => {
        fetchBarbers()
        fetchQueue()
        fetchServices()
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

    const avgWait = queue.length > 0 ? queue.length * 15 : 0

    return (
        <div style={{ minHeight: '100vh', background: '#f0f4f8', fontFamily: 'Arial' }}>
            <TopNav brand={salonName} user="Owner Dashboard" onLogout={onLogout} />

            <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ background: '#e2e8f0', borderRadius: '8px', padding: '14px 16px' }}>
                        <div style={{ fontSize: '12px', color: '#718096', marginBottom: '4px' }}>Today's bookings</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c' }}>{bookingsToday}</div>
                    </div>
                    <div style={{ background: '#e2e8f0', borderRadius: '8px', padding: '14px 16px' }}>
                        <div style={{ fontSize: '12px', color: '#718096', marginBottom: '4px' }}>In queue</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c' }}>{queue.length}</div>
                    </div>
                    <div style={{ background: '#e2e8f0', borderRadius: '8px', padding: '14px 16px' }}>
                        <div style={{ fontSize: '12px', color: '#718096', marginBottom: '4px' }}>Avg wait</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c' }}>{avgWait}m</div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

                    <div>
                        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 18px', marginBottom: '14px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a202c', marginBottom: '12px' }}>👥 Barbers</div>
                            {barbers.map(b => (
                                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: '1px solid #f0f4f8' }}>
                                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#eeedfe', color: '#534ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold' }}>
                                        {b.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <span style={{ flex: 1, fontSize: '13px', fontWeight: 'bold', color: '#1a202c' }}>{b.name}</span>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: b.status === 'AVAILABLE' ? '#639922' : '#E24B4A' }}></span>
                                    <button onClick={() => toggleBarber(b)} style={{
                                        padding: '5px 10px', fontSize: '11px', borderRadius: '6px', cursor: 'pointer',
                                        border: '1px solid #cbd5e0', background: '#f8fafc', color: '#4a5568'
                                    }}>
                                        {b.status === 'AVAILABLE' ? 'Mark busy' : 'Mark free'}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 18px', marginBottom: '14px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a202c', marginBottom: '12px' }}>Service pricing</div>
                            {services.length === 0 && (
                                <div style={{ fontSize: '13px', color: '#a0aec0', textAlign: 'center', padding: '12px 0' }}>No services added</div>
                            )}
                            {services.map(service => (
                                <div key={service.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid #f0f4f8' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a202c' }}>{service.serviceName}</span>
                                    <span style={{ fontSize: '13px', color: '#718096' }}>₹{service.price}</span>
                                </div>
                            ))}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px', gap: '8px', marginTop: '14px' }}>
                                <input
                                    value={newService.serviceName}
                                    onChange={e => setNewService({ ...newService, serviceName: e.target.value })}
                                    placeholder="Service name"
                                    style={{ padding: '9px 10px', fontSize: '13px', border: '1px solid #cbd5e0', borderRadius: '8px', background: 'white', color: '#1a202c' }}
                                />
                                <input
                                    type="number"
                                    value={newService.price}
                                    onChange={e => setNewService({ ...newService, price: e.target.value })}
                                    placeholder="Price"
                                    style={{ padding: '9px 10px', fontSize: '13px', border: '1px solid #cbd5e0', borderRadius: '8px', background: 'white', color: '#1a202c' }}
                                />
                            </div>
                            <button onClick={addService} style={{
                                width: '100%', padding: '9px', background: '#1a1a2e', color: '#f0c040',
                                border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold',
                                cursor: 'pointer', marginTop: '8px'
                            }}>Add service</button>
                        </div>

                        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 18px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a202c', marginBottom: '12px' }}>🔔 Notifications</div>
                            <div style={{ fontSize: '12px', color: '#718096', padding: '6px 0', borderBottom: '1px solid #f0f4f8' }}>📅 New bookings auto-update queue below</div>
                            <div style={{ fontSize: '12px', color: '#718096', padding: '6px 0' }}>⏱️ Wait time recalculates automatically</div>
                        </div>
                    </div>

                    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 18px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a202c', marginBottom: '12px' }}>📋 Live queue</div>
                        {queue.length === 0 && (
                            <div style={{ fontSize: '13px', color: '#a0aec0', textAlign: 'center', padding: '20px 0' }}>Queue is empty</div>
                        )}
                        {queue.map((booking, i) => (
                            <div key={booking.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: '1px solid #f0f4f8' }}>
                                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#1a1a2e', color: '#f0c040', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {i + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a202c' }}>{booking.customerName}</div>
                                    <div style={{ fontSize: '11px', color: '#718096' }}>{booking.service} · {booking.barber?.name}</div>
                                </div>
                                <button onClick={() => completeBooking(booking.id)} style={{
                                    padding: '5px 10px', fontSize: '11px', borderRadius: '6px', cursor: 'pointer',
                                    border: '1px solid #c0dd97', background: '#eaf3de', color: '#3b6d11'
                                }}>Done</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ============ MAIN APP ============
function App() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')

    const handleLogin = (loginData) => {
        setToken(loginData.token)
        setUser({
            ...loginData,
            role: loginData.role?.toLowerCase(),
            name: loginData.username
        })
    }

    const handleLogout = () => {
        setUser(null)
        setToken('')
    }

    if (!user) return <Login onLogin={handleLogin} />

    if (user.role === 'owner') {
        return <OwnerView salonName={user.name} salonId={user.salonId} token={token} onLogout={handleLogout} />
    }

    return <CustomerView userName={user.name} token={token} onLogout={handleLogout} />
}

export default App
