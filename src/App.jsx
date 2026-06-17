import { useState, useEffect } from 'react'
import axios from 'axios'

const AREAS = ['All', 'Kothrud', 'Wakad', 'Baner', 'Hinjewadi']

const inputStyle = {
    width: '100%', padding: '10px', marginBottom: '12px',
    borderRadius: '8px', border: '1px solid #cbd5e0',
    fontSize: '15px', background: 'white', color: '#1a202c'
}

// ============ OWNER DASHBOARD ============
function OwnerDashboard({ onBack }) {
    const [barbers, setBarbers] = useState([])
    const [queue, setQueue] = useState([])

    useEffect(() => {
        fetchBarbers()
        fetchQueue()
    }, [])

    const fetchBarbers = () => {
        axios.get('http://localhost:8080/api/barbers/salon/1')
            .then(res => setBarbers(res.data))
    }

    const fetchQueue = () => {
        axios.get('http://localhost:8080/api/bookings/salon/1/queue')
            .then(res => setQueue(res.data.queue || []))
    }

    const updateStatus = (barberId, status) => {
        axios.patch(`http://localhost:8080/api/barbers/${barberId}/status?status=${status}`)
            .then(() => fetchBarbers())
    }

    const completeBooking = (bookingId) => {
        axios.patch(`http://localhost:8080/api/bookings/${bookingId}/status?status=COMPLETED`)
            .then(() => fetchQueue())
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f0f4f8', padding: '30px', fontFamily: 'Arial' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
                    <button onClick={onBack} style={{
                        background: 'white', border: '1px solid #cbd5e0', borderRadius: '8px',
                        padding: '8px 16px', cursor: 'pointer', color: '#4a5568'
                    }}>← Back</button>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c' }}>
                        🏪 Owner Dashboard — Royal Salon
                    </h1>
                </div>

                {/* Barber Management */}
                <div style={{
                    background: 'white', borderRadius: '12px', padding: '20px',
                    marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1a202c' }}>
                        💈 Barber Status
                    </h2>
                    {barbers.map(barber => (
                        <div key={barber.id} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '12px 0', borderBottom: '1px solid #f0f4f8'
                        }}>
                            <div>
                                <p style={{ fontWeight: 'bold', color: '#1a202c' }}>{barber.name}</p>
                                <span style={{
                                    fontSize: '12px', padding: '2px 8px', borderRadius: '10px',
                                    background: barber.status === 'AVAILABLE' ? '#d1fae5' : '#fee2e2',
                                    color: barber.status === 'AVAILABLE' ? '#065f46' : '#991b1b'
                                }}>
                  {barber.status === 'AVAILABLE' ? '✅ Available' : '❌ Busy'}
                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => updateStatus(barber.id, 'AVAILABLE')}
                                        disabled={barber.status === 'AVAILABLE'}
                                        style={{
                                            padding: '6px 12px', borderRadius: '6px', border: 'none',
                                            background: barber.status === 'AVAILABLE' ? '#e2e8f0' : '#d1fae5',
                                            color: barber.status === 'AVAILABLE' ? '#9ca3af' : '#065f46',
                                            cursor: barber.status === 'AVAILABLE' ? 'not-allowed' : 'pointer',
                                            fontWeight: 'bold', fontSize: '13px'
                                        }}>
                                    Mark Available
                                </button>
                                <button onClick={() => updateStatus(barber.id, 'BUSY')}
                                        disabled={barber.status === 'BUSY'}
                                        style={{
                                            padding: '6px 12px', borderRadius: '6px', border: 'none',
                                            background: barber.status === 'BUSY' ? '#e2e8f0' : '#fee2e2',
                                            color: barber.status === 'BUSY' ? '#9ca3af' : '#991b1b',
                                            cursor: barber.status === 'BUSY' ? 'not-allowed' : 'pointer',
                                            fontWeight: 'bold', fontSize: '13px'
                                        }}>
                                    Mark Busy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Queue Management */}
                <div style={{
                    background: 'white', borderRadius: '12px', padding: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1a202c' }}>
                        👥 Current Queue ({queue.length} waiting)
                    </h2>
                    {queue.length === 0 && (
                        <p style={{ color: '#718096', textAlign: 'center' }}>No one in queue right now!</p>
                    )}
                    {queue.map((booking, index) => (
                        <div key={booking.id} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '12px', marginBottom: '8px', borderRadius: '8px',
                            background: '#f8fafc', border: '1px solid #e2e8f0'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: '#6366f1', color: 'white', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold'
                }}>{index + 1}</span>
                                <div>
                                    <p style={{ fontWeight: 'bold', color: '#1a202c' }}>{booking.customerName}</p>
                                    <p style={{ fontSize: '12px', color: '#718096' }}>
                                        {booking.service} · {booking.barber?.name}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => completeBooking(booking.id)} style={{
                                padding: '6px 14px', borderRadius: '6px', border: 'none',
                                background: '#10b981', color: 'white', cursor: 'pointer',
                                fontWeight: 'bold', fontSize: '13px'
                            }}>
                                ✅ Done
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

// ============ CUSTOMER APP ============
function App() {
    const [page, setPage] = useState('customer')
    const [salons, setSalons] = useState([])
    const [selectedArea, setSelectedArea] = useState('All')
    const [selectedSalon, setSelectedSalon] = useState(null)
    const [barbers, setBarbers] = useState([])
    const [queueInfo, setQueueInfo] = useState({})
    const [form, setForm] = useState({ customerName: '', customerPhone: '', service: 'Haircut', barberId: '' })
    const [bookingDone, setBookingDone] = useState(false)

    useEffect(() => {
        const url = selectedArea === 'All'
            ? 'http://localhost:8080/api/salons'
            : `http://localhost:8080/api/salons/area/${selectedArea}`
        axios.get(url).then(res => {
            setSalons(res.data)
            res.data.forEach(salon => fetchQueue(salon.id))
        })
    }, [selectedArea])

    const fetchQueue = (salonId) => {
        axios.get(`http://localhost:8080/api/bookings/salon/${salonId}/queue`)
            .then(res => setQueueInfo(prev => ({ ...prev, [salonId]: res.data })))
    }

    const handleBook = (salon) => {
        setSelectedSalon(salon)
        setBookingDone(false)
        setForm({ customerName: '', customerPhone: '', service: 'Haircut', barberId: '' })
        axios.get(`http://localhost:8080/api/barbers/salon/${salon.id}`)
            .then(res => setBarbers(res.data))
    }

    const handleSubmit = () => {
        if (!form.customerName || !form.customerPhone || !form.barberId) {
            alert('Please fill all fields and select a barber!')
            return
        }
        axios.post('http://localhost:8080/api/bookings', {
            customerName: form.customerName,
            customerPhone: form.customerPhone,
            service: form.service,
            salon: { id: selectedSalon.id },
            barber: { id: form.barberId }
        }).then(() => {
            setBookingDone(true)
            fetchQueue(selectedSalon.id)
        })
    }

    if (page === 'owner') return <OwnerDashboard onBack={() => setPage('customer')} />

    return (
        <div style={{ minHeight: '100vh', background: '#f0f4f8', padding: '30px', fontFamily: 'Arial' }}>

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '32px', color: '#1a202c', fontWeight: 'bold' }}>✂️ Salon Queue App</h1>
                <p style={{ color: '#718096' }}>Real-time salon waiting times — Pune</p>
                <button onClick={() => setPage('owner')} style={{
                    marginTop: '10px', padding: '8px 20px', borderRadius: '8px',
                    border: 'none', background: '#1a202c', color: 'white',
                    cursor: 'pointer', fontSize: '13px'
                }}>🔑 Owner Login</button>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto 20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {AREAS.map(area => (
                    <button key={area} onClick={() => setSelectedArea(area)} style={{
                        padding: '8px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                        fontWeight: 'bold', fontSize: '14px',
                        background: selectedArea === area ? '#6366f1' : 'white',
                        color: selectedArea === area ? 'white' : '#4a5568',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                    }}>{area}</button>
                ))}
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                {salons.map(salon => {
                    const queue = queueInfo[salon.id]
                    return (
                        <div key={salon.id} style={{
                            background: 'white', borderRadius: '12px', padding: '20px',
                            marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            borderLeft: '4px solid #6366f1'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>{salon.name}</h2>
                                <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '20px', fontSize: '14px' }}>
                  ⭐ {salon.rating}
                </span>
                            </div>
                            <p style={{ color: '#718096', margin: '8px 0' }}>📍 {salon.area} — {salon.address}</p>
                            <p style={{ color: '#718096' }}>📞 {salon.contact}</p>
                            <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>🟢 Open</span>
                                <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>
                  👥 {queue ? queue.totalInQueue : 0} in queue
                </span>
                                <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>
                  ⏱️ ~{queue ? queue.estimatedWaitMinutes : 0} min wait
                </span>
                            </div>
                            <button onClick={() => handleBook(salon)} style={{
                                marginTop: '14px', width: '100%', background: '#6366f1', color: 'white',
                                border: 'none', borderRadius: '8px', padding: '10px', fontSize: '15px',
                                cursor: 'pointer', fontWeight: 'bold'
                            }}>Book Appointment</button>
                        </div>
                    )
                })}

                {selectedSalon && !bookingDone && (
                    <div style={{
                        background: 'white', borderRadius: '12px', padding: '24px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '10px'
                    }}>
                        <h2 style={{ marginBottom: '16px', color: '#1a202c' }}>📋 Book at {selectedSalon.name}</h2>
                        <input placeholder="Your Name" value={form.customerName}
                               onChange={e => setForm({ ...form, customerName: e.target.value })}
                               style={inputStyle} />
                        <input placeholder="Phone Number" value={form.customerPhone}
                               onChange={e => setForm({ ...form, customerPhone: e.target.value })}
                               style={inputStyle} />
                        <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                                style={inputStyle}>
                            <option>Haircut</option>
                            <option>Beard Trim</option>
                            <option>Hair + Beard</option>
                            <option>Facial</option>
                        </select>

                        <p style={{ fontWeight: 'bold', marginBottom: '10px', color: '#1a202c' }}>Select Barber:</p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
                            {barbers.map(barber => (
                                <button key={barber.id} onClick={() => barber.status === 'AVAILABLE' && setForm({ ...form, barberId: barber.id })} style={{
                                    padding: '8px 16px', borderRadius: '8px', border: '2px solid',
                                    cursor: barber.status === 'BUSY' ? 'not-allowed' : 'pointer',
                                    borderColor: form.barberId === barber.id ? '#6366f1' : '#cbd5e0',
                                    background: form.barberId === barber.id ? '#eef2ff' : 'white',
                                    color: barber.status === 'BUSY' ? '#9ca3af' : '#1a202c',
                                    fontWeight: 'bold', fontSize: '14px'
                                }}>
                                    {barber.name}
                                    <span style={{ display: 'block', fontSize: '11px', color: barber.status === 'AVAILABLE' ? '#10b981' : '#ef4444' }}>
                    {barber.status === 'AVAILABLE' ? '✅ Available' : '❌ Busy'}
                  </span>
                                </button>
                            ))}
                        </div>

                        <button onClick={handleSubmit} style={{
                            width: '100%', background: '#10b981', color: 'white', border: 'none',
                            borderRadius: '8px', padding: '12px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold'
                        }}>✅ Confirm Booking</button>
                        <button onClick={() => setSelectedSalon(null)} style={{
                            width: '100%', background: 'transparent', color: '#718096',
                            border: '1px solid #cbd5e0', borderRadius: '8px', padding: '10px',
                            fontSize: '14px', cursor: 'pointer', marginTop: '8px'
                        }}>Cancel</button>
                    </div>
                )}

                {bookingDone && (
                    <div style={{
                        background: '#d1fae5', borderRadius: '12px', padding: '24px',
                        textAlign: 'center', marginTop: '10px'
                    }}>
                        <h2 style={{ color: '#065f46', fontSize: '24px' }}>🎉 Booking Confirmed!</h2>
                        <p style={{ color: '#065f46', marginTop: '8px' }}>Your booking at {selectedSalon.name} is confirmed!</p>
                        <button onClick={() => { setSelectedSalon(null); setBookingDone(false) }} style={{
                            marginTop: '16px', background: '#6366f1', color: 'white',
                            border: 'none', borderRadius: '8px', padding: '10px 24px',
                            fontSize: '15px', cursor: 'pointer'
                        }}>Go Back</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App