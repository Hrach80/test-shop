import { useState, useEffect } from 'react'
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function Cart() {
    const [cart, setCart] = useState([])
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cosmic_cart')) || []
        setCart(savedCart)
    }, [])

    function updateCartStorage(newCart) {
        setCart(newCart)
        localStorage.setItem('cosmic_cart', JSON.stringify(newCart))
        window.dispatchEvent(new Event('storage'))
    }

    function handleRemove(id) {
        const newCart = cart.filter(item => item.id !== id)
        updateCartStorage(newCart)
        toast.info('Ապրանքը հեռացվեց զամբյուղից')
    }

    function handleQuantity(id, delta) {
        const newCart = cart.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta
                return newQty > 0 ? { ...item, quantity: newQty } : null
            }
            return item
        }).filter(Boolean)
        updateCartStorage(newCart)
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    async function handleCheckout(e) {
        e.preventDefault()
        if (cart.length === 0) return

        setLoading(true)
        try {
            const { error } = await supabase.from('orders').insert([
                {
                    customer_name: name,
                    customer_phone: phone,
                    customer_address: address,
                    items: cart,
                    total_price: totalPrice
                }
            ])

            if (error) throw error

            setOrderSuccess(true)
            updateCartStorage([])
            localStorage.removeItem('cosmic_cart')
            toast.success('Պատվերը հաջողությամբ ձևակերպվեց!')
        } catch (err) {
            toast.error('Սխալ պատվեր ուղարկելիս՝ ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    if (orderSuccess) {
        return (
            <div style={{
                minHeight: 'calc(100vh - 80px)',
                background: `linear-gradient(to bottom, rgba(14, 20, 16, 0.82), rgba(14, 20, 16, 0.93)), url('https://www.torrefacto.ru/upload/medialibrary/58d/902aex542rv7je68ckcxtxnrh4e9z144.png') center/cover no-repeat`,
                padding: '40px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    background: 'rgba(22, 30, 25, 0.9)',
                    border: '1px solid rgba(194, 155, 105, 0.4)',
                    borderRadius: '24px',
                    padding: '40px',
                    maxWidth: '440px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.9)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <CheckCircle style={{ width: '64px', height: '64px', color: '#c29b69', margin: '0 auto 20px auto' }} />
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>Շնորհավորում ենք!</h2>
                    <p style={{ color: '#b0b8b2', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px' }}>Ձեր պատվերը հաջողությամբ ձևակերպվեց։ Մենք շուտով կկապնվենք ձեզ հետ։</p>
                    <Link to="/shop" style={{
                        background: 'linear-gradient(135deg, #4A5D4F, #2C3831)',
                        color: '#f7f4ef',
                        border: '1px solid rgba(194, 155, 105, 0.5)',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        display: 'inline-block',
                        boxShadow: '0 8px 20px rgba(44,56,49,0.5)'
                    }}>
                        Վերադառնալ Խանութ
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            background: `linear-gradient(to bottom, rgba(14, 20, 16, 0.82), rgba(14, 20, 16, 0.93)), url('https://www.torrefacto.ru/upload/medialibrary/58d/902aex542rv7je68ckcxtxnrh4e9z144.png') center/cover no-repeat`,
            padding: '30px 20px',
            color: '#f3f4f6',
            boxSizing: 'border-box'
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Վերնագիր */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#fff', marginBottom: '6px' }}>
                        Գնումների <span style={{ color: '#c29b69' }}>Զամբյուղ</span>
                    </h1>
                    <p style={{ color: '#b0b8b2', fontSize: '13px' }}>Ստուգեք ձեր ընտրված ապրանքները և ձևակերպեք պատվերը</p>
                </div>

                {cart.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        background: 'rgba(22, 30, 25, 0.88)',
                        border: '1px solid rgba(194, 155, 105, 0.3)',
                        borderRadius: '20px',
                        padding: '40px',
                        maxWidth: '400px',
                        margin: '40px auto',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <p style={{ color: '#b0b8b2', fontSize: '15px', marginBottom: '20px' }}>Ձեր զամբյուղը դատարկ է ։)</p>
                        <Link to="/shop" style={{
                            background: 'linear-gradient(135deg, #4A5D4F, #2C3831)',
                            color: '#f7f4ef',
                            border: '1px solid rgba(194, 155, 105, 0.4)',
                            padding: '10px 20px',
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: '700',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 6px 15px rgba(44,56,49,0.5)'
                        }}>
                            Անցնել Խանութ <ArrowRight style={{ width: '15px', height: '15px' }} />
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>

                        {/* Ապրանքների Ցանկ */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {cart.map((item) => (
                                <div key={item.id} style={{
                                    background: 'rgba(22, 30, 25, 0.88)',
                                    border: '1px solid rgba(194, 155, 105, 0.3)',
                                    borderRadius: '16px',
                                    padding: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '14px',
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                                    backdropFilter: 'blur(8px)'
                                }}>
                                    <img src={item.image} alt={item.name} style={{ width: '65px', height: '65px', objectFit: 'cover', borderRadius: '12px', border: '1px solid rgba(194,155,105,0.3)', background: '#121714' }} />
                                    <div style={{ flexGrow: 1 }}>
                                        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>{item.name}</h3>
                                        <p style={{ fontSize: '14px', fontWeight: '800', color: '#c29b69' }}>{item.price} ֏</p>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        background: '#121714',
                                        padding: '6px 10px',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(194,155,105,0.3)'
                                    }}>
                                        <button onClick={() => handleQuantity(item.id, -1)} style={{ background: 'transparent', border: 'none', color: '#b0b8b2', cursor: 'pointer', display: 'flex' }}>
                                            <Minus style={{ width: '14px', height: '14px' }} />
                                        </button>
                                        <span style={{ fontWeight: 'bold', width: '20px', textAlign: 'center', fontSize: '13px', color: '#fff' }}>{item.quantity}</span>
                                        <button onClick={() => handleQuantity(item.id, 1)} style={{ background: 'transparent', border: 'none', color: '#b0b8b2', cursor: 'pointer', display: 'flex' }}>
                                            <Plus style={{ width: '14px', height: '14px' }} />
                                        </button>
                                    </div>

                                    <button onClick={() => handleRemove(item.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px' }}>
                                        <Trash2 style={{ width: '18px', height: '18px' }} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Պատվերի ձևակերպման ֆորմա */}
                        <div style={{
                            background: 'rgba(22, 30, 25, 0.9)',
                            border: '1px solid rgba(194, 155, 105, 0.4)',
                            borderRadius: '20px',
                            padding: '24px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>Պատվերի Ձևակերպում</h3>

                            <div style={{ borderTop: '1px solid rgba(194,155,105,0.2)', paddingTop: '14px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
                                <span style={{ color: '#b0b8b2' }}>Ընդհանուր գումար՝</span>
                                <span style={{ color: '#c29b69' }}>{totalPrice} ֏</span>
                            </div>

                            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#b0b8b2', marginBottom: '6px' }}>Անուն, Ազգանուն</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Հրաչյա Վաղարշակյան"
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#121714', border: '1px solid rgba(194,155,105,0.3)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#b0b8b2', marginBottom: '6px' }}>Հեռախոսահամար</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        placeholder="+374 XX XXXXXX"
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#121714', border: '1px solid rgba(194,155,105,0.3)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#b0b8b2', marginBottom: '6px' }}>Առաքման Հասցե</label>
                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        rows="3"
                                        placeholder="ք. Երևան, ..."
                                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#121714', border: '1px solid rgba(194,155,105,0.3)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(135deg, #4A5D4F, #2C3831)',
                                        color: '#f7f4ef',
                                        border: '1px solid rgba(194, 155, 105, 0.5)',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 20px rgba(44,56,49,0.5)',
                                        marginTop: '6px'
                                    }}
                                >
                                    {loading ? 'Ուղարկվում է...' : 'Հաստատել Պատվերը'}
                                </button>
                            </form>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}